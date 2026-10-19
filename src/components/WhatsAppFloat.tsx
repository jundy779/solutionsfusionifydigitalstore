"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/content/site";
import { WhatsApp } from "./Icons";

// Appears only after the hero, so it never covers the opening content.
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      className="wa-float"
      data-show={show}
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      aria-label="Chat WhatsApp"
    >
      <WhatsApp />
      <span className="wa-float__label">Chat WhatsApp</span>
    </a>
  );
}
