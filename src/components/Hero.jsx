import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

/* ── Frame-by-Frame Local Animation Sequence ── */
// Dynamically loads all frames from assets/frames/ (currently 294 frames for buttery smooth playback)
const frameModules = import.meta.glob('../assets/frames/*.{png,jpg,jpeg,webp}', { eager: true });

// Convert object to a sorted array of image URLs
const frames = Object.keys(frameModules)
  // Numeric sorting so "002.png" comes before "100.png"
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map((key) => frameModules[key].default || frameModules[key]);

const frameCount = frames.length > 0 ? frames.length : 147;
const currentFrame = (index) => {
  // If local frames exist, serve them. Otherwise, fallback.
  if (frames.length > 0 && frames[index]) {
    return frames[index];
  }
  return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`;
};

/* ── Text sections with associated real Inventa content ── */
const scrollSections = [
  {
    id: 'intro',
    kicker: 'INVENTA SYSTEMS',
    headline: 'Leading Life Science Distributor.',
    description: 'Gujarat\'s premier authorized distributor of high-end analytical instruments, centrifuges, and critical laboratory plastic ware since 2017.',
    cta: { primary: 'Explore Applications', secondary: 'Learn About Us' },
    productImage: '/turnkey_lab.png'
  },
  {
    id: 'precision',
    kicker: 'THERMO FISHER SCIENTIFIC',
    headline: 'Authorized Service Provider.',
    description: 'Certified service partner for PCR, RT-PCR, Centrifuges, Microscopes, Plate Readers, and a wide range of Thermo Fisher Scientific equipment.',
    cta: { primary: 'Our Services', secondary: 'Request Service' },
    productImage: '/centrifuge_lab.png'
  },
  {
    id: 'integration',
    kicker: 'INNOVATION & QUALITY',
    headline: 'Delivering Life-Changing Solutions.',
    description: 'From molecular biology to forensic science, we supply consumables, reusables, and cutting-edge instruments to diagnostics labs, pharma companies, and research academia across India.',
    cta: { primary: 'Explore Catalog', secondary: 'Get a Quote' },
    productImage: '/life_sciences.png'
  },
];

/* ── Marquee data - real Inventa focus areas ── */
const marqueeItems = [
  { label: 'Molecular Biology', image: '/mol_bio_diagnostics.png' },
  { label: 'Cell Culture',      image: '/cell_culture.png' },
  { label: 'Genomics',          image: '/dna_rna_extraction.png' },
  { label: 'Proteomics',        image: '/life_sciences.png' },
  { label: 'Immunology',        image: '/clinical_diagnostics.png' },
  { label: 'PCR Instruments',   image: '/pcr_product.png' },
  { label: 'Centrifuges',       image: '/centrifuge_lab.png' },
  { label: 'Forensic Science',  image: '/forensic_sciences.png' },
];

/* ── Marquee Row ── */
const MarqueeRow = ({ items, speed = 25, direction = 'left', onItemHover, onItemLeave, hoveredItem }) => {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="marquee-track-wrapper">
      <div className={`marquee-track ${direction === 'right' ? 'is-reverse' : ''}`} style={{ '--marquee-duration': `${speed}s` }}>
        {tripled.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className={`marquee-item ${hoveredItem?.label === item.label ? 'is-hovered' : ''}`}
            onMouseEnter={() => onItemHover(item)}
            onMouseLeave={onItemLeave}
          >
            <span className="marquee-dot" />
            <span className="marquee-text">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Scroll Progress Dots ── */
const ScrollDots = ({ activeIndex, total }) => (
  <div className="scroll-dots">
    {Array.from({ length: total }, (_, i) => (
      <div key={i} className={`scroll-dot ${i === activeIndex ? 'active' : ''}`} />
    ))}
  </div>
);

const Hero = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ── High-performance frame animation engine ──
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);         // cached canvas context
  const bitmapsRef = useRef([]);       // GPU-ready ImageBitmap objects
  const lastDrawn = useRef(-1);        // skip redundant draws
  const coverParams = useRef(null);    // cached cover-fit calculations

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // ── Draw a specific frame onto the canvas (only if changed) ──
  const drawFrame = (index) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    
    let bmp = bitmapsRef.current[index];
    let drawIdx = index;

    // If exact frame isn't loaded, find the closest loaded frame (prevents freezing/skipping on mobile connections)
    if (!bmp) {
      let offset = 1;
      while (offset < frameCount) {
        if (index - offset >= 0 && bitmapsRef.current[index - offset]) {
          bmp = bitmapsRef.current[index - offset];
          drawIdx = index - offset;
          break;
        }
        if (index + offset < frameCount && bitmapsRef.current[index + offset]) {
          bmp = bitmapsRef.current[index + offset];
          drawIdx = index + offset;
          break;
        }
        offset++;
      }
    }

    if (!bmp) return;
    if (drawIdx === lastDrawn.current) return; // no-op if same frame

    const p = coverParams.current;
    if (!p) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(bmp, p.dx, p.dy, p.dw, p.dh);
    lastDrawn.current = drawIdx;
  };

  // ── Calculate drawing math for images ──
  const calcCover = (img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width;
    const ih = img.height;

    // Full screen "cover" scaling
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;

    let dx, dy;
    
    // On mobile, use centered full-screen cover so the subject isn't cut off
    if (window.innerWidth <= 900) {
      dx = (cw - dw) / 2;
      dy = (ch - dh) / 2;
    } else {
      // On laptop, anchor to the right
      dx = cw - dw;
      dy = (ch - dh) / 2;
    }
    
    coverParams.current = { dx, dy, dw, dh };
  };

  // ── Size the canvas at full device resolution ──
  const sizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    // alpha: false on laptop to optimize performance, alpha: true on mobile to fix black transparent PNGs
    ctxRef.current = canvas.getContext('2d', { alpha: true });
    // Recalculate cover params if we have bitmaps
    if (bitmapsRef.current[0]) {
      calcCover(bitmapsRef.current[0]);
    }
    // Force redraw at new resolution
    lastDrawn.current = -1;
  };

  // ── Preload all frames as GPU-ready ImageBitmaps ──
  useEffect(() => {
    let cancelled = false;
    const bitmaps = new Array(frameCount).fill(null);
    bitmapsRef.current = bitmaps;

    // Load frames using Image objects from already-imported URLs
    // (avoids double fetch since import.meta.glob already resolved URLs)
    const loadFrame = async (i) => {
      try {
        const src = currentFrame(i);
        if (!src) return;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        if (cancelled) return;
        const bmp = await createImageBitmap(img);
        if (cancelled) { bmp.close(); return; }
        bitmaps[i] = bmp;
        // Show first frame immediately
        if (i === 0) {
          sizeCanvas();
          calcCover(bmp);
          drawFrame(0);
        }
      } catch (e) {
        // silently skip failed frames
      }
    };

    // Load first frame with top priority, then batch the rest
    loadFrame(0).then(async () => {
      const batchSize = 8;
      for (let i = 1; i < frameCount; i += batchSize) {
        if (cancelled) break;
        const batch = [];
        for (let j = 0; j < batchSize && i + j < frameCount; j++) {
          batch.push(loadFrame(i + j));
        }
        await Promise.all(batch);
      }
    });

    window.addEventListener('resize', sizeCanvas);
    sizeCanvas();

    return () => {
      cancelled = true;
      window.removeEventListener('resize', sizeCanvas);
      bitmaps.forEach(b => b && b.close());
    };
  }, []);

  // ── Scroll-driven section switcher ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      if (sectionHeight <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));

      const sectionCount = scrollSections.length;
      const newSection = Math.min(sectionCount - 1, Math.floor(progress * sectionCount));
      if (!Number.isFinite(newSection) || newSection < 0) return;
      setActiveSection(newSection);

      let frameIndex;
      if (window.innerWidth <= 900) {
        // Mobile specific mapping as requested:
        // 1.webp (index 0) default on load
        // 294.webp (last frame) default at end
        // Section 1 (intro): 2.webp to 100.webp (index 1 to 99)
        // Section 2 (precision): 101.webp to 199.webp (index 100 to 198)
        // Section 3 (integration): 200.webp to 293.webp (index 199 to 292)
        if (progress === 0) {
          frameIndex = 0;
        } else if (progress === 1) {
          frameIndex = frameCount - 1;
        } else {
          if (progress < 1 / 3) {
            const localProgress = progress * 3;
            frameIndex = 1 + Math.floor(localProgress * 99);
          } else if (progress < 2 / 3) {
            const localProgress = (progress - 1 / 3) * 3;
            frameIndex = 100 + Math.floor(localProgress * 99);
          } else {
            const localProgress = (progress - 2 / 3) * 3;
            frameIndex = 199 + Math.floor(localProgress * 94);
          }
        }
        // Safely bound the index
        frameIndex = Math.min(frameCount - 1, Math.max(0, frameIndex));
      } else {
        // Laptop logic remains unchanged
        frameIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(progress * frameCount)));
      }

      // Direct mapping — instant frame response
      requestAnimationFrame(() => drawFrame(frameIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentSection = scrollSections[activeSection] ?? scrollSections[0];

  return (
    <section className="hero-scroll-wrapper" ref={sectionRef} onMouseMove={handleMouseMove}>
      <div className="hero-sticky">
        
        {/* Right Side: Product Spotlight — DPI-aware canvas */}
        <div className="hero-product-spotlight">
          <canvas
            ref={canvasRef}
            className="spotlight-canvas"
          />
          {/* Subtle vignette/fade so the image blends smoothly with the background */}
          <div className="spotlight-fade-left"></div>
          <div className="spotlight-fade-bottom"></div>
        </div>

        {/* Scroll progress dots (right side) */}
        <ScrollDots activeIndex={activeSection} total={scrollSections.length} />

        {/* Text Content — animates between sections (Left Side) */}
        <div className="hero-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection.id}
              className="hero-text-block"
              initial={{ opacity: 0, y: isMobile ? 10 : 40, filter: isMobile ? 'none' : 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'none' }}
              exit={{ opacity: 0, y: isMobile ? -10 : -40, filter: isMobile ? 'none' : 'blur(4px)' }}
              transition={{ duration: isMobile ? 0.25 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Kicker */}
              <div className="hero-kicker">
                <span className="kicker-line" />
                <span>{currentSection.kicker}</span>
              </div>

              {/* Headline */}
              <h1 className="hero-headline">{currentSection.headline}</h1>

              {/* Description */}
              <p className="hero-description">{currentSection.description}</p>

              {/* CTAs */}
              <div className="hero-ctas">
                <a href="#applications" className="cta-primary">
                  {currentSection.cta.primary}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#about" className="cta-secondary">{currentSection.cta.secondary}</a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stats — always visible */}
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">2017</span>
              <span className="stat-label">Established</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">15K</span>
              <span className="stat-label">Sq Ft Warehouse</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">7+</span>
              <span className="stat-label">Product Lines</span>
            </div>
          </div>
        </div>

        {/* Marquee at bottom - focus areas only */}
        <div className="hero-marquee-section">
          <MarqueeRow
            items={marqueeItems}
            speed={25}
            onItemHover={setHoveredItem}
            onItemLeave={() => setHoveredItem(null)}
            hoveredItem={hoveredItem}
          />
        </div>

        {/* Floating hover image */}
        <AnimatePresence>
          {hoveredItem && (
            <motion.div
              className={`marquee-hover-image ${hoveredItem.image.startsWith('/brands/') ? 'is-brand-logo' : ''}`}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ left: mousePos.x - 170, top: mousePos.y - 280 }}
            >
              <motion.img
                key={hoveredItem.label}
                src={hoveredItem.image}
                alt={hoveredItem.label}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
