import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './OurBrands.css';

const brandItems = [
  { id: 'thermo-fisher',    label: 'Thermo Fisher',       image: '/brands/thermo-fisher.png' },
  { id: 'molbio',           label: 'MolBio',              image: '/brands/molbio.png' },
  { id: 'pierce',           label: 'Pierce Biotechnology', image: '/brands/pierce.png' },
  { id: 'peprotech',        label: 'Peprotech',           image: '/brands/peprotech.png' },
  { id: 'fisher-scientific',label: 'Fisher Scientific',   image: '/brands/fisher-scientific.png' },
  { id: 'labserve',         label: 'Labserve',            image: '/brands/labserve.png', darkBg: true },
  { id: 'revvity',          label: 'Revvity',             image: '/brands/revvity.png' },
  { id: 'gibco',            label: 'Gibco',               image: '/brands/gibco.png' },
  { id: 'labconco',         label: 'Labconco',            image: '/brands/labconco.png' },
  { id: 'fisherbrand',      label: 'Fisherbrand',         image: '/brands/fisherbrand.png' },
  { id: 'invitrogen',       label: 'Invitrogen',          image: '/brands/invitrogen.png' },
  { id: 'unity-lab',        label: 'Unity Lab Services',  image: '/brands/unity-lab-services.png' },
  { id: 'olink',            label: 'Olink',               image: '/brands/olink.png' },
  { id: 'nunc',             label: 'Nunc',                image: '/brands/nunc.png' },
  { id: 'applied-bio',      label: 'Applied Biosystems',  image: '/brands/applied-biosystems.png' },
  { id: 'nalgene',          label: 'Nalgene',             image: '/brands/nalgene.png' },
  { id: 'dgr',              label: 'Decipher Genomics',   image: '/brands/dgr.jpg' },
];

const OurBrands = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Triple items for seamless loop
  const tripled = [...brandItems, ...brandItems, ...brandItems];

  return (
    <section className="ob-section" id="our-brands">
      {/* Decorative radial glow */}
      <div className="ob-glow" />

      {/* Section header */}
      <div className="ob-header">
        <motion.span
          className="ob-kicker"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="ob-kicker-line" />
          Our Brands
        </motion.span>
        <motion.h2
          className="ob-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          World-class brands,<br />
          <span className="ob-title-accent">delivered to your lab.</span>
        </motion.h2>
        <motion.p
          className="ob-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We are authorized distributors for the world's most trusted life science and laboratory brands — bringing premium reagents, instruments, and consumables directly to laboratories across India.
        </motion.p>
      </div>

      {/* Brand Marquee Row (Scrolling Left to Right) */}
      <div className="ob-marquee-container">
        <div className="ob-marquee-wrapper">
          <div className="ob-marquee-track ob-is-reverse" style={{ '--marquee-duration': '35s' }}>
            {tripled.map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                className={`ob-marquee-item ${brand.darkBg ? 'ob-dark-bg' : ''} ${hoveredItem === `${brand.id}-${i}` ? 'ob-is-hovered' : ''}`}
                onMouseEnter={() => setHoveredItem(`${brand.id}-${i}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="ob-marquee-logo-container">
                  <img src={brand.image} alt={brand.label} className="ob-marquee-logo" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA row */}
      <motion.div
        className="ob-cta-row"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link to="/key-clients" className="ob-cta-link">
          View All Our Brands &amp; Key Clients
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

export default OurBrands;
