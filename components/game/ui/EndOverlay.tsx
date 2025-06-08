'use client';
import React, { useEffect, useState } from 'react';
import { FaInstagram } from 'react-icons/fa';
import Aurora from './Aurora';

interface EndOverlayProps {
  score: number;
  finalMessage: string;
  onRestart: () => void;
}

export default function EndOverlay({ score, finalMessage, onRestart }: EndOverlayProps) {
  const [showIphone, setShowIphone] = useState(false);

  useEffect(() => {
    if (score >= 10) {
      setTimeout(() => {
        setShowIphone(true);
      }, 400);
    }
  }, [score]);

  const newLocal = "w-screen h-screen absolute inset-0";
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center text-white px-6">
      {/* Fundo preto com Aurora por cima */}
      <div className="absolute inset-0 -z-10">
        {/* Quadrado preto ocupando a tela */}
        <div className="w-screen h-screen bg-black absolute z-200 inset-0" />
  
        {/* Aurora por cima do preto */}
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      {/* Conteúdo do overlay */}
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left z-10">
        {score >= 10 ? (
          <>
            {/* Texto lateral esquerdo */}
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-bold">{finalMessage}</h2>
              <p>
                Printa esse código: <strong>IPHONE-SEKAI-2025</strong>
              </p>
              <p>Envie no direct do Instagram</p>
              <p className="text-sm text-zinc-400">(Só vale se estiver seguindo!)</p>

              <div className="flex gap-4 justify-center md:justify-start pt-2 text-sm">
                <a
                  href="https://www.instagram.com/sekaidistribuicaoetecnologia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaInstagram className="text-pink-500" />
                  @sekaidistribuicaoetecnologia
                </a>
                <a
                  href="https://www.instagram.com/tekbond_oficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaInstagram className="text-pink-500" />
                  @tekbond_oficial
                </a>
              </div>

              <a
                href="https://www.sekaidistribuidora.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm underline text-blue-400 hover:text-blue-300"
              >
                Visite nosso site
              </a>
            </div>

            {/* Imagem do iPhone */}
            {showIphone && (
              <div className="flex-1 flex justify-center">
                <img
                  src="/iphone.png"
                  alt="iPhone"
                  className="w-40 sm:w-48 md:w-56 animate-rise"
                />
              </div>
            )}
          </>
        ) : (
          <h2 className="text-2xl font-bold z-10">{finalMessage}</h2>
        )}
      </div>

      {/* Botão de reinício */}
      <button
        onClick={onRestart}
        className="absolute bottom-16 bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-300 transition z-10"
      >
        Jogar novamente
      </button>
    </div>
  );
}
