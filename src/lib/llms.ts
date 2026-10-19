import { audiencePages, keyFacts, serviceExtras } from "@/content/answers";
import { boundaries, engagements, faqs, history, principles, process } from "@/content/company";
import { partnerFaqs, partnerTypes, sponsorTracks } from "@/content/partnership";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";

const u = (p: string) => `${site.url}${p}`;

// llms.txt: a short, link-rich index following the llmstxt.org format.
export function buildLlmsTxt() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    ...keyFacts.map((f) => `- ${f.label}: ${f.value}`),
    "",
    "## Layanan",
    "",
    ...services.map((s) => `- [${s.name}](${u(`/layanan/${s.slug}/`)}): ${s.summary}`),
    "",
    "## Solusi per jenis client",
    "",
    ...audiencePages.map((a) => `- [${a.title}](${u(`/untuk/${a.slug}/`)}): ${a.headline}`),
    "",
    "## Portfolio",
    "",
    ...projects.map(
      (p) =>
        `- [${p.name}](${u(`/portfolio/${p.slug}/`)}): ${p.summary} (${p.origin === "client" ? "project client" : "produk FUSIONIFY"})`,
    ),
    "",
    "## Halaman penting",
    "",
    `- [Tentang dan fakta singkat](${u("/tentang/")}): sejarah sejak 22 Desember 2022, prinsip kerja, batasan, model kerja sama`,
    `- [Partnership dan sponsorship](${u("/partnership/")}): kerja sama untuk agency (white-label), kampus dan komunitas, penyedia teknologi; sponsorship dua arah`,
    `- [FAQ](${u("/faq/")}): jawaban tentang biaya, maintenance, source code, AI, dan keamanan data`,
    `- [Kontak](${u("/kontak/")}): ${site.email}, WhatsApp ${site.whatsappDisplay}`,
    "",
    "## Optional",
    "",
    `- [Versi lengkap untuk LLM](${u("/llms-full.txt")}): seluruh isi website dalam satu file teks`,
    `- [Privasi](${u("/privasi/")})`,
    "",
  ];
  return lines.join("\n");
}

// llms-full.txt: the whole site as clean text so models can read and
// cite it without rendering any JavaScript.
export function buildLlmsFullTxt() {
  const out: string[] = [];
  const push = (...l: string[]) => out.push(...l);

  push(`# ${site.name}`, "", `> ${site.description}`, "", `Dikelola oleh: ${site.legalName}`, `Sumber resmi: ${site.url}`, "");
  push("## Fakta singkat", "", ...keyFacts.map((f) => `- ${f.label}: ${f.value}`), "");

  push("## Tentang", "");
  push(
    `Fusionify Solutions lahir sebagai bagian dari perjalanan FUSIONIFY pada ${site.since}. Awalnya layanan ini tumbuh dari kebutuhan project assistance, pembelajaran teknis, pengembangan software, dan kolaborasi. Cakupannya kemudian meluas ke website dan web application, automation, bot, sistem digital, integrasi API, cloud dan deployment support, serta konsultasi dan custom development. Sejak 2025 Fusionify Solutions juga menangani AI integration, intelligent automation, assistant, chatbot, dan workflow berbasis AI. Fokusnya memilih pendekatan yang sesuai kebutuhan, skala, budget, dan kondisi nyata project, bukan teknologi yang paling kompleks.`,
    "",
  );

  push("## Layanan", "");
  for (const s of services) {
    const x = serviceExtras[s.slug];
    push(`### ${s.name}${s.since ? ` (sejak ${s.since})` : ""}`, "", `URL: ${u(`/layanan/${s.slug}/`)}`, "", x.answer, "");
    for (const g of s.scope) push(`${g.title ? `${g.title}: ` : "Cakupan: "}${g.items.join(", ")}.`);
    if (s.note) push("", s.note);
    push("");
    for (const f of x.faqs) push(`T: ${f.q}`, `J: ${f.a}`, "");
  }

  push("## Solusi per jenis client", "");
  for (const a of audiencePages) {
    push(`### ${a.title}`, "", `URL: ${u(`/untuk/${a.slug}/`)}`, "", a.intro, "");
    push(`Masalah yang sering ditemui: ${a.needs.join("; ")}.`, "");
    for (const f of a.faqs) push(`T: ${f.q}`, `J: ${f.a}`, "");
  }

  push("## Portfolio", "");
  for (const p of projects) {
    push(
      `### ${p.name}`,
      "",
      `URL: ${u(`/portfolio/${p.slug}/`)}`,
      `Jenis: ${p.origin === "client" ? "Project client" : "Produk FUSIONIFY"}`,
      `Kategori: ${p.category}`,
      ...(p.status ? [`Status: ${p.status}`] : []),
      ...(p.url ? [`Situs: ${p.url}`] : []),
      ...(p.location ? [`Lokasi: ${p.location}`] : []),
      "",
      `Masalah: ${p.problem}`,
      `Solusi: ${p.solution}`,
      `Scope: ${p.scope.join(", ")}.`,
      "",
    );
  }

  push("## Partnership", "", `URL: ${u("/partnership/")}`, "");
  for (const t of partnerTypes) push(`### ${t.title}`, "", t.who, `Yang ditawarkan: ${t.offer.join("; ")}.`, ...(t.example ? [t.example] : []), "");
  push("## Sponsorship", "");
  for (const t of sponsorTracks) push(`### ${t.label}`, "", t.body, `Bentuk dukungan: ${t.forms.join("; ")}.`, `Yang perlu dikirim: ${t.send.join("; ")}.`, t.note, "");
  for (const f of partnerFaqs) push(`T: ${f.q}`, `J: ${f.a}`, "");

  push("## Cara kerja", "", ...process.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`), "");
  push("## Prinsip kerja", "", ...principles.map((p) => `- ${p.title}: ${p.body}`), "");
  push("## Model kerja sama", "", ...engagements.map((m) => `- ${m.name}: ${m.fit}`), "");
  push(
    "Harga ditentukan berdasarkan scope, kompleksitas, integrasi, timeline, dan kebutuhan support. Estimasi tertulis dikirim sebelum pekerjaan dimulai.",
    "",
  );
  push("## Yang tidak dikerjakan", "", ...boundaries.map((b) => `- ${b}`), "");
  push("## Sejarah", "", ...history.map((h) => `- ${h.year}: ${h.title}. ${h.body}`), "");
  push("## FAQ umum", "");
  for (const f of faqs) push(`T: ${f.q}`, `J: ${f.a}`, "");
  push("## Kontak", "", `- Email: ${site.email}`, `- WhatsApp: ${site.whatsappDisplay} (https://wa.me/${site.whatsapp})`, `- Website: ${site.url}`, "");
  return out.join("\n");
}
