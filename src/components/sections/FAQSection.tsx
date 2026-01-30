import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Apa saja layanan yang ditawarkan Fusionify?",
    answer: "Fusionify menyediakan layanan lengkap transformasi digital termasuk Web & App Development, Automation Bots (WhatsApp & Telegram), Digital Systems & API Integration, Cloud & IT Support, serta Project-Based Services seperti MVP Development dan System Audit.",
  },
  {
    question: "Berapa lama waktu pengerjaan project?",
    answer: "Waktu pengerjaan bervariasi tergantung kompleksitas project. Website landing page biasanya 1-2 minggu, aplikasi web custom 4-8 minggu, dan sistem enterprise 2-4 bulan. Kami akan memberikan timeline detail setelah konsultasi awal.",
  },
  {
    question: "Apakah ada garansi untuk layanan yang diberikan?",
    answer: "Ya, kami memberikan garansi maintenance selama 30 hari setelah project selesai. Selama periode ini, kami akan memperbaiki bug atau issue tanpa biaya tambahan. Untuk support jangka panjang, tersedia paket maintenance bulanan.",
  },
  {
    question: "Bagaimana proses kerja sama dengan Fusionify?",
    answer: "Proses dimulai dengan konsultasi gratis untuk memahami kebutuhan Anda. Kemudian kami menyiapkan proposal dan timeline. Setelah deal, kami mulai development dengan update progress berkala. Project diserahkan setelah testing dan approval Anda.",
  },
  {
    question: "Apakah Fusionify menerima project dari luar Indonesia?",
    answer: "Tentu! Kami melayani klien dari berbagai negara. Komunikasi bisa dilakukan dalam Bahasa Indonesia atau English melalui video call, WhatsApp, atau email sesuai preferensi Anda.",
  },
  {
    question: "Berapa biaya untuk membuat aplikasi atau website?",
    answer: "Biaya tergantung pada scope dan fitur yang dibutuhkan. Kami menawarkan berbagai paket mulai dari landing page hingga sistem enterprise. Hubungi kami untuk konsultasi gratis dan dapatkan penawaran yang sesuai dengan budget Anda.",
  },
  {
    question: "Apakah saya bisa request revisi selama pengerjaan?",
    answer: "Ya, revisi adalah bagian dari proses development kami. Setiap milestone akan di-review bersama dan Anda bisa memberikan feedback. Jumlah revisi yang termasuk dalam paket akan dijelaskan di proposal.",
  },
  {
    question: "Teknologi apa yang digunakan Fusionify?",
    answer: "Kami menggunakan teknologi modern seperti React, Next.js, Node.js, Python, dan berbagai cloud platform (AWS, Google Cloud, Supabase). Pemilihan tech stack disesuaikan dengan kebutuhan project untuk hasil optimal.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, hsl(212 89% 45% / 0.08) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">FAQ</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-5 text-foreground">
            Pertanyaan
            <span className="text-gradient"> Umum</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan kami
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-xl bg-card/50 backdrop-blur-sm px-6 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary transition-colors py-5 text-base font-medium [&[data-state=open]>svg]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm">
            Masih punya pertanyaan?{" "}
            <a 
              href="#contact" 
              className="text-primary hover:underline font-medium"
            >
              Hubungi kami langsung
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
