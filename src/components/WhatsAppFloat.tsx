"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/content/site";
import { WhatsApp } from "./Icons";

// Appears only after the hero, so it never covers the opening content.
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Hidden over the hero and again once the footer (which has its own
    // WhatsApp button) comes into view, so it never covers footer links.
    // At most once per frame (scroll fires many times per frame on phones),
    // and the footer is looked up once instead of on every event.
    const footer = document.querySelector(".site-footer");
    let raf = 0;
    const update = () => {
      raf = 0;
      const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
      setShow(window.scrollY > 640 && footerTop > window.innerHeight - 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
