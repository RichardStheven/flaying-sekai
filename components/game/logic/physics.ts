import { BIRD_RADIUS, PIPE_GAP, PIPE_WIDTH } from './constants';
import { Bird } from './bird';

export interface Pipe {
  x: number;
  height: number;
  scored: boolean;
}

// Verifica se há colisão entre o pássaro e um pipe
export const checkCollision = (bird: Bird, pipe: Pipe): boolean => {
  const inPipeX =
    bird.x + BIRD_RADIUS > pipe.x &&
    bird.x - BIRD_RADIUS < pipe.x + PIPE_WIDTH;

  const hitTop = bird.y - BIRD_RADIUS < pipe.height;
  const hitBottom = bird.y + BIRD_RADIUS > pipe.height + PIPE_GAP;

  return inPipeX && (hitTop || hitBottom);
};

// Verifica se o pássaro saiu da tela (perdeu)
export const outOfBounds = (bird: Bird, canvasHeight: number): boolean => {
  return bird.y + BIRD_RADIUS > canvasHeight || bird.y - BIRD_RADIUS < 0;
};
