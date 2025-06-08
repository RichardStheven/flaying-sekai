'use client';


import TrueFocus from './ui/TrueFocus';
import { UserButton } from '@clerk/nextjs';
import { useEffect, useRef, useState } from 'react';
import { createBird, updateBird, jumpBird } from './logic/bird';
import {
  generatePipe,
  movePipes,
  filterVisiblePipes,
  shouldScore,
  Pipe,
} from './logic/pipes';
import { checkCollision, outOfBounds } from './logic/physics';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PIPE_WIDTH,
  WIN_SCORE,
} from './logic/constants';

import StartOverlay from './ui/StartOverlay';
import EndOverlay from './ui/EndOverlay';
import Leaderboard from './ui/Leaderboard';
import Background from './ui/Background';

import { useUser } from '@clerk/nextjs';
import { savePlayerToDatabase } from './logic/savePlayer';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [finalMessage, setFinalMessage] = useState('');

  const bird = useRef(createBird());
  const pipes = useRef<Pipe[]>([]);
  const { user } = useUser();
  const animationRef = useRef<number | null>(null);
  const mascotImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/mastk.png';
    img.onload = () => {
      mascotImgRef.current = img;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isRunning) {
        jumpBird(bird.current);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const drawBird = () => {
        const size = 96;

        if (mascotImgRef.current) {
          ctx.drawImage(
            mascotImgRef.current,
            bird.current.x - size / 2,
            bird.current.y - size / 2,
            size,
            size
          );
        } else {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(bird.current.x, bird.current.y, 12, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      if (!isRunning) {
        drawBird();

        pipes.current.forEach((pipe) => {
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.height);
          ctx.fillRect(pipe.x, pipe.height + 180, PIPE_WIDTH, CANVAS_HEIGHT);
        });

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Arial';

        animationRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      updateBird(bird.current);
      drawBird();

      pipes.current = movePipes(pipes.current);
      pipes.current.forEach((pipe) => {
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.height);
        ctx.fillRect(pipe.x, pipe.height + 180, PIPE_WIDTH, CANVAS_HEIGHT);

        if (shouldScore(pipe, bird.current.x)) {
          pipe.scored = true;
          setScore((prev) => prev + 1);
        }

        if (score >= WIN_SCORE || finalMessage.includes('Parabéns')) {
          return;
        }

        if (checkCollision(bird.current, pipe)) {          setFinalMessage('💥 Você perdeu!');
          setIsRunning(false);
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
        }
      });

      pipes.current = filterVisiblePipes(pipes.current);

      if (
        pipes.current.length === 0 ||
        pipes.current[pipes.current.length - 1].x < canvas.width - 300
      ) {
        pipes.current.push(generatePipe(canvas.height));
      }

      if (
        outOfBounds(bird.current, canvas.height) &&
        !finalMessage.includes('Parabéns')
      ) {
        setFinalMessage('💥 Você perdeu!');
        setIsRunning(false);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      }

      if (score >= WIN_SCORE && !finalMessage) {
        setFinalMessage('🎉 Parabéns! Você encontrou um iPhone perdido!');
        setIsRunning(false);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        return;
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px Arial';

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRunning, score, finalMessage]);

  useEffect(() => {
    if (
      !isRunning &&
      finalMessage &&
      user?.username &&
      user?.phoneNumbers?.[0]?.phoneNumber
    ) {
      savePlayerToDatabase(
        user.username,
        user.phoneNumbers[0].phoneNumber,
        score
      );
    }
  }, [isRunning, finalMessage, user, score]);

  return (
    <div className="relative w-screen h-screen overflow-hidden text-black">
      <Background
        speed={0.5}
        squareSize={40}
        direction="diagonal"
        borderColor="#fff"
        hoverFillColor="#222"
      />

      <canvas ref={canvasRef} className="absolute inset-0 z-10" />


<div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 bg-black/70 backdrop-blur-md rounded-xl shadow-xl border border-zinc-800 px-6 py-3 flex items-center justify-between gap-4 text-white">
  <div className="text-base font-semibold whitespace-nowrap">Pontos Tekbond: {score}</div>

  <div className="flex-1 flex justify-center">
    <TrueFocus
      sentence="Classificados Sekai"
      borderColor="rgb(59,130,246)"
      glowColor="rgba(59,130,246,0.4)"
      animationDuration={0.4}
      pauseBetweenAnimations={0.8}
      blurAmount={3}
    />
  </div>

  <UserButton afterSignOutUrl="/" />
</div>
      <Leaderboard currentScore={score} />

      {showInstructions && (
        <StartOverlay
          onStart={() => {
            setShowInstructions(false);
            setIsRunning(true);
          }}
        />
      )}

      {!isRunning && finalMessage && !showInstructions && (
        <EndOverlay
          score={score}
          finalMessage={finalMessage}
          onRestart={() => {
            setScore(0);
            setShowInstructions(false);
            bird.current = createBird();
            pipes.current = [];
            setFinalMessage('');
            requestAnimationFrame(() => {
              setIsRunning(true);
            });
          }}
        />
      )}
    </div>
  );
}
