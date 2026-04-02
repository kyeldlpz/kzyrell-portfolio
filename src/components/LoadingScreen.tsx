import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const NAME = 'Kzyrell Dela Paz';

/* Timing (ms) — cinematic pacing */
const ORB_MS = 2800;
const K_DRAW_DELAY = 1400;   // K starts drawing while orb is still building
const K_DRAW_MS = 1200;      // Time to draw all 3 strokes
const K_GLOW_MS = 600;       // K glows/pulses after drawing
const K_EXIT_MS = 500;       // K shrinks out
const NAME_DELAY = 80;       // Per-letter delay
const NAME_PRE = 200;        // Pause before first letter
const HOLD_MS = 700;         // Hold after full name
const FADE_MS = 800;         // Final fade out

type Phase = 'build' | 'k-draw' | 'k-glow' | 'k-exit' | 'name' | 'hold' | 'fade';

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>('build');
  const [letters, setLetters] = useState(0);

  /* ── Three.js wireframe orb ───────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isDark = document.documentElement.classList.contains('dark');
    const bg = isDark ? 0x0f0f0d : 0xf6f2ea;
    const wireColor = isDark ? 0xd0b082 : 0x8d6a39;
    const dotColor = isDark ? 0xf4ede1 : 0x171715;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(bg);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 4.5;

    const setSize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    /* Icosahedron wireframe */
    const geo = new THREE.IcosahedronGeometry(1.3, 1);
    const edges = new THREE.EdgesGeometry(geo);

    const posArr = edges.attributes.position.array as Float32Array;
    let totalLen = 0;
    for (let i = 0; i < posArr.length; i += 6) {
      const dx = posArr[i + 3] - posArr[i];
      const dy = posArr[i + 4] - posArr[i + 1];
      const dz = posArr[i + 5] - posArr[i + 2];
      totalLen += Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    const lineMat = new THREE.LineDashedMaterial({
      color: wireColor,
      dashSize: 0,
      gapSize: totalLen,
      opacity: 0,
      transparent: true,
    });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    wireframe.computeLineDistances();
    scene.add(wireframe);

    /* Vertex dots */
    const verts = geo.attributes.position;
    const seen = new Set<string>();
    const dotPositions: number[] = [];
    for (let i = 0; i < verts.count; i++) {
      const key = `${verts.getX(i).toFixed(3)},${verts.getY(i).toFixed(3)},${verts.getZ(i).toFixed(3)}`;
      if (!seen.has(key)) {
        seen.add(key);
        dotPositions.push(verts.getX(i), verts.getY(i), verts.getZ(i));
      }
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: dotColor,
      size: 2.5,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    scene.add(dots);

    setSize();
    window.addEventListener('resize', setSize);

    const start = performance.now();
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const elapsed = performance.now() - start;
      const t = Math.min(elapsed / ORB_MS, 1);
      // Slow start, smooth finish
      const ease = t < 0.4
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

      lineMat.dashSize = ease * totalLen;
      lineMat.gapSize = totalLen - lineMat.dashSize;
      lineMat.opacity = ease * 0.7;

      dotMat.opacity = Math.max(0, (t - 0.4) / 0.6) * 0.5;

      // Gentle, slow rotation
      wireframe.rotation.y = elapsed * 0.00018;
      wireframe.rotation.x = Math.sin(elapsed * 0.00015) * 0.08;
      dots.rotation.copy(wireframe.rotation);

      renderer.render(scene, camera);
    };
    animate();

    /* Trigger K draw while orb is still assembling */
    const kTimer = setTimeout(() => setPhase('k-draw'), K_DRAW_DELAY);

    return () => {
      clearTimeout(kTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', setSize);
      renderer.dispose();
      geo.dispose();
      edges.dispose();
      lineMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
    };
  }, []);

  /* ── Phase state machine ──────────────────────── */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    switch (phase) {
      case 'k-draw':
        t = setTimeout(() => setPhase('k-glow'), K_DRAW_MS);
        break;
      case 'k-glow':
        t = setTimeout(() => setPhase('k-exit'), K_GLOW_MS);
        break;
      case 'k-exit':
        t = setTimeout(() => setPhase('name'), K_EXIT_MS);
        break;
      case 'hold':
        t = setTimeout(() => setPhase('fade'), HOLD_MS);
        break;
      case 'fade':
        t = setTimeout(onDone, FADE_MS);
        break;
    }
    return () => clearTimeout(t);
  }, [phase, onDone]);

  /* ── Letter reveal ────────────────────────────── */
  useEffect(() => {
    if (phase !== 'name') return;
    if (letters >= NAME.length) {
      setPhase('hold');
      return;
    }
    const delay = letters === 0 ? NAME_PRE : NAME_DELAY;
    const t = setTimeout(() => setLetters((n) => n + 1), delay);
    return () => clearTimeout(t);
  }, [phase, letters]);

  /* Phase flags */
  const kVisible = phase === 'k-draw' || phase === 'k-glow' || phase === 'k-exit';
  const kGlowing = phase === 'k-glow';
  const kExiting = phase === 'k-exit';
  const showName = phase === 'name' || phase === 'hold' || phase === 'fade';

  return (
    <div className={`loading-screen${phase === 'fade' ? ' is-fading' : ''}`}>
      <canvas ref={canvasRef} className="loading-canvas" />
      <div className="loading-center">
        {/* ── Text K mark (DM Serif Display) ──── */}
        <span className={[
          'loading-k-text',
          kVisible ? 'is-visible' : '',
          kGlowing ? 'is-glowing' : '',
          kExiting ? 'is-exiting' : '',
        ].filter(Boolean).join(' ')}>
          K
        </span>

        {/* ── Full name ────────────────────────── */}
        {showName && (
          <>
            <div className="loading-name-row">
              <span className="loading-name-initial">K</span>
              <span className="loading-name">
                {NAME.slice(1).split('').map((char, i) => (
                  <span
                    key={i}
                    className={`loading-letter${i < letters - 1 ? ' is-visible' : ''}`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </div>
            <span className={`loading-subtitle${phase === 'hold' || phase === 'fade' ? ' is-visible' : ''}`}>
              Developer &middot; Engineer
            </span>
          </>
        )}
      </div>
    </div>
  );
}
