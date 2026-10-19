"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, waLink } from "@/content/site";
import { WhatsApp } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        ref.current?.style.setProperty("--progress", max > 0 ? String(Math.min(1, y / max)) : "0");
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header ref={ref} className="site-header" data-scrolled={scrolled || open}>
      <div className="wrap">
        <div className="header-row">
          <Link href="/" className="brand" aria-label="Fusionify Solutions, ke beranda">
            <Image src="/images/fusionify-mark.png" alt="" width={32} height={32} priority />
            <span className="brand-word">
              <strong>FUSIONIFY</strong>
              <span>SOLUTIONS</span>
            </span>
          </Link>

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
            <a className="btn btn-wa btn-sm" href={waLink()} target="_blank" rel="noopener noreferrer">
              <WhatsApp /> Diskusikan kebutuhan
            </a>
          </nav>

          <div className="header-tools">
            <ThemeToggle />
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="main-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Tutup" : "Menu"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
