import Image from "next/image";
import type { Project } from "@/content/projects";

/* Screenshot when we have one; otherwise a composed cover that hints at
   what the product does, never a fake screenshot. */
export function ProjectCover({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.image) {
    return (
      <div className="browser">
        <div className="browser-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          {project.domain && <span>{project.domain}</span>}
        </div>
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(max-width: 860px) 100vw, 60vw"
          priority={priority}
        />
      </div>
    );
  }

  switch (project.cover) {
    case "chat":
      return (
        <div className="cover dark" aria-hidden="true">
          <div className="cover-chat">
            <span className="me">/order paket-a</span>
            <span>Paket A, Rp25.000. Pilih metode bayar.</span>
            <span className="me">QRIS</span>
            <span className="ok">Dibayar. Produk dikirim otomatis.</span>
          </div>
        </div>
      );
    case "people":
      return (
        <div className="cover" aria-hidden="true">
          <div className="cover-people">
            {[0, 1, 2].map((i) => (
              <div className="person" key={i}>
                <i />
                <b />
                <em />
              </div>
            ))}
          </div>
        </div>
      );
    case "warehouse":
      return (
        <div className="cover" aria-hidden="true">
          <div className="cover-iso">
            {["full", "", "full", "low", "", "full", "", "", "full", "full", "low", "", "", "full", "", "full"].map(
              (c, i) => (
                <i key={i} className={c} />
              ),
            )}
          </div>
        </div>
      );
    case "store":
    default:
      return (
        <div className="cover" aria-hidden="true">
          <div className="cover-store">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <i />
                <b />
              </div>
            ))}
          </div>
        </div>
      );
  }
}
