declare module 'canvas-confetti' {
  type Shape = 'square' | 'circle';

  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: Shape[];
    scalar?: number;
    zIndex?: number;
  }

  export default function confetti(options?: ConfettiOptions): Promise<null> | null;
}
