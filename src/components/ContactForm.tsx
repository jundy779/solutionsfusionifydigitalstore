"use client";

import { useState } from "react";
import { services } from "@/content/services";
import { site, waLink } from "@/content/site";
import { Chat } from "./Icons";

type Errors = Partial<Record<"name" | "story", string>>;

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [mailHref, setMailHref] = useState(`mailto:${site.email}`);

  const compose = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const org = String(data.get("org") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const story = String(data.get("story") ?? "").trim();
    const lines = [
      `Halo Fusionify Solutions, saya ${name || "(nama)"}${org ? ` dari ${org}` : ""}.`,
      service ? `Kebutuhan: ${service}` : "Kebutuhan: belum tahu, perlu diskusi",
      "",
      story || "(ceritakan kebutuhan di sini)",
    ];
    return { name, story, service, text: lines.join("\n") };
  };

  const refreshMail = (form: HTMLFormElement) => {
    const { service, text } = compose(form);
    const subject = `Kebutuhan: ${service || "diskusi project"}`;
    setMailHref(
      `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`,
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, story, text } = compose(e.currentTarget);
    const next: Errors = {};
    if (!name) next.name = "Isi nama supaya kami tahu harus menyapa siapa.";
    if (story.length < 10) next.story = "Ceritakan kebutuhan kamu minimal satu kalimat.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(next.name ? "f-name" : "f-story")?.focus();
      return;
    }
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      className="form"
      noValidate
      onSubmit={onSubmit}
      onChange={(e) => refreshMail(e.currentTarget)}
    >
      <div className="form-row">
        <div className="field">
          <label htmlFor="f-name">Nama</label>
          <input
            id="f-name"
            name="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "e-name" : undefined}
          />
          {errors.name && (
            <p className="field-error" id="e-name">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="f-org">
            Usaha atau instansi <span className="hint">(opsional)</span>
          </label>
          <input id="f-org" name="org" autoComplete="organization" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-service">Kebutuhan paling dekat</label>
        <select id="f-service" name="service" defaultValue={defaultService}>
          <option value="">Belum tahu, mau diskusi dulu</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="f-story">Ceritakan kebutuhannya</label>
        <textarea
          id="f-story"
          name="story"
          placeholder="Contoh: order toko kami masih dicatat manual dari chat WhatsApp, ingin dibuat lebih rapi."
          aria-invalid={!!errors.story}
          aria-describedby={errors.story ? "e-story" : "h-story"}
        />
        {errors.story ? (
          <p className="field-error" id="e-story">
            {errors.story}
          </p>
        ) : (
          <p className="form-note" id="h-story">
            Tidak perlu istilah teknis. Ceritakan masalahnya seperti ke teman.
          </p>
        )}
      </div>

      <div className="form-foot">
        <button type="submit" className="btn btn-wa">
          <Chat /> Kirim lewat WhatsApp
        </button>
        <a className="link" href={mailHref}>
          atau kirim lewat email
        </a>
      </div>
      <p className="form-note">
        Pesan dibuka di WhatsApp atau aplikasi email kamu. Website ini tidak menyimpan isi form.
      </p>
    </form>
  );
}
