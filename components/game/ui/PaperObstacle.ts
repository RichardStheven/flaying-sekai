import { PIPE_WIDTH, PIPE_GAP } from '../logic/constants';
import { Pipe } from '../logic/pipes';

let tuboImg: HTMLImageElement | null = null;

function loadTuboImage() {
  if (!tuboImg) {
    tuboImg = new Image();
    tuboImg.src = '/tubo.png';
  }
}

export function drawPaperObstacle(ctx: CanvasRenderingContext2D, pipe: Pipe) {
  loadTuboImage();

  if (tuboImg?.complete && tuboImg.naturalWidth > 0) {
    const naturalAspect = tuboImg.naturalHeight / tuboImg.naturalWidth;

    const desiredHeight = 640; // Altura visual ideal do tubo
    const desiredWidth = desiredHeight / naturalAspect; // Largura proporcional

    // Tubo de cima (espelhado)
    ctx.save();
    ctx.translate(pipe.x + desiredWidth / 2, pipe.height);
    ctx.scale(1, -1);
    ctx.drawImage(tuboImg, -desiredWidth / 2, 0, desiredWidth, desiredHeight);
    ctx.restore();

    // Tubo de baixo (normal)
    ctx.drawImage(
      tuboImg,
      pipe.x,
      pipe.height + PIPE_GAP,
      desiredWidth,
      desiredHeight
    );
  } else {
    // fallback
    ctx.fillStyle = '#444';
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.height);
    ctx.fillRect(pipe.x, pipe.height + PIPE_GAP, PIPE_WIDTH, ctx.canvas.height);
  }
}
