import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
import {
  ArrowLeft,
  MessageSquare,
  Mail,
  Building2,
  Briefcase,
  DollarSign,
  Trash2,
  Eye,
  Image as ImageIcon,
  Quote,
  HelpCircle,
  FolderOpen,
  Volume2,
  VolumeX,
  StickyNote,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { AdminTableSkeleton } from "@/components/admin/AdminTableSkeleton";

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

interface ConsultationNote {
  id: string;
  consultation_id: string;
  author_id: string | null;
  author_email: string | null;
  note: string;
  created_at: string;
}

type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

const STATUS_OPTIONS: Array<{
  value: string;
  label: string;
  variant: BadgeVariant;
}> = [
  { value: "new", label: "New", variant: "default" },
  { value: "contacted", label: "Contacted", variant: "secondary" },
  { value: "qualified", label: "Qualified", variant: "secondary" },
  { value: "proposal_sent", label: "Proposal Sent", variant: "outline" },
  { value: "closed_won", label: "Closed Won", variant: "default" },
  { value: "closed_lost", label: "Closed Lost", variant: "destructive" },
];

const getStatusBadge = (status: string) => {
  const opt = STATUS_OPTIONS.find((s) => s.value === status);
  if (!opt) return <Badge variant="outline">{status}</Badge>;
  return <Badge variant={opt.variant}>{opt.label}</Badge>;
};

const ConsultationsAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [noteDraft, setNoteDraft] = useState("");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("admin-notification-sound");
    return saved !== null ? saved === "true" : true;
  });

  // Realtime subscription for new consultation requests
  useEffect(() => {
    const channel = supabase
      .channel("consultation-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "consultation_requests" },
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

  // Notes for currently selected lead
  const { data: notes, isLoading: notesLoading } = useQuery({
    queryKey: ["consultation-notes", selectedRequest?.id],
    enabled: !!selectedRequest?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("consultation_notes")
        .select("*")
        .eq("consultation_id", selectedRequest!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ConsultationNote[];
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
      toast({ title: "Status pipeline diperbarui" });
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

  const addNoteMutation = useMutation({
    mutationFn: async (note: string) => {
      if (!selectedRequest) throw new Error("No lead selected");
      const { error } = await supabase.from("consultation_notes").insert({
        consultation_id: selectedRequest.id,
        author_id: user?.id ?? null,
        author_email: user?.email ?? null,
        note: note.trim(),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultation-notes", selectedRequest?.id] });
      setNoteDraft("");
      toast({ title: "Catatan ditambahkan" });
    },
    onError: (error: Error) => {
      toast({ title: "Gagal menambah catatan", description: error.message, variant: "destructive" });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("consultation_notes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultation-notes", selectedRequest?.id] });
      toast({ title: "Catatan dihapus" });
    },
  });

  const filtered = filterStatus === "all"
    ? requests
    : requests?.filter((r) => r.status === filterStatus);

  const counts = {
    all: requests?.length || 0,
    new: requests?.filter((r) => r.status === "new").length || 0,
    open: requests?.filter((r) => !["closed_won", "closed_lost"].includes(r.status)).length || 0,
    won: requests?.filter((r) => r.status === "closed_won").length || 0,
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
              <h1 className="text-3xl font-bold text-foreground">Lead Pipeline</h1>
              <p className="text-muted-foreground">
                Kelola permintaan konsultasi & follow-up
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

        {/* Pipeline summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{counts.all}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Baru</p>
              <p className="text-2xl font-bold text-primary">{counts.new}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Open Pipeline</p>
              <p className="text-2xl font-bold">{counts.open}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Closed Won</p>
              <p className="text-2xl font-bold text-green-500">{counts.won}</p>
            </CardContent>
          </Card>
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
              <SelectTrigger className="w-[200px]">
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
              <AdminTableSkeleton
                rows={5}
                columns={[
                  { widthClass: "w-32" },
                  { widthClass: "w-40" },
                  { widthClass: "w-32" },
                  { widthClass: "w-24" },
                  { widthClass: "w-16", align: "right" },
                ]}
              />
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
                      <TableCell>
                        <Select
                          value={req.status}
                          onValueChange={(value) =>
                            updateStatusMutation.mutate({ id: req.id, status: value })
                          }
                        >
                          <SelectTrigger className="h-8 w-[150px] text-xs">
                            <SelectValue>{getStatusBadge(req.status)}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
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
        <Dialog
          open={!!selectedRequest}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedRequest(null);
              setNoteDraft("");
            }
          }}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detail Lead</DialogTitle>
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
                    <span className="text-sm text-muted-foreground">Pipeline:</span>
                    <Select
                      value={selectedRequest.status}
                      onValueChange={(value) => {
                        updateStatusMutation.mutate({ id: selectedRequest.id, status: value });
                        setSelectedRequest({ ...selectedRequest, status: value });
                      }}
                    >
                      <SelectTrigger className="w-[180px] h-8">
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

                {/* Notes section */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <StickyNote className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Catatan Lead</h3>
                    {notes && notes.length > 0 && (
                      <Badge variant="outline" className="text-xs">{notes.length}</Badge>
                    )}
                  </div>

                  <div className="flex gap-2 mb-3">
                    <Textarea
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      placeholder="Tambahkan catatan follow-up, hasil call, dll..."
                      rows={2}
                      maxLength={5000}
                      className="text-sm"
                    />
                    <Button
                      size="sm"
                      className="self-start gap-1"
                      disabled={!noteDraft.trim() || addNoteMutation.isPending}
                      onClick={() => addNoteMutation.mutate(noteDraft)}
                    >
                      <Send className="w-3 h-3" /> Simpan
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notesLoading ? (
                      <p className="text-xs text-muted-foreground">Memuat catatan...</p>
                    ) : !notes?.length ? (
                      <p className="text-xs text-muted-foreground italic">Belum ada catatan.</p>
                    ) : (
                      notes.map((n) => (
                        <div
                          key={n.id}
                          className="bg-muted/40 rounded-lg p-3 text-sm border border-border/50"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium text-foreground">
                                {n.author_email ?? "Admin"}
                              </span>
                              {" · "}
                              {format(new Date(n.created_at), "dd MMM yyyy, HH:mm", { locale: idLocale })}
                            </p>
                            {n.author_id === user?.id && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-destructive hover:text-destructive"
                                onClick={() => {
                                  if (confirm("Hapus catatan ini?")) {
                                    deleteNoteMutation.mutate(n.id);
                                  }
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                          <p className="whitespace-pre-wrap leading-relaxed">{n.note}</p>
                        </div>
                      ))
                    )}
                  </div>
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
