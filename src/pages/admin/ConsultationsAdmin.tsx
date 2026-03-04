import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MessageSquare, Mail, Building2, Briefcase, DollarSign, Trash2, Eye, Image as ImageIcon, Quote, HelpCircle, FolderOpen, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string;
  budget: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const STATUS_OPTIONS = [
  { value: "new", label: "Baru", variant: "default" as const },
  { value: "contacted", label: "Dihubungi", variant: "secondary" as const },
  { value: "in_progress", label: "Dalam Proses", variant: "outline" as const },
  { value: "completed", label: "Selesai", variant: "default" as const },
  { value: "cancelled", label: "Dibatalkan", variant: "destructive" as const },
];

const getStatusBadge = (status: string) => {
  const opt = STATUS_OPTIONS.find((s) => s.value === status);
  if (!opt) return <Badge variant="outline">{status}</Badge>;
  return <Badge variant={opt.variant}>{opt.label}</Badge>;
};

const ConsultationsAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("admin-notification-sound");
    return saved !== null ? saved === "true" : true;
  });

  // Realtime subscription for new consultation requests
  useEffect(() => {
    const channel = supabase
      .channel('consultation-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'consultation_requests',
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["admin-consultations"] });
          const newReq = payload.new as ConsultationRequest;
          if (soundEnabled) {
            const audio = new Audio("/sounds/notification.mp3");
            audio.volume = 0.5;
            audio.play().catch(() => {});
          }
          toast({
            title: "Konsultasi Baru Masuk!",
            description: `${newReq.name} - ${newReq.service}`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast, soundEnabled]);

  const { data: requests, isLoading } = useQuery({
    queryKey: ["admin-consultations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("consultation_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ConsultationRequest[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("consultation_requests")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-consultations"] });
      toast({ title: "Status berhasil diperbarui" });
    },
    onError: (error: Error) => {
      toast({ title: "Gagal memperbarui status", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("consultation_requests").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-consultations"] });
      toast({ title: "Permintaan berhasil dihapus" });
      setSelectedRequest(null);
    },
    onError: (error: Error) => {
      toast({ title: "Gagal menghapus", description: error.message, variant: "destructive" });
    },
  });

  const filtered = filterStatus === "all"
    ? requests
    : requests?.filter((r) => r.status === filterStatus);

  const counts = {
    all: requests?.length || 0,
    new: requests?.filter((r) => r.status === "new").length || 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin/logos">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Konsultasi</h1>
              <p className="text-muted-foreground">
                Kelola permintaan konsultasi masuk
                {counts.new > 0 && (
                  <Badge variant="destructive" className="ml-2">{counts.new} baru</Badge>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={soundEnabled ? "outline" : "ghost"}
              size="sm"
              className="gap-1.5"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                localStorage.setItem("admin-notification-sound", String(next));
              }}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              {soundEnabled ? "Suara On" : "Suara Off"}
            </Button>
            <Link to="/admin/logos">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ImageIcon className="w-4 h-4" /> Logo
              </Button>
            </Link>
            <Link to="/admin/testimonials">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Quote className="w-4 h-4" /> Testimonial
              </Button>
            </Link>
            <Link to="/admin/faq">
              <Button variant="outline" size="sm" className="gap-1.5">
                <HelpCircle className="w-4 h-4" /> FAQ
              </Button>
            </Link>
            <Link to="/admin/projects">
              <Button variant="outline" size="sm" className="gap-1.5">
                <FolderOpen className="w-4 h-4" /> Projects
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Permintaan Konsultasi
              </CardTitle>
              <CardDescription>{counts.all} total permintaan</CardDescription>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua ({counts.all})</SelectItem>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Memuat data...</div>
            ) : !filtered?.length ? (
              <div className="text-center py-8 text-muted-foreground">
                Belum ada permintaan konsultasi.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Layanan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(req.created_at), "dd MMM yyyy, HH:mm", { locale: idLocale })}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{req.name}</p>
                          <p className="text-xs text-muted-foreground">{req.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{req.service}</TableCell>
                      <TableCell>{getStatusBadge(req.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedRequest(req)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              if (confirm("Yakin ingin menghapus permintaan ini?")) {
                                deleteMutation.mutate(req.id);
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

        {/* Detail Dialog */}
        <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Detail Konsultasi</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Nama</p>
                    <p className="font-medium text-sm">{selectedRequest.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <a href={`mailto:${selectedRequest.email}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {selectedRequest.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Building2 className="w-3 h-3" /> Perusahaan</p>
                    <p className="text-sm">{selectedRequest.company || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Briefcase className="w-3 h-3" /> Layanan</p>
                    <p className="text-sm font-medium">{selectedRequest.service}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><DollarSign className="w-3 h-3" /> Budget</p>
                    <p className="text-sm">{selectedRequest.budget || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Tanggal</p>
                    <p className="text-sm">{format(new Date(selectedRequest.created_at), "dd MMMM yyyy, HH:mm", { locale: idLocale })}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Pesan</p>
                  <p className="text-sm bg-muted/50 p-3 rounded-lg leading-relaxed">{selectedRequest.message}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Select
                      value={selectedRequest.status}
                      onValueChange={(value) => {
                        updateStatusMutation.mutate({ id: selectedRequest.id, status: value });
                        setSelectedRequest({ ...selectedRequest, status: value });
                      }}
                    >
                      <SelectTrigger className="w-[160px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm("Yakin ingin menghapus?")) {
                        deleteMutation.mutate(selectedRequest.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Hapus
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ConsultationsAdmin;
