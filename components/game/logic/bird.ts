import { GRAVITY, JUMP_STRENGTH } from './constants';

export interface Bird {
  x: number;
  y: number;
  velocity: number;
}

// Cria o pássaro inicial
export const createBird = (): Bird => ({
  x: 100,
  y: 200,
  velocity: 0,
});

// Atualiza posição e física do pássaro a cada frame
export const updateBird = (bird: Bird) => {
  bird.velocity += GRAVITY;
  bird.y += bird.velocity;
};

// Faz o pássaro "voar" (pulo ao pressionar espaço)
export const jumpBird = (bird: Bird) => {
  bird.velocity = JUMP_STRENGTH;
};
