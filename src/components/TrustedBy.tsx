import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { LogoTile } from "./LogoTile";

// Up to this many clients show as full cards; beyond it the row becomes a
// slow logo marquee so the section never grows taller than one line.
const CARD_LIMIT = 4;

// Only real client projects appear here. Logos come from the clients' own sites.
export function TrustedBy({ compact = false }: { compact?: boolean }) {
  const clients = projects.filter((p) => p.origin === "client" && p.logo);
  const meta = (c: (typeof clients)[number]) =>
    `${c.category.split(",")[0]}${c.location ? ` · ${c.location}` : ""}`;

  if (clients.length > CARD_LIMIT) {
    // Repeat short lists so one pass is always wider than the screen, then
    // hold that pass twice for a seamless loop. Repeats are hidden from
    // assistive tech and keyboard focus.
    const pass: typeof clients = [];
    while (pass.length < 10) pass.push(...clients);
    const loop = [...pass, ...pass];
    return (
      <div className={`trusted trusted--marquee${compact ? " trusted--compact" : ""}`} data-reveal>
        <p className="trusted__label">Dipercaya oleh</p>
        <div className="logo-marquee" style={{ ["--n" as string]: pass.length }}>
          <ul className="logo-marquee__track">
            {loop.map((c, i) => {
              const copy = i >= clients.length;
              return (
                <li key={`${c.slug}-${i}`} aria-hidden={copy || undefined}>
                  <Link
                    href={`/portfolio/${c.slug}/`}
                    className="logo-chip"
                    title={`${c.name}, ${meta(c)}`}
                    tabIndex={copy ? -1 : undefined}
                  >
                    <Image src={c.logo!.src} alt="" width={c.logo!.width} height={c.logo!.height} />
                    <span className="logo-chip__name">{c.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={`trusted${compact ? " trusted--compact" : ""}`} data-reveal>
      <p className="trusted__label">Dipercaya oleh</p>
      <ul className="trusted__list">
        {clients.map((c) => (
          <li key={c.slug}>
            <LogoTile name={c.name} meta={meta(c)} logo={c.logo!} href={`/portfolio/${c.slug}/`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
