'use client';

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';

export default function StartOverlay({ onStart }: { onStart: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-zinc-900 p-8 rounded-xl max-w-md text-white text-center border border-zinc-700 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🚀 Bem-vindo à Caça ao Tesouro Sekai</h2>

        <SignedOut>
          <p className="mb-4 text-sm text-zinc-300">
            Para jogar, você precisa fazer login com telefone, Google ou e-mail. Assim conseguimos te premiar! 🎁
          </p>

          <div className="flex flex-col gap-3 items-center">
            <SignInButton mode="modal">
              <button className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-zinc-200">
                Entrar para jogar
              </button>
            </SignInButton>

            <span className="text-xs text-zinc-400">ou</span>

            <SignUpButton mode="modal">
              <button className="px-6 py-2 bg-zinc-700 text-white font-bold rounded-full hover:bg-zinc-600">
                Criar conta
              </button>
            </SignUpButton>
          </div>
        </SignedOut>

        <SignedIn>
          <p className="mb-4">
            Tudo pronto! Agora é só clicar para começar o desafio.
          </p>
          <button
            onClick={onStart}
            className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full"
          >
            Iniciar jogo
          </button>
        </SignedIn>
      </div>
    </div>
  );
}
