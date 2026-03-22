import { useState, useEffect } from 'react';

const FULL_NAME = 'KZYRELL DELA PAZ';
const SUBTITLE = 'Computer Engineer Student | Developer';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
const SCRAMBLE_TICKS = 4; // scramble cycles before revealing each letter
const TICK_MS = 40;

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [resolved, setResolved] = useState(0); // how many chars are locked in
  const [tick, setTick] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (resolved >= FULL_NAME.length) {
      // All resolved — show subtitle
      const t1 = setTimeout(() => setShowSubtitle(true), 300);
      const t2 = setTimeout(() => setFading(true), 1200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }

    const timer = setTimeout(() => {
      const nextChar = FULL_NAME[resolved];

      if (nextChar === ' ') {
        // Spaces resolve instantly
        setResolved((r) => r + 1);
        setTick(0);
        return;
      }

      if (tick < SCRAMBLE_TICKS) {
        // Show scrambled character at current position
        setDisplayed(FULL_NAME.slice(0, resolved) + randomChar());
        setTick((t) => t + 1);
      } else {
        // Lock in correct character
        setDisplayed(FULL_NAME.slice(0, resolved + 1));
        setResolved((r) => r + 1);
        setTick(0);
      }
    }, TICK_MS);

    return () => clearTimeout(timer);
  }, [resolved, tick]);

  useEffect(() => {
    if (fading) {
      const timeout = setTimeout(onDone, 500);
      return () => clearTimeout(timeout);
    }
  }, [fading, onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-bg flex items-center justify-center transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="text-center">
        <pre className="font-mono text-accent text-lg sm:text-2xl md:text-3xl tracking-widest select-none">
          {displayed}
          <span className="animate-pulse">|</span>
        </pre>
        <p
          className={`mt-4 text-xs sm:text-sm text-muted font-mono tracking-wide transition-opacity duration-500 ${showSubtitle ? 'opacity-100' : 'opacity-0'}`}
        >
          {SUBTITLE}
        </p>
      </div>
    </div>
  );
}
