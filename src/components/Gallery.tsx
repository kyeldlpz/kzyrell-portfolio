import { useState, useRef, useEffect } from 'react';

const images = [
  { src: '/gallery/gallery-1.png', alt: 'Gallery image 1' },
  { src: '/gallery/gallery-2.png', alt: 'Gallery image 2' },
  { src: '/gallery/gallery-3.png', alt: 'Gallery image 3' },
  { src: '/gallery/gallery-4.png', alt: 'Gallery image 4' },
  { src: '/gallery/gallery-5.png', alt: 'Gallery image 5' },
  { src: '/gallery/gallery-6.png', alt: 'Gallery image 6' },
  { src: '/gallery/gallery-7.png', alt: 'Gallery image 7' },
];  

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  useEffect(() => {
    if (selected === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      else if (e.key === 'ArrowLeft') setSelected((selected - 1 + images.length) % images.length);
      else if (e.key === 'ArrowRight') setSelected((selected + 1) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selected]);

  // One set width = images * (w-44 + gap-3) = images.length * 188
  const oneSetWidth = images.length * (176 + 12);

  // Infinite auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || selected !== null) return;

    let animId: number;
    const tick = () => {
      if (!pausedRef.current) {
        el.scrollLeft += 0.5;
        // Seamless loop: jump back when past one set
        if (el.scrollLeft >= oneSetWidth) {
          el.scrollLeft -= oneSetWidth;
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [selected, oneSetWidth]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const step = 188;
    if (direction === 'right') {
      el.scrollLeft += step;
      if (el.scrollLeft >= oneSetWidth) el.scrollLeft -= oneSetWidth;
    } else {
      el.scrollLeft -= step;
      if (el.scrollLeft < 0) el.scrollLeft += oneSetWidth;
    }
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selected === null) return;
    if (direction === 'next') {
      setSelected((selected + 1) % images.length);
    } else {
      setSelected((selected - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="gallery" className="section-container">
      <h2 className="section-title">Gallery</h2>

      <div className="relative overflow-hidden">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-foreground hover:bg-surface/80 transition-all"
          aria-label="Scroll left"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-hidden scrollbar-hide px-2"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
          onTouchStart={() => { pausedRef.current = true; }}
          onTouchEnd={() => { pausedRef.current = false; }}
        >
          {[...images, ...images, ...images].map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i % images.length)}
              className="w-44 h-44 flex-shrink-0 rounded-lg overflow-hidden border border-border bg-surface cursor-pointer transition-transform duration-200 hover:scale-[1.03]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-foreground hover:bg-surface/80 transition-all"
          aria-label="Scroll right"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          {/* Counter — top left */}
          <span className="absolute top-4 left-4 text-white/80 text-sm font-mono z-10">
            {selected + 1} / {images.length}
          </span>

          {/* Close button — top right */}
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
          </button>

          {/* Image */}
          <div className="absolute inset-0 flex items-center justify-center px-14 py-3">
            <img
              src={images[selected].src}
              alt={images[selected].alt}
              className="max-w-full max-h-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Next image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>


        </div>
      )}
    </section>
  );
}
