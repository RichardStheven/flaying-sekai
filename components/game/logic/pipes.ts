import { PIPE_GAP, PIPE_WIDTH, PIPE_SPEED, CANVAS_WIDTH } from './constants';

export interface Pipe {
  x: number;
  height: number;
  scored: boolean;
}

// Gera um novo par de obstáculos (topo + base)
export const generatePipe = (canvasHeight: number): Pipe => {
  const minHeight = 50;
  const maxHeight = canvasHeight - PIPE_GAP - 200;
  const height = Math.random() * (maxHeight - minHeight) + minHeight;

  return {
    x: CANVAS_WIDTH,
    height,
    scored: false,
  };
};

// Move todos os obstáculos na horizontal
export const movePipes = (pipes: Pipe[]): Pipe[] => {
  return pipes.map((pipe) => ({
    ...pipe,
    x: pipe.x - PIPE_SPEED,
  }));
};

// Remove os pipes que já saíram da tela
export const filterVisiblePipes = (pipes: Pipe[]): Pipe[] => {
  return pipes.filter((pipe) => pipe.x + PIPE_WIDTH > 0);
};

// Verifica se deve contar ponto
export const shouldScore = (pipe: Pipe, birdX: number): boolean => {
  return !pipe.scored && pipe.x + PIPE_WIDTH < birdX;
};
