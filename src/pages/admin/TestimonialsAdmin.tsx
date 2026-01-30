import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, ArrowLeft, Image as ImageIcon, FileQuestion, Quote } from "lucide-react";
import { Link } from "react-router-dom";
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
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
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
    setIsDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      updateMutation.mutate({
        id: editingTestimonial.id,
        data: {
          name: formData.name,
          role: formData.role,
          company: formData.company,
          quote: formData.quote,
          avatar_initials: formData.avatar_initials,
          image_url: formData.image_url || null,
        },
      });
    } else {
      createMutation.mutate(formData);
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
      image_url: testimonial.image_url || "",
    });
    setIsDialogOpen(true);
  };

  const handleToggleActive = (id: string, is_active: boolean) => {
    updateMutation.mutate({ id, data: { is_active } });
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  <div className="space-y-2">
                    <Label htmlFor="image_url">URL Foto (opsional)</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Batal
                    </Button>
                    <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                      {editingTestimonial ? "Simpan Perubahan" : "Tambah"}
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
                        onDelete={(id) => deleteMutation.mutate(id)}
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
