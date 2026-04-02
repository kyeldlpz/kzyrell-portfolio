import { Suspense, lazy, useEffect, useState } from 'react';

const HeroScene = lazy(() => import('./HeroScene'));

export default function Hero() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(root.classList.contains('dark') ? 'dark' : 'light');
    });

    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-canvas-shell" aria-hidden="true">
        <Suspense fallback={<div className="hero-canvas" />}>
          <HeroScene theme={theme} />
        </Suspense>
      </div>
      <div className="hero-copy reveal visible">
        <span className="hero-eyebrow">Kzyrell Dela Paz · Computer Engineering Student · Developer · Cloud Builder</span>
        <h1 className="hero-title">
          Designing practical software with a sharper <em>engineering instinct</em>.
        </h1>
      </div>
    </section>
  );
}
