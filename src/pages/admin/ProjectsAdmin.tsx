import { useState, useRef } from "react";
import { compressImage, uploadWithProgress } from "@/lib/image-utils";
import { Progress } from "@/components/ui/progress";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { 
  Plus, 
  ArrowLeft, 
  Pencil, 
  Trash2, 
  Image as ImageIcon, 
  FileQuestion, 
  Quote,
  Briefcase,
  ExternalLink,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { AdminPageSkeleton } from "@/components/admin/AdminTableSkeleton";

interface ProcessStep {
  title: string;
  description?: string;
}

interface Metric {
  label: string;
  value: string;
  sublabel?: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  full_description: string | null;
  thumbnail_url: string | null;
  client_name: string | null;
  service_category: string;
  technologies: string[];
  results: string[];
  live_url: string | null;
  completion_date: string | null;
  display_order: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  challenge: string | null;
  solution: string | null;
  process_steps: ProcessStep[] | null;
  metrics: Metric[] | null;
  before_image_url: string | null;
  after_image_url: string | null;
  testimonial_quote: string | null;
  testimonial_author_name: string | null;
  testimonial_author_role: string | null;
}

const serviceCategories = [
  "Web & App Development",
  "Automation Bots",
  "Digital Systems & API",
  "Cloud & IT Support",
  "Project-Based Services",
];

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  full_description: "",
  client_name: "",
  service_category: "Web & App Development",
  technologies: "",
  results: "",
  live_url: "",
  completion_date: "",
  is_featured: false,
  challenge: "",
  solution: "",
  process_steps: "", // "Title | Description" per line
  metrics: "", // "value | label | sublabel" per line
  before_image_url: "",
  after_image_url: "",
  testimonial_quote: "",
  testimonial_author_name: "",
  testimonial_author_role: "",
};

const parseProcessSteps = (raw: string): ProcessStep[] =>
  raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...rest] = line.split("|").map((s) => s.trim());
      return { title, description: rest.join(" | ") || undefined };
    });

const parseMetrics = (raw: string): Metric[] =>
  raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [value, label, sublabel] = line.split("|").map((s) => s.trim());
      return { value: value || "", label: label || "", sublabel: sublabel || undefined };
    })
    .filter((m) => m.value && m.label);

const stringifyProcessSteps = (steps: ProcessStep[] | null | undefined) =>
  (steps || [])
    .map((s) => (s.description ? `${s.title} | ${s.description}` : s.title))
    .join("\n");

const stringifyMetrics = (metrics: Metric[] | null | undefined) =>
  (metrics || [])
    .map((m) => [m.value, m.label, m.sublabel].filter(Boolean).join(" | "))
    .join("\n");


const ProjectsAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const { data: projects, isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as unknown as Project[];
    },
  });

  const uploadThumbnail = async (file: File): Promise<string> => {
    setUploadProgress(5);
    const compressedFile = await compressImage(file, 800, 800, 0.85);
    
    setUploadProgress(10);
    const fileName = `${crypto.randomUUID()}.webp`;
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    
    const publicUrl = await uploadWithProgress(
      supabaseUrl,
      accessToken,
      "projects",
      fileName,
      compressedFile,
      (progress) => setUploadProgress(Math.max(10, progress))
    );
    
    return publicUrl;
  };

  const deleteThumbnail = async (url: string) => {
    if (url.includes("/projects/")) {
      const fileName = url.split("/projects/").pop();
      if (fileName) {
        await supabase.storage.from("projects").remove([fileName]);
      }
    }
  };

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const maxOrder = projects?.length ? Math.max(...projects.map((p) => p.display_order)) : 0;
      const { error } = await supabase.from("projects").insert({
        ...data,
        display_order: maxOrder + 1,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast({ title: "Project berhasil ditambahkan" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Gagal menambahkan project", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase.from("projects").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast({ title: "Project berhasil diperbarui" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Gagal memperbarui project", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (project: Project) => {
      if (project.thumbnail_url) {
        await deleteThumbnail(project.thumbnail_url);
      }
      const { error } = await supabase.from("projects").delete().eq("id", project.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast({ title: "Project berhasil dihapus" });
    },
    onError: (error) => {
      toast({ title: "Gagal menghapus project", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({ ...emptyForm });
    setEditingProject(null);
    setThumbnailFile(null);
    setThumbnailPreview("");
    setIsDialogOpen(false);
  };


  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File terlalu besar", description: "Maksimal ukuran file 5MB", variant: "destructive" });
        return;
      }
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);

    try {
      let thumbnailUrl = editingProject?.thumbnail_url || null;

      if (thumbnailFile) {
        if (editingProject?.thumbnail_url) {
          await deleteThumbnail(editingProject.thumbnail_url);
        }
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
      }

      const projectData = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        description: formData.description,
        full_description: formData.full_description || null,
        client_name: formData.client_name || null,
        service_category: formData.service_category,
        technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        results: formData.results.split("\n").map((r) => r.trim()).filter(Boolean),
        live_url: formData.live_url || null,
        completion_date: formData.completion_date || null,
        is_featured: formData.is_featured,
        thumbnail_url: thumbnailUrl,
        challenge: formData.challenge || null,
        solution: formData.solution || null,
        process_steps: parseProcessSteps(formData.process_steps),
        metrics: parseMetrics(formData.metrics),
        before_image_url: formData.before_image_url || null,
        after_image_url: formData.after_image_url || null,
        testimonial_quote: formData.testimonial_quote || null,
        testimonial_author_name: formData.testimonial_author_name || null,
        testimonial_author_role: formData.testimonial_author_role || null,
      };

      if (editingProject) {
        await updateMutation.mutateAsync({ id: editingProject.id, data: projectData });
      } else {
        await createMutation.mutateAsync(projectData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      full_description: project.full_description || "",
      client_name: project.client_name || "",
      service_category: project.service_category,
      technologies: project.technologies.join(", "),
      results: project.results.join("\n"),
      live_url: project.live_url || "",
      completion_date: project.completion_date || "",
      is_featured: project.is_featured,
      challenge: project.challenge || "",
      solution: project.solution || "",
      process_steps: stringifyProcessSteps(project.process_steps),
      metrics: stringifyMetrics(project.metrics),
      before_image_url: project.before_image_url || "",
      after_image_url: project.after_image_url || "",
      testimonial_quote: project.testimonial_quote || "",
      testimonial_author_name: project.testimonial_author_name || "",
      testimonial_author_role: project.testimonial_author_role || "",
    });
    setThumbnailPreview(project.thumbnail_url || "");
    setIsDialogOpen(true);
  };


  const handleToggleActive = (project: Project) => {
    updateMutation.mutate({ id: project.id, data: { is_active: !project.is_active } });
  };

  const handleToggleFeatured = (project: Project) => {
    updateMutation.mutate({ id: project.id, data: { is_featured: !project.is_featured } });
  };

  if (isLoading) {
    return (
      <AdminPageSkeleton
        rows={5}
        withLeadingThumb
        columns={[
          { widthClass: "w-12" },
          { widthClass: "w-40" },
          { widthClass: "w-24" },
          { widthClass: "w-20" },
          { widthClass: "w-16" },
          { widthClass: "w-24", align: "right" },
        ]}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Kelola Portfolio</h1>
              <p className="text-muted-foreground">Tambah dan edit project portfolio</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/logos">
              <Button variant="outline" size="sm">
                <ImageIcon className="h-4 w-4 mr-2" />
                Logo
              </Button>
            </Link>
            <Link to="/admin/faq">
              <Button variant="outline" size="sm">
                <FileQuestion className="h-4 w-4 mr-2" />
                FAQ
              </Button>
            </Link>
            <Link to="/admin/testimonials">
              <Button variant="outline" size="sm">
                <Quote className="h-4 w-4 mr-2" />
                Testimonial
              </Button>
            </Link>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              if (!open) resetForm();
              setIsDialogOpen(open);
            }}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProject ? "Edit Project" : "Tambah Project Baru"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Thumbnail */}
                  <div className="space-y-2">
                    <Label>Thumbnail</Label>
                    <div className="flex items-start gap-4">
                      <div className="w-32 h-20 rounded-lg border border-dashed border-border bg-muted/50 overflow-hidden flex items-center justify-center">
                        {thumbnailPreview ? (
                          <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG. Max 5MB.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Judul Project *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => {
                          setFormData({ 
                            ...formData, 
                            title: e.target.value,
                            slug: generateSlug(e.target.value)
                          });
                        }}
                        placeholder="E-Commerce Platform"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug URL</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="ecommerce-platform"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service_category">Kategori Layanan *</Label>
                      <Select
                        value={formData.service_category}
                        onValueChange={(value) => setFormData({ ...formData, service_category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client_name">Nama Klien</Label>
                      <Input
                        id="client_name"
                        value={formData.client_name}
                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                        placeholder="PT Example Indonesia"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi Singkat *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Penjelasan singkat tentang project..."
                      rows={2}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="full_description">Deskripsi Lengkap</Label>
                    <Textarea
                      id="full_description"
                      value={formData.full_description}
                      onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                      placeholder="Penjelasan detail tentang project, tantangan, dan solusi..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="technologies">Teknologi (pisahkan dengan koma)</Label>
                      <Input
                        id="technologies"
                        value={formData.technologies}
                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                        placeholder="React, Node.js, PostgreSQL"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="live_url">URL Live</Label>
                      <Input
                        id="live_url"
                        value={formData.live_url}
                        onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="results">Hasil (satu per baris)</Label>
                    <Textarea
                      id="results"
                      value={formData.results}
                      onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                      placeholder="200% peningkatan konversi&#10;50% pengurangan biaya&#10;3x lipat traffic"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="completion_date">Tanggal Selesai</Label>
                      <Input
                        id="completion_date"
                        type="date"
                        value={formData.completion_date}
                        onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center gap-4 pt-6">
                      <div className="flex items-center gap-2">
                        <Switch
                          id="is_featured"
                          checked={formData.is_featured}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                        />
                        <Label htmlFor="is_featured">Featured</Label>
                      </div>
                    </div>
                  </div>

                  {/* ============ CASE STUDY FIELDS ============ */}
                  <div className="pt-4 border-t border-border/50">
                    <h3 className="font-semibold text-foreground mb-1">Case Study (opsional)</h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      Isi untuk menampilkan halaman detail berformat narrative case study.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="challenge">Tantangan</Label>
                        <Textarea
                          id="challenge"
                          value={formData.challenge}
                          onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                          placeholder="Apa masalah utama klien sebelum project ini?"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="solution">Solusi</Label>
                        <Textarea
                          id="solution"
                          value={formData.solution}
                          onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                          placeholder="Pendekatan dan solusi yang kami berikan."
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="process_steps">Proses Pengerjaan</Label>
                      <Textarea
                        id="process_steps"
                        value={formData.process_steps}
                        onChange={(e) => setFormData({ ...formData, process_steps: e.target.value })}
                        placeholder={"Format: Judul | Deskripsi (satu langkah per baris)\nDiscovery & Riset | Wawancara stakeholder dan audit sistem lama\nDesign & Prototyping | Wireframe dan UI design dengan revisi 2x"}
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">Satu baris = satu step. Pisahkan judul dan deskripsi dengan `|`.</p>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="metrics">Metrik Hasil (angka besar di atas halaman)</Label>
                      <Textarea
                        id="metrics"
                        value={formData.metrics}
                        onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                        placeholder={"Format: value | label | sublabel\n+250% | Konversi | dalam 3 bulan\n-60% | Waktu Respons | otomatisasi WA\n4.9/5 | Rating Klien |"}
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground">Satu baris = satu metrik. Format `value | label | sublabel`.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="before_image_url">URL Gambar "Sebelum"</Label>
                        <Input
                          id="before_image_url"
                          value={formData.before_image_url}
                          onChange={(e) => setFormData({ ...formData, before_image_url: e.target.value })}
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="after_image_url">URL Gambar "Sesudah"</Label>
                        <Input
                          id="after_image_url"
                          value={formData.after_image_url}
                          onChange={(e) => setFormData({ ...formData, after_image_url: e.target.value })}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground -mt-2">Isi keduanya untuk menampilkan comparison slider sebelum/sesudah.</p>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="testimonial_quote">Testimoni Klien</Label>
                      <Textarea
                        id="testimonial_quote"
                        value={formData.testimonial_quote}
                        onChange={(e) => setFormData({ ...formData, testimonial_quote: e.target.value })}
                        placeholder="Tim Fusionify sangat responsif dan hasilnya melampaui ekspektasi..."
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="testimonial_author_name">Nama Pemberi Testimoni</Label>
                        <Input
                          id="testimonial_author_name"
                          value={formData.testimonial_author_name}
                          onChange={(e) => setFormData({ ...formData, testimonial_author_name: e.target.value })}
                          placeholder="Budi Santoso"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="testimonial_author_role">Jabatan / Perusahaan</Label>
                        <Input
                          id="testimonial_author_role"
                          value={formData.testimonial_author_role}
                          onChange={(e) => setFormData({ ...formData, testimonial_author_role: e.target.value })}
                          placeholder="Founder, PT Contoh"
                        />
                      </div>
                    </div>
                  </div>



                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Batal
                    </Button>
                    <Button type="submit" disabled={isUploading}>
                      {isUploading ? `${uploadProgress}% Menyimpan...` : (editingProject ? "Simpan Perubahan" : "Tambah")}
                    </Button>
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {uploadProgress < 10 ? "Mengompresi..." : uploadProgress < 100 ? "Mengupload..." : "Menyimpan..."}
                        </span>
                        <span className="font-medium text-primary">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="w-24">Featured</TableHead>
                <TableHead className="w-20">Aktif</TableHead>
                <TableHead className="w-24 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 rounded-lg bg-muted/50 overflow-hidden flex items-center justify-center">
                          {project.thumbnail_url ? (
                            <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover" />
                          ) : (
                            <Briefcase className="w-4 h-4 text-muted-foreground/30" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{project.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{project.service_category}</span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleFeatured(project)}
                        className={project.is_featured ? "text-yellow-500" : "text-muted-foreground"}
                      >
                        <Star className={`h-4 w-4 ${project.is_featured ? "fill-current" : ""}`} />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={project.is_active}
                        onCheckedChange={() => handleToggleActive(project)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            if (confirm("Apakah Anda yakin ingin menghapus project ini?")) {
                              deleteMutation.mutate(project);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Belum ada project. Klik "Tambah Project" untuk memulai.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsAdmin;
