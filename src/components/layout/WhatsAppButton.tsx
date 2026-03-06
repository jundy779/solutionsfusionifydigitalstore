import { motion } from "framer-motion";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7">
    <path d="M16.004 3.2C9.054 3.2 3.4 8.854 3.4 15.804c0 2.212.577 4.37 1.674 6.27L3.2 28.8l6.93-1.816A12.56 12.56 0 0 0 16.004 28.4c6.95 0 12.596-5.654 12.596-12.596S22.954 3.2 16.004 3.2Zm0 23.016a10.38 10.38 0 0 1-5.544-1.596l-.398-.236-4.122 1.08 1.1-4.016-.26-.414A10.36 10.36 0 0 1 5.576 15.804c0-5.748 4.68-10.428 10.428-10.428 5.748 0 10.42 4.68 10.42 10.428 0 5.748-4.672 10.412-10.42 10.412Zm5.72-7.804c-.314-.158-1.858-.918-2.146-1.022-.288-.106-.498-.158-.708.156-.21.314-.812 1.022-.996 1.232-.184.21-.366.236-.68.078-.314-.158-1.326-.488-2.526-1.558-.934-.832-1.564-1.86-1.748-2.174-.184-.314-.02-.484.138-.64.142-.142.314-.366.47-.55.158-.184.21-.314.314-.524.106-.21.054-.392-.026-.55-.078-.158-.708-1.706-.97-2.336-.256-.614-.516-.53-.708-.54l-.604-.012c-.21 0-.55.078-.838.392-.288.314-1.1 1.074-1.1 2.62s1.126 3.04 1.284 3.25c.158.21 2.216 3.386 5.372 4.748.75.324 1.336.518 1.792.662.754.24 1.44.206 1.982.124.604-.09 1.858-.76 2.12-1.494.264-.734.264-1.362.184-1.494-.078-.132-.288-.21-.604-.366Z"/>
  </svg>
);

export const WhatsAppButton = () => {
  const phoneNumber = "6283111380628";
  const message = encodeURIComponent("Halo Fusionify! Saya tertarik dengan layanan Anda.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:bg-[#20BD5A] transition-colors"
      aria-label="Chat via WhatsApp"
    >
      <WhatsAppIcon />
    </motion.a>
  );
};
