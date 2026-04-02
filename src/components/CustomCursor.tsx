import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    let animId: number;
    const tick = () => {
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      animId = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, .project-item, .skill-card, .tag, [data-cursor-hover]')) {
        cursor.style.width = '16px';
        cursor.style.height = '16px';
        ring.style.width = '56px';
        ring.style.height = '56px';
        ring.style.opacity = '0.25';
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.relatedTarget as Element | null;
      if (!target || !target.closest?.('a, button, .project-item, .skill-card, .tag, [data-cursor-hover]')) {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.opacity = '0.4';
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} id="cursor" />
      <div ref={ringRef} id="cursor-ring" />
    </>
  );
}
