import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Plus, ArrowLeft, Image as ImageIcon, FileQuestion, X, Loader2, Quote, AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { compressImage, uploadWithProgress } from "@/lib/image-utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTestimonialRow } from "@/components/admin/SortableTestimonialRow";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar_initials: string;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const TestimonialsAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    quote: "",
    avatar_initials: "",
    image_url: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string>("");
  const [lastCompressedFile, setLastCompressedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Testimonial[];
    },
  });

  // Upload photo to storage with progress
  const uploadPhoto = async (file: File): Promise<string> => {
    const fileExt = "webp"; // Always webp after compression
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    
    const publicUrl = await uploadWithProgress(
      supabaseUrl,
      accessToken,
      "testimonials",
      fileName,
      file,
      (progress) => setUploadProgress(progress)
    );
    
    return publicUrl;
  };

  // Delete photo from storage
  const deletePhoto = async (url: string) => {
    // Only delete if it's from our storage bucket
    if (url.includes("/testimonials/")) {
      const fileName = url.split("/testimonials/").pop();
      if (fileName) {
        await supabase.storage.from("testimonials").remove([fileName]);
      }
    }
  };

  const createMutation = useMutation({
    mutationFn: async (data: Omit<Testimonial, "id" | "created_at" | "updated_at" | "display_order" | "is_active">) => {
      const maxOrder = testimonials?.length ? Math.max(...testimonials.map((t) => t.display_order)) : 0;
      const { error } = await supabase.from("testimonials").insert({
        ...data,
        image_url: data.image_url || null,
        display_order: maxOrder + 1,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast({ title: "Testimonial berhasil ditambahkan" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Gagal menambahkan testimonial", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Testimonial> }) => {
      const { error } = await supabase.from("testimonials").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast({ title: "Testimonial berhasil diperbarui" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Gagal memperbarui testimonial", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      // Delete photo from storage first if exists
      if (testimonial.image_url) {
        await deletePhoto(testimonial.image_url);
      }
      const { error } = await supabase.from("testimonials").delete().eq("id", testimonial.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast({ title: "Testimonial berhasil dihapus" });
    },
    onError: (error) => {
      toast({ title: "Gagal menghapus testimonial", description: error.message, variant: "destructive" });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (reorderedTestimonials: Testimonial[]) => {
      const updates = reorderedTestimonials.map((testimonial, index) => ({
        id: testimonial.id,
        display_order: index + 1,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from("testimonials")
          .update({ display_order: update.display_order })
          .eq("id", update.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast({ title: "Urutan testimonial berhasil diperbarui" });
    },
    onError: (error) => {
      toast({ title: "Gagal memperbarui urutan", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({ name: "", role: "", company: "", quote: "", avatar_initials: "", image_url: "" });
    setEditingTestimonial(null);
    setPhotoFile(null);
    setPhotoPreview("");
    setUploadProgress(0);
    setUploadError("");
    setLastCompressedFile(null);
    setIsDialogOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File terlalu besar", description: "Maksimal ukuran file 5MB", variant: "destructive" });
        return;
      }
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      // Clear URL input when file is selected
      setFormData({ ...formData, image_url: "" });
    }
  };

  const clearPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const performUpload = async (compressedFile: File | null) => {
    setIsUploading(true);
    setUploadError("");

    try {
      let imageUrl = formData.image_url || editingTestimonial?.image_url || "";

      if (compressedFile) {
        setUploadProgress(10);
        // Delete old photo if updating
        if (editingTestimonial?.image_url) {
          deletePhoto(editingTestimonial.image_url).catch(console.error);
        }
        imageUrl = await uploadPhoto(compressedFile);
      }

      setUploadProgress(100);

      if (editingTestimonial) {
        await updateMutation.mutateAsync({
          id: editingTestimonial.id,
          data: {
            name: formData.name,
            role: formData.role,
            company: formData.company,
            quote: formData.quote,
            avatar_initials: formData.avatar_initials,
            image_url: imageUrl || null,
          },
        });
      } else {
        await createMutation.mutateAsync({
          ...formData,
          image_url: imageUrl,
        });
      }
    } catch (error: any) {
      console.error(error);
      setUploadError(error?.message || "Upload gagal. Silakan coba lagi.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadProgress(0);
    setUploadError("");

    let compressedFile: File | null = null;

    if (photoFile) {
      try {
        setIsUploading(true);
        setUploadProgress(5);
        compressedFile = await compressImage(photoFile, 200, 200, 0.85);
        setLastCompressedFile(compressedFile);
      } catch (error: any) {
        setUploadError(error?.message || "Gagal mengompresi gambar.");
        setIsUploading(false);
        return;
      }
    }

    await performUpload(compressedFile);
  };

  const handleRetry = () => {
    if (lastCompressedFile) {
      performUpload(lastCompressedFile);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      quote: testimonial.quote,
      avatar_initials: testimonial.avatar_initials,
      image_url: "",
    });
    setPhotoPreview(testimonial.image_url || "");
    setIsDialogOpen(true);
  };

  const handleToggleActive = (id: string, is_active: boolean) => {
    updateMutation.mutate({ id, data: { is_active } });
  };

  const handleDelete = (id: string) => {
    const testimonial = testimonials?.find((t) => t.id === id);
    if (testimonial) {
      deleteMutation.mutate(testimonial);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && testimonials) {
      const oldIndex = testimonials.findIndex((t) => t.id === active.id);
      const newIndex = testimonials.findIndex((t) => t.id === over.id);
      const reordered = arrayMove(testimonials, oldIndex, newIndex);
      reorderMutation.mutate(reordered);
    }
  };

  if (isLoading) {
    return (
      <AdminPageSkeleton
        rows={5}
        withLeadingThumb
        columns={[
          { widthClass: "w-12" },
          { widthClass: "w-40" },
          { widthClass: "w-48" },
          { widthClass: "w-20" },
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
              <h1 className="text-2xl font-bold">Kelola Testimonial</h1>
              <p className="text-muted-foreground">Tambah, edit, dan urutkan testimonial</p>
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
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              if (!open) resetForm();
              setIsDialogOpen(open);
            }}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {editingTestimonial ? "Edit Testimonial" : "Tambah Testimonial Baru"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Photo Upload Section */}
                  <div className="space-y-2">
                    <Label>Foto Klien</Label>
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Avatar className="w-20 h-20 border-2 border-dashed border-border">
                          <AvatarImage src={photoPreview || undefined} alt="Preview" />
                          <AvatarFallback className="bg-muted text-muted-foreground">
                            {formData.avatar_initials || <ImageIcon className="w-8 h-8" />}
                          </AvatarFallback>
                        </Avatar>
                        {photoPreview && (
                          <button
                            type="button"
                            onClick={clearPhoto}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <Input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground">
                          Upload foto (PNG, JPG. Max 2MB) atau masukkan URL di bawah.
                        </p>
                        <Input
                          value={formData.image_url}
                          onChange={(e) => {
                            setFormData({ ...formData, image_url: e.target.value });
                            if (e.target.value) {
                              setPhotoFile(null);
                              setPhotoPreview(e.target.value);
                            }
                          }}
                          placeholder="https://example.com/photo.jpg"
                          disabled={!!photoFile}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ahmad Rizki"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar_initials">Inisial Avatar</Label>
                      <Input
                        id="avatar_initials"
                        value={formData.avatar_initials}
                        onChange={(e) => setFormData({ ...formData, avatar_initials: e.target.value.toUpperCase().slice(0, 2) })}
                        placeholder="AR"
                        maxLength={2}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Jabatan</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="CEO"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Perusahaan</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="TechVenture Indonesia"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quote">Kutipan</Label>
                    <Textarea
                      id="quote"
                      value={formData.quote}
                      onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      placeholder="Fusionify transformed our entire business operations..."
                      rows={4}
                      required
                    />
                  </div>
                  {/* Progress Bar */}
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

                  {/* Retry on Error */}
                  {uploadError && !isUploading && (
                    <Alert variant="destructive" className="flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <AlertDescription className="text-sm">{uploadError}</AlertDescription>
                      </div>
                      {lastCompressedFile && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleRetry}
                          className="shrink-0 border-destructive/50 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Coba Lagi
                        </Button>
                      )}
                    </Alert>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={resetForm} disabled={isUploading}>
                      Batal
                    </Button>
                    <Button type="submit" disabled={isUploading || createMutation.isPending || updateMutation.isPending}>
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {uploadProgress}%
                        </>
                      ) : (
                        editingTestimonial ? "Simpan Perubahan" : "Tambah"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-card rounded-lg border">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Urutan</TableHead>
                  <TableHead>Klien</TableHead>
                  <TableHead>Kutipan</TableHead>
                  <TableHead className="w-20">Aktif</TableHead>
                  <TableHead className="w-24 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials && testimonials.length > 0 ? (
                  <SortableContext
                    items={testimonials.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {testimonials.map((testimonial) => (
                      <SortableTestimonialRow
                        key={testimonial.id}
                        testimonial={testimonial}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleActive={handleToggleActive}
                      />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <td colSpan={5} className="text-center py-8 text-muted-foreground">
                      <Quote className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Belum ada testimonial. Klik "Tambah Testimonial" untuk memulai.</p>
                    </td>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsAdmin;
