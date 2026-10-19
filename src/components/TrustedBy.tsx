import { projects } from "@/content/projects";
import { LogoTile } from "./LogoTile";

// Only real client projects appear here. Logos come from the clients' own sites.
export function TrustedBy({ compact = false }: { compact?: boolean }) {
  const clients = projects.filter((p) => p.origin === "client" && p.logo);
  return (
    <div className={`trusted${compact ? " trusted--compact" : ""}`} data-reveal>
      <p className="trusted__label">Dipercaya oleh</p>
      <ul className="trusted__list">
        {clients.map((c) => (
          <li key={c.slug}>
            <LogoTile
              name={c.name}
              meta={`${c.category.split(",")[0]}${c.location ? ` · ${c.location}` : ""}`}
              logo={c.logo!}
              href={`/portfolio/${c.slug}/`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
