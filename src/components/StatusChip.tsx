import type { Project } from "@/content/projects";

// DS status badge: always a small dot before the text, tone by status.
export function StatusChip({ project }: { project: Project }) {
  if (!project.status) return null;
  return <span className={`chip status status-${project.statusTone ?? "plan"}`}>{project.status}</span>;
}
