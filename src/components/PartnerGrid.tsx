"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Partner } from "@/content/partnership";

// Filter tabs only appear once the list is long enough to need them.
const FILTER_FROM = 9;

export function PartnerGrid({ partners }: { partners: Partner[] }) {
  const types = useMemo(() => Array.from(new Set(partners.map((p) => p.type))), [partners]);
  const [active, setActive] = useState<string>("Semua");
  const showFilter = partners.length >= FILTER_FROM && types.length > 1;
  const list = active === "Semua" ? partners : partners.filter((p) => p.type === active);

  return (
    <div className="partners partners--grid" data-reveal>
      <p className="trusted__label">Partner</p>
      <div>
        {showFilter && (
          <div className="partner-filter" role="tablist" aria-label="Jenis partner">
            {["Semua", ...types].map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={active === t}
                className={active === t ? "is-active" : undefined}
                onClick={() => setActive(t)}
              >
                {t}
              </button>
            ))}
          </div>
        )}
        <ul className="partner-cards">
          {list.map((p) => (
            <li key={p.name}>
              <details className="partner-card2" data-spot>
                <summary>
                  <span className={`logo-tile__mark${p.logo.width / p.logo.height > 2 ? " logo-tile__mark--wide" : ""}`} aria-hidden="true">
                    <Image src={p.logo.src} alt="" width={p.logo.width} height={p.logo.height} />
                  </span>
                  <span className="partner-card2__text">
                    <strong>{p.name}</strong>
                    <span>{p.type}</span>
                  </span>
                  <span className="partner-card2__toggle" aria-hidden="true" />
                </summary>
                <div className="partner-card2__body">
                  <p>{p.body}</p>
                  {p.url && (
                    <a className="link" href={p.url} target="_blank" rel="noopener noreferrer">
                      Kunjungi {p.name}
                    </a>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
