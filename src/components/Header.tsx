"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, waLink } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="wrap header-row">
        <Link href="/" className="brand" aria-label="Fusionify Solutions, ke beranda">
          <Image src="/images/fusionify-mark.png" alt="" width={34} height={34} priority />
          <span className="brand-word">
            <strong>FUSIONIFY</strong>
            <span>SOLUTIONS</span>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Tutup" : "Menu"}
        </button>

        <nav id="main-nav" className="main-nav" data-open={open} aria-label="Utama">
          <ul>
            {nav.map((item) => {
              const active = !item.href.includes("#") && pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={active ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a className="btn btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">
            Diskusikan kebutuhan
          </a>
        </nav>
      </div>
    </header>
  );
}
