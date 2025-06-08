// components/Header.tsx
'use client'

import { Menu, Globe, Instagram, Handshake, FileText } from 'lucide-react'

export default function Header() {
    return (
        <div className="w-full  bg-[#fdfcf7]/90 flex justify-center pt-6 pb-2">
          <header className="bg-[#fdfcf7]/90 backdrop-blur-md shadow-lg border border-gray-200 rounded-2xl px-6 py-4 w-full max-w-6xl flex items-center justify-between">
            {/* Botão menu (mobile) */}
            <button className="text-black md:hidden">
              <Menu size={24} />
            </button>
      
            {/* Título central */}
            <h1 className="text-lg text-black md:text-2xl font-semibold uppercase tracking-wider text-center flex-1 md:flex-none">
              Classificados Sekai
            </h1>
      
            {/* Ícones à direita (desktop) */}
            <div className="hidden md:flex items-center gap-4 text-gray-800">
              <a href="https://sekaidistribuidora.com.br" target="_blank" rel="noopener noreferrer">
                <Globe size={20} />
              </a>
              <a href="https://www.instagram.com/sekaidistribuicaoetecnologia" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Handshake size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FileText size={20} />
              </a>
            </div>
          </header>
        </div>
      )}
