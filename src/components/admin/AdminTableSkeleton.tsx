import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AdminTableSkeletonProps {
  /** Number of skeleton rows to render */
  rows?: number;
  /** Column configuration: width class or undefined for default */
  columns?: Array<{ widthClass?: string; align?: "left" | "right" }>;
  /** Whether to render an image/avatar placeholder in the first cell */
  withLeadingThumb?: boolean;
}

/**
 * Generic skeleton for admin tables. Matches Table layout so rows don't shift
 * when real data arrives.
 */
export function AdminTableSkeleton({
  rows = 5,
  columns = [
    { widthClass: "w-32" },
    { widthClass: "w-40" },
    { widthClass: "w-24" },
    { widthClass: "w-20" },
    { widthClass: "w-16", align: "right" },
  ],
  withLeadingThumb = false,
}: AdminTableSkeletonProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, i) => (
            <TableHead
              key={i}
              className={col.align === "right" ? "text-right" : ""}
            >
              <Skeleton className={`h-3 ${col.widthClass ?? "w-24"}`} />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <TableRow key={rowIdx}>
            {columns.map((col, colIdx) => (
              <TableCell
                key={colIdx}
                className={col.align === "right" ? "text-right" : ""}
              >
                {colIdx === 0 && withLeadingThumb ? (
                  <Skeleton className="h-12 w-12 rounded-lg" />
                ) : (
                  <div
                    className={
                      col.align === "right" ? "flex justify-end" : ""
                    }
                  >
                    <Skeleton
                      className={`h-4 ${col.widthClass ?? "w-24"}`}
                    />
                  </div>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/**
 * Full-page skeleton: header bar + table. Use for admin pages whose top-level
 * loading state previously rendered just a centered "Memuat..." text.
 */
export function AdminPageSkeleton({
  rows = 6,
  columns,
  withLeadingThumb,
}: AdminTableSkeletonProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card/50 p-4">
          <AdminTableSkeleton
            rows={rows}
            columns={columns}
            withLeadingThumb={withLeadingThumb}
          />
        </div>
      </div>
    </div>
  );
}
