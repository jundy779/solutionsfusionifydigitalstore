import Link from "next/link";
import { projects } from "@/content/projects";

// Only real client projects appear here. No placeholder logos.
export function TrustedBy({ compact = false }: { compact?: boolean }) {
  const clients = projects.filter((p) => p.origin === "client");
  return (
    <div className={`trusted${compact ? " trusted--compact" : ""}`} data-reveal>
      <p className="trusted__label">Dipercaya oleh</p>
      <ul className="trusted__list">
        {clients.map((c) => (
          <li key={c.slug}>
            <Link href={`/portfolio/${c.slug}/`} className="trusted__item">
              <strong>{c.name}</strong>
              <span>
                {c.category.split(",")[0]}
                {c.location ? ` · ${c.location}` : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
