'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroModal({ onClose }: { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500); // Delay para permitir a animação
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white text-black max-w-md w-full rounded-2xl shadow-xl p-6 text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">🎉 Uau! Você descobriu nosso segredo!</h2>
            <p className="text-base mb-6">
              Essa caça ao tesouro está só começando...<br />
              Pronto para jogar e garantir um iPhone 15?
            </p>
            <button
              onClick={handleClose}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-zinc-800 transition"
            >
              Começar o jogo
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
