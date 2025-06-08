'use client';
import React from 'react';

interface EndOverlayProps {
  score: number;
  finalMessage: string;
  onRestart: () => void;
}

export default function EndOverlay({ score, finalMessage, onRestart }: EndOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 bg-black bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center text-center text-white px-4">
      <h2 className="text-2xl font-bold mb-4">{finalMessage}</h2>

      {score >= 10 && (
        <div className="mb-6">
          <p className="mb-2">
            Printa esse código: <strong>IPHONE-SEKAI-2025</strong>
          </p>
          <p className="mb-2">
            Envie no direct da <strong>@sekaidistribuidora</strong>
          </p>
          <p className="text-sm">(Só vale se estiver seguindo 😉)</p>
        </div>
      )}

      <button
        onClick={onRestart}
        className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-300"
      >
        Jogar novamente
      </button>
    </div>
  );
}
