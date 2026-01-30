import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Pencil, Trash2, GripVertical, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const FAQAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    display_order: 0,
    is_active: true,
  });

  // Fetch FAQs
  const { data: faqs, isLoading } = useQuery({
    queryKey: ["admin-faqs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as FAQ[];
    },
  });

  // Add FAQ mutation
  const addMutation = useMutation({
    mutationFn: async (newFaq: Omit<FAQ, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("faqs")
        .insert([newFaq])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
      toast({ title: "FAQ berhasil ditambahkan" });
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error: Error) => {
      toast({ title: "Gagal menambahkan FAQ", description: error.message, variant: "destructive" });
    },
  });

  // Update FAQ mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<FAQ> & { id: string }) => {
      const { data, error } = await supabase
        .from("faqs")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
      toast({ title: "FAQ berhasil diperbarui" });
      setEditingFaq(null);
      resetForm();
    },
    onError: (error: Error) => {
      toast({ title: "Gagal memperbarui FAQ", description: error.message, variant: "destructive" });
    },
  });

  // Delete FAQ mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("faqs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
      toast({ title: "FAQ berhasil dihapus" });
    },
    onError: (error: Error) => {
      toast({ title: "Gagal menghapus FAQ", description: error.message, variant: "destructive" });
    },
  });

  // Toggle active status
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("faqs")
        .update({ is_active })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
      toast({ title: "Status FAQ berhasil diubah" });
    },
    onError: (error: Error) => {
      toast({ title: "Gagal mengubah status", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
      display_order: faqs?.length ? Math.max(...faqs.map((f) => f.display_order)) + 1 : 1,
      is_active: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq) {
      updateMutation.mutate({ id: editingFaq.id, ...formData });
    } else {
      addMutation.mutate(formData);
    }
  };

  const openEditDialog = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      display_order: faq.display_order,
      is_active: faq.is_active,
    });
  };

  const closeDialog = () => {
    setEditingFaq(null);
    setIsAddDialogOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin/logos">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">FAQ Management</h1>
            <p className="text-muted-foreground">Kelola pertanyaan yang sering diajukan</p>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Daftar FAQ
              </CardTitle>
              <CardDescription>
                {faqs?.length || 0} FAQ tersedia
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah FAQ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Tambah FAQ Baru</DialogTitle>
                  <DialogDescription>
                    Tambahkan pertanyaan dan jawaban baru
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="question">Pertanyaan</Label>
                    <Input
                      id="question"
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      placeholder="Masukkan pertanyaan"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="answer">Jawaban</Label>
                    <Textarea
                      id="answer"
                      value={formData.answer}
                      onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                      placeholder="Masukkan jawaban"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="display_order">Urutan</Label>
                      <Input
                        id="display_order"
                        type="number"
                        value={formData.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                        min={0}
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <Switch
                        id="is_active"
                        checked={formData.is_active}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                      />
                      <Label htmlFor="is_active">Aktif</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={closeDialog}>
                      Batal
                    </Button>
                    <Button type="submit" disabled={addMutation.isPending}>
                      {addMutation.isPending ? "Menyimpan..." : "Simpan"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Memuat data...</div>
            ) : faqs?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Belum ada FAQ. Klik "Tambah FAQ" untuk menambahkan.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Pertanyaan</TableHead>
                    <TableHead className="w-24">Status</TableHead>
                    <TableHead className="w-32 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs?.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          {faq.display_order}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium line-clamp-1">{faq.question}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {faq.answer}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={faq.is_active}
                          onCheckedChange={(checked) =>
                            toggleActiveMutation.mutate({ id: faq.id, is_active: checked })
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog open={editingFaq?.id === faq.id} onOpenChange={(open) => !open && closeDialog()}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(faq)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit FAQ</DialogTitle>
                                <DialogDescription>
                                  Ubah pertanyaan dan jawaban
                                </DialogDescription>
                              </DialogHeader>
                              <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-question">Pertanyaan</Label>
                                  <Input
                                    id="edit-question"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    placeholder="Masukkan pertanyaan"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-answer">Jawaban</Label>
                                  <Textarea
                                    id="edit-answer"
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    placeholder="Masukkan jawaban"
                                    rows={4}
                                    required
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-display_order">Urutan</Label>
                                    <Input
                                      id="edit-display_order"
                                      type="number"
                                      value={formData.display_order}
                                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                      min={0}
                                    />
                                  </div>
                                  <div className="flex items-center space-x-2 pt-6">
                                    <Switch
                                      id="edit-is_active"
                                      checked={formData.is_active}
                                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                                    />
                                    <Label htmlFor="edit-is_active">Aktif</Label>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="button" variant="outline" onClick={closeDialog}>
                                    Batal
                                  </Button>
                                  <Button type="submit" disabled={updateMutation.isPending}>
                                    {updateMutation.isPending ? "Menyimpan..." : "Simpan"}
                                  </Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              if (confirm("Apakah Anda yakin ingin menghapus FAQ ini?")) {
                                deleteMutation.mutate(faq.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQAdmin;
