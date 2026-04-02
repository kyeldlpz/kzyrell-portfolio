import { useState, useEffect } from 'react';

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'line' | 'text' | 'split' | 'done'>('line');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 500);
    const t2 = setTimeout(() => setPhase('split'), 1400);
    const t3 = setTimeout(() => setPhase('done'), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (phase === 'done') {
      const t = setTimeout(onDone, 100);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  if (phase === 'done') return null;

  const showText = phase === 'text' || phase === 'split';
  const splitting = phase === 'split';

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Top curtain */}
      <div
        className="absolute top-0 left-0 right-0 bg-bg transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          height: '50vh',
          transform: splitting ? 'translateY(-100%)' : 'translateY(0)',
        }}
      />
      {/* Bottom curtain */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-bg transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          height: '50vh',
          transform: splitting ? 'translateY(100%)' : 'translateY(0)',
        }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Expanding line */}
        <div
          className="h-px bg-foreground transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: phase === 'line' ? '0px' : splitting ? '0px' : '80px',
            opacity: splitting ? 0 : 1,
          }}
        />
        {/* Name */}
        <div
          className="mt-5 overflow-hidden transition-all duration-500 ease-out"
          style={{
            maxHeight: showText ? '40px' : '0px',
            opacity: showText && !splitting ? 1 : 0,
            transform: showText && !splitting ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          <span className="font-serif text-lg tracking-[0.08em] text-foreground select-none">
            Kzyrell Dela Paz
          </span>
        </div>
        {/* Subtitle */}
        <div
          className="overflow-hidden transition-all duration-500 ease-out delay-100"
          style={{
            maxHeight: showText ? '24px' : '0px',
            opacity: showText && !splitting ? 1 : 0,
            transform: showText && !splitting ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted select-none">
            Developer · Engineer
          </span>
        </div>
      </div>
    </div>
  );
}
