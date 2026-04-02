import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function palette(theme: 'light' | 'dark') {
  return theme === 'dark'
    ? { ink: 0xf4ede1, fill: 0x171715, accent: 0xb69973, fog: 0x09090b }
    : { ink: 0x2a2a26, fill: 0xe8e4db, accent: 0xc4a878, fog: 0xf5f3ee };
}

export default function HeroScene({ theme }: { theme: 'light' | 'dark' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const colors = palette(theme);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(colors.fog, isMobile ? 0.08 : 0.055);

    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 5.9 : 5.2);

    const group = new THREE.Group();
    scene.add(group);

    const detail = isMobile ? 0 : 1;
    const geometry = new THREE.IcosahedronGeometry(isMobile ? 1.35 : 1.6, detail);
    const original = Float32Array.from(geometry.attributes.position.array);

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: colors.ink,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.35 : 0.32,
      depthWrite: false,
    });
    const wireMesh = new THREE.Mesh(geometry, wireMaterial);
    wireMesh.renderOrder = 1;
    group.add(wireMesh);

    const solidGeometry = new THREE.IcosahedronGeometry(isMobile ? 1.25 : 1.48, detail);
    const solidMaterial = new THREE.MeshPhongMaterial({
      color: colors.fill,
      emissive: colors.accent,
      emissiveIntensity: theme === 'dark' ? 0.08 : 0.06,
      shininess: 36,
      transparent: true,
      opacity: theme === 'dark' ? 0.76 : 0.72,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    const solidMesh = new THREE.Mesh(solidGeometry, solidMaterial);
    solidMesh.renderOrder = 0;
    group.add(solidMesh);

    const haloGeometry = new THREE.SphereGeometry(isMobile ? 1.85 : 2.15, 24, 24);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: colors.accent,
      transparent: true,
      opacity: theme === 'dark' ? 0.07 : 0.06,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    group.add(halo);

    const dotCount = isMobile ? 24 : 64;
    const dotGeometry = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(dotCount * 3);
    const dotState: { theta: number; phi: number; radius: number; speed: number }[] = [];

    for (let index = 0; index < dotCount; index++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.2 + Math.random() * (isMobile ? 0.8 : 1.4);
      dotPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      dotPositions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      dotPositions[index * 3 + 2] = radius * Math.cos(phi);
      dotState.push({ theta, phi, radius, speed: 0.00025 + Math.random() * 0.00035 });
    }

    dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    const dotMaterial = new THREE.PointsMaterial({
      color: colors.ink,
      size: isMobile ? 0.03 : 0.024,
      transparent: true,
      opacity: theme === 'dark' ? 0.52 : 0.4,
    });
    const dots = new THREE.Points(dotGeometry, dotMaterial);
    group.add(dots);

    scene.add(new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.82 : 0.7));

    const keyLight = new THREE.DirectionalLight(0xffffff, theme === 'dark' ? 0.9 : 0.85);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(colors.accent, theme === 'dark' ? 2.4 : 1.8, 20);
    rimLight.position.set(-2.4, -1.2, 3.2);
    scene.add(rimLight);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollProgress = 0;
    let activity = 0.3;
    let lastInteraction = performance.now();

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
      lastInteraction = performance.now();
    };

    const handleScroll = () => {
      scrollProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.2);
    };

    const handleResize = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    const clock = new THREE.Clock();
    let animationFrame = 0;

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      const targetActivity = prefersReducedMotion ? 0 : (performance.now() - lastInteraction < 1800 ? 1 : 0.28);
      activity += (targetActivity - activity) * 0.04;

      targetX += (mouseX - targetX) * 0.035;
      targetY += (mouseY - targetY) * 0.035;

      const positions = geometry.attributes.position as THREE.BufferAttribute;
      const morphStrength = prefersReducedMotion ? 0.02 : 0.05 + activity * 0.08;
      for (let index = 0; index < positions.count; index++) {
        const ox = original[index * 3];
        const oy = original[index * 3 + 1];
        const oz = original[index * 3 + 2];
        const noise = Math.sin(elapsed * 0.9 + ox * 2.4) * Math.cos(elapsed * 0.65 + oy * 1.9) * morphStrength;
        positions.setXYZ(index, ox + ox * noise, oy + oy * noise, oz + oz * noise);
      }
      positions.needsUpdate = true;

      group.position.y = -scrollProgress * 0.5;
      group.rotation.y = elapsed * 0.14 + targetX * (0.16 + activity * 0.38) + scrollProgress * 0.22;
      group.rotation.x = elapsed * 0.05 + targetY * (0.1 + activity * 0.2) - scrollProgress * 0.08;
      solidMesh.rotation.y = elapsed * 0.12 + targetX * (0.14 + activity * 0.22);
      halo.scale.setScalar(1 + Math.sin(elapsed * 1.15) * 0.02 + activity * 0.015);

      const dotPositionsAttr = dotGeometry.attributes.position as THREE.BufferAttribute;
      for (let index = 0; index < dotCount; index++) {
        const dot = dotState[index];
        dot.theta += prefersReducedMotion ? dot.speed * 0.15 : dot.speed * (0.8 + activity * 0.5);
        dotPositionsAttr.setXYZ(
          index,
          dot.radius * Math.sin(dot.phi) * Math.cos(dot.theta),
          dot.radius * Math.sin(dot.phi) * Math.sin(dot.theta),
          dot.radius * Math.cos(dot.phi)
        );
      }
      dotPositionsAttr.needsUpdate = true;

      camera.position.z = (isMobile ? 5.9 : 5.2) + scrollProgress * 0.25;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      wireMaterial.dispose();
      solidGeometry.dispose();
      solidMaterial.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
      dotGeometry.dispose();
      dotMaterial.dispose();
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}
