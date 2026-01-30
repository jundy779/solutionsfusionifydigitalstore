import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Upload, 
  ArrowLeft,
  GripVertical,
  ExternalLink,
  Image as ImageIcon,
  LogOut,
  HelpCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ClientLogo {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  is_partner: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

interface LogoFormData {
  name: string;
  website_url: string;
  is_partner: boolean;
  is_active: boolean;
  display_order: number;
}

const initialFormData: LogoFormData = {
  name: "",
  website_url: "",
  is_partner: false,
  is_active: true,
  display_order: 0,
};

export default function LogosAdmin() {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLogo, setEditingLogo] = useState<ClientLogo | null>(null);
  const [formData, setFormData] = useState<LogoFormData>(initialFormData);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  // Fetch logos
  const { data: logos, isLoading } = useQuery({
    queryKey: ["admin-logos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_logos")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as ClientLogo[];
    },
  });

  // Upload file to storage
  const uploadLogo = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from("logos")
      .upload(fileName, file);
    
    if (uploadError) throw uploadError;
    
    const { data } = supabase.storage.from("logos").getPublicUrl(fileName);
    return data.publicUrl;
  };

  // Delete file from storage
  const deleteLogoFile = async (url: string) => {
    const fileName = url.split("/").pop();
    if (fileName) {
      await supabase.storage.from("logos").remove([fileName]);
    }
  };

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: LogoFormData & { logo_url: string }) => {
      const { error } = await supabase
        .from("client_logos")
        .insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-logos"] });
      queryClient.invalidateQueries({ queryKey: ["client-logos"] });
      toast({ title: "Logo berhasil ditambahkan" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ClientLogo> }) => {
      const { error } = await supabase
        .from("client_logos")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-logos"] });
      queryClient.invalidateQueries({ queryKey: ["client-logos"] });
      toast({ title: "Logo berhasil diupdate" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (logo: ClientLogo) => {
      // Delete file from storage first
      if (logo.logo_url) {
        await deleteLogoFile(logo.logo_url);
      }
      
      const { error } = await supabase
        .from("client_logos")
        .delete()
        .eq("id", logo.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-logos"] });
      queryClient.invalidateQueries({ queryKey: ["client-logos"] });
      toast({ title: "Logo berhasil dihapus" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingLogo(null);
    setLogoFile(null);
    setPreviewUrl("");
    setIsDialogOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let logoUrl = editingLogo?.logo_url || "";

      // Upload new file if selected
      if (logoFile) {
        // Delete old file if updating
        if (editingLogo?.logo_url) {
          await deleteLogoFile(editingLogo.logo_url);
        }
        logoUrl = await uploadLogo(logoFile);
      }

      if (!logoUrl && !editingLogo) {
        toast({ title: "Error", description: "Please upload a logo image", variant: "destructive" });
        setIsUploading(false);
        return;
      }

      if (editingLogo) {
        await updateMutation.mutateAsync({
          id: editingLogo.id,
          data: {
            ...formData,
            logo_url: logoUrl,
          },
        });
      } else {
        await createMutation.mutateAsync({
          ...formData,
          logo_url: logoUrl,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const openEditDialog = (logo: ClientLogo) => {
    setEditingLogo(logo);
    setFormData({
      name: logo.name,
      website_url: logo.website_url || "",
      is_partner: logo.is_partner,
      is_active: logo.is_active,
      display_order: logo.display_order,
    });
    setPreviewUrl(logo.logo_url);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Logo Management</h1>
              <p className="text-sm text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/admin/faq">
              <Button variant="outline" className="gap-2">
                <HelpCircle className="w-4 h-4" />
                FAQ
              </Button>
            </Link>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              if (!open) resetForm();
              setIsDialogOpen(open);
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Tambah Logo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                  <DialogTitle>
                    {editingLogo ? "Edit Logo" : "Tambah Logo Baru"}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Logo Upload */}
                  <div className="space-y-2">
                    <Label>Logo Image</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-lg border border-border bg-muted/50 flex items-center justify-center overflow-hidden">
                        {previewUrl ? (
                          <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG, atau SVG. Max 2MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Klien/Partner</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="PT Example Indonesia"
                      required
                    />
                  </div>

                  {/* Website URL */}
                  <div className="space-y-2">
                    <Label htmlFor="website_url">Website URL (opsional)</Label>
                    <Input
                      id="website_url"
                      type="url"
                      value={formData.website_url}
                      onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>

                  {/* Display Order */}
                  <div className="space-y-2">
                    <Label htmlFor="display_order">Urutan Tampil</Label>
                    <Input
                      id="display_order"
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                      min={0}
                    />
                  </div>

                  {/* Switches */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="is_partner"
                        checked={formData.is_partner}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_partner: checked })}
                      />
                      <Label htmlFor="is_partner" className="cursor-pointer">Partner</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        id="is_active"
                        checked={formData.is_active}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                      />
                      <Label htmlFor="is_active" className="cursor-pointer">Aktif</Label>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                      Batal
                    </Button>
                    <Button type="submit" disabled={isUploading} className="flex-1 gap-2">
                      {isUploading && <Upload className="w-4 h-4 animate-spin" />}
                      {editingLogo ? "Update" : "Simpan"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="icon" onClick={handleSignOut} title="Logout">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : logos && logos.length > 0 ? (
          <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Logo</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Urutan</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logos.map((logo) => (
                  <TableRow key={logo.id} className="border-border/50">
                    <TableCell>
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </TableCell>
                    <TableCell>
                      <div className="w-12 h-12 rounded-lg border border-border bg-muted/50 flex items-center justify-center overflow-hidden">
                        {logo.logo_url ? (
                          <img src={logo.logo_url} alt={logo.name} className="w-full h-full object-contain" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{logo.name}</div>
                        {logo.website_url && (
                          <a 
                            href={logo.website_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            {logo.website_url.replace(/^https?:\/\//, "").split("/")[0]}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        logo.is_partner 
                          ? "bg-primary/10 text-primary" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {logo.is_partner ? "Partner" : "Client"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        logo.is_active 
                          ? "bg-green-500/10 text-green-500" 
                          : "bg-red-500/10 text-red-500"
                      }`}>
                        {logo.is_active ? "Aktif" : "Nonaktif"}
                      </span>
                    </TableCell>
                    <TableCell>{logo.display_order}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(logo)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-card border-border">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Logo?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Logo "{logo.name}" akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutation.mutate(logo)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-16 rounded-xl border border-dashed border-border/50 bg-card/30">
            <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Belum ada logo</h3>
            <p className="text-muted-foreground mb-6">
              Mulai tambahkan logo klien atau partner Anda
            </p>
            <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Logo Pertama
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
