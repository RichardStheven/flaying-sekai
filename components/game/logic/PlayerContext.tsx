'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Tipagem dos dados do jogador
type Player = {
  name: string;
  whats: string;
};

// Tipo do contexto
type PlayerContextType = {
  player: Player;
  setPlayer: (player: Player) => void;
};

// Criação do contexto
export const PlayerContext = createContext<PlayerContextType>({
  player: { name: '', whats: '' },
  setPlayer: () => {},
});

// Provider para envolver a aplicação
export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [player, setPlayer] = useState<Player>({ name: '', whats: '' });

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Hook de acesso (opcional)
export const usePlayer = () => useContext(PlayerContext);
