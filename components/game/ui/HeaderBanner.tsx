'use client';

import { motion } from 'framer-motion';

export default function HeaderBanner() {
  return (
    <motion.div
      className="w-full py-3 bg-[#f5f0e6] border-b border-black text-center font-serif text-black tracking-wide"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase drop-shadow-sm">
        🕵️‍♂️ Classificados Sekai — Caça ao Tesouro
      </h1>
      <p className="text-sm md:text-base italic mt-1">
        Enigmas escondidos. Prêmios reais. Só os atentos descobrem.
      </p>
    </motion.div>
  );
}
