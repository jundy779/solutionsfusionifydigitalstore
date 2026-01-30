import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface SortableTestimonialRowProps {
  testimonial: Testimonial;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, is_active: boolean) => void;
}

export const SortableTestimonialRow = ({
  testimonial,
  onEdit,
  onDelete,
  onToggleActive,
}: SortableTestimonialRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: testimonial.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style} className={isDragging ? "bg-muted/50" : ""}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded touch-none"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </button>
          {testimonial.display_order}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={testimonial.image_url || undefined} alt={testimonial.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
              {testimonial.avatar_initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">
              {testimonial.role} • {testimonial.company}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p className="line-clamp-2 text-sm max-w-md">{testimonial.quote}</p>
      </TableCell>
      <TableCell>
        <Switch
          checked={testimonial.is_active}
          onCheckedChange={(checked) => onToggleActive(testimonial.id, checked)}
        />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(testimonial)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => {
              if (confirm("Apakah Anda yakin ingin menghapus testimonial ini?")) {
                onDelete(testimonial.id);
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
