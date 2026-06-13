import { useEffect, useRef } from 'react';

const HEX_SIZE = 30;
const GLOW_RADIUS = 200;

function drawHexagon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  lineWidth: number
) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

export default function HexGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef<number>(0);
  const lastDrawRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const hexWidth = HEX_SIZE * 2;
    const hexHeight = Math.sqrt(3) * HEX_SIZE;
    const cols = Math.ceil(window.innerWidth / (hexWidth * 0.75)) + 1;
    const rows = Math.ceil(window.innerHeight / hexHeight) + 1;

    const animate = (timestamp: number) => {
      const isInteracting = mouseRef.current.x > -9999;

      // Throttle to ~15fps when not interacting, ~30fps when interacting
      const targetInterval = isInteracting ? 33 : 66;
      if (timestamp - lastDrawRef.current < targetInterval) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastDrawRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexWidth * 0.75;
          const y = row * hexHeight + (col % 2) * (hexHeight / 2);

          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let opacity = 0.04;
          let size = HEX_SIZE;

          if (distance < GLOW_RADIUS) {
            const factor = 1 - distance / GLOW_RADIUS;
            opacity = 0.04 + factor * 0.35;
            size = HEX_SIZE + factor * 4;
          }

          drawHexagon(
            ctx,
            x,
            y,
            size,
            `rgba(204, 255, 0, ${opacity})`,
            opacity > 0.15 ? 1.2 : 0.5
          );
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
