'use client';
import { useState } from 'react';
import IntroModal from '@/components/game/IntroModal';
import GameCanvas from '@/components/game/GameCanvas';
import ProductScroller from '@/components/game/ui/ProductScroller'

export default function PageDoJogo() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white overflow-hidden">

      {showModal && <IntroModal onClose={() => setShowModal(false)} />}

      {!showModal && (
        <div className="flex items-center justify-center h-screen">
          <GameCanvas />
          <ProductScroller />
        </div>
      )}
    </div>
  );
}
