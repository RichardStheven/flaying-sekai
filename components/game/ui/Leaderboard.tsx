'use client';

import { useUser } from '@clerk/nextjs';

type Props = {
  currentScore: number;
};

type Player = {
  name: string;
  score: number;
};

const fakePlayers: Player[] = [
  { name: 'Metalúrgico007', score: 12 },
  { name: 'BlindagemPRO', score: 9 },
  { name: 'SoldaMestre', score: 7 },
  { name: 'EletroKing', score: 5 },
];

export default function Leaderboard({ currentScore }: Props) {
  const { user } = useUser();

  const playerName =
    user?.fullName || user?.firstName || user?.username || 'Anônimo';

  const players = user
    ? [{ name: playerName, score: currentScore }, ...fakePlayers]
    : fakePlayers;

  return (
    <div className="absolute top-4 right-4 z-50 bg-black/60 text-white rounded-md p-4 w-[240px] shadow-lg backdrop-blur-md">
      <h2 className="text-sm font-bold mb-2 uppercase tracking-wide text-center">
        🏆 Ranking
      </h2>
      <ul className="space-y-1 text-sm">
        {players.map((player, index) => (
          <li key={index} className="flex justify-between">
            <span className="truncate max-w-[140px]">{player.name}</span>
            <span>{player.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
