'use client';

import { useEffect, useState } from 'react';

export default function MobileBlocker() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-black text-white flex flex-col items-center justify-center text-center p-6">
      {/* 🔧 Efeito glitch */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_10%,#222_10%,#222_20%,#111_20%)] bg-[length:10px_100%] opacity-5 animate-glitchLines pointer-events-none" />

      <div className="animate-glitchText text-3xl font-bold mb-4 text-red-400 drop-shadow-[0_0_8px_red]">
        ⚠️ ACESSO INTERCEPTADO
      </div>

      <p className="text-lg max-w-md leading-relaxed animate-glitchFade text-zinc-300">
        Você está muito perto de encontrar o tesouro...
        <br />
        Mas precisa <strong className="text-white">acessar de um computador</strong> para desbloquear a missão e garantir seu iPhone. 💻🔐
      </p>

      <a
        href="https://flaying-sekai.vercel.app"
        className="mt-6 inline-block bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-zinc-200 transition"
      >
        Abrir no desktop
      </a>
    </div>
  );
}
