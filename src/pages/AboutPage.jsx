import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './AboutPage.css';
import SEO from '../components/SEO';

// Reusing the smooth counter hook for the stats
const useCounter = (target, duration = 2000, inView = false) => {
  const [count, setCount] = useState(0);
  const isNumber = !isNaN(parseFloat(target));

  useEffect(() => {
    if (!inView || !isNumber) return;
    const end = parseFloat(target);
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return isNumber ? count : target;
};

const StatBox = ({ value, label, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const animatedValue = useCounter(value, 2000, inView);

  return (
    <motion.div 
      ref={ref}
      className="stat-item"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <span className="stat-number">
        {typeof value === 'number' ? animatedValue : value}{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
};

const AboutPage = () => {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <main className="about-page">
      <SEO
        title="About Inventa Systems"
        description="Learn about Inventa Systems — India's trusted partner for advanced scientific instruments, laboratory reagents, and complete turnkey laboratory solutions based in Ahmedabad, Gujarat."
        keywords="about Inventa Systems, lab instruments supplier India, scientific instruments Ahmedabad, laboratory solutions Gujarat"
        canonical="/about"
      />
      {/* Hero */}
      <section className="about-hero">
        <motion.div 
          className="about-kicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="kicker-line" />
          Our Vision
        </motion.div>
        
        <motion.h1 
          className="about-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          To empower scientific discovery <span className="about-gradient-word">&amp; transform diagnostics</span>.
        </motion.h1>
        
        <motion.p 
          className="about-vision"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          By providing innovative technologies, advanced laboratory instruments, and high-quality solutions that accelerate research, improve patient care, and drive excellence in healthcare and biotechnology.
        </motion.p>
      </section>

      {/* Stats with Parallax Image */}
      <section className="about-statsing" ref={imgRef}>
        <motion.img 
          style={{ y: yParallax }}
          src="/life_sciences.png"
          alt="Inventa Facilities"
          className="about-huge-img"
        />
        <div className="about-stats-grid">
          <StatBox value={2017} label="Established" />
          <StatBox value={15} suffix="K" label="Sq. Ft. Warehouse" />
          <StatBox value="#1" label="In Gujarat" />
        </div>
      </section>

      {/* Content Grid */}
      <section className="about-content-grid">
        <motion.div 
          className="content-block"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h2>Who We Are</h2>
          <p>
            With over 9 years of expertise in life sciences, we are one of India's leading suppliers of laboratory instruments, advanced technologies, consumables, chemicals, and plasticware.
          </p>
          <p>
            We empower research and diagnostics in molecular biology, cell culture, genomics, proteomics, and immunology with innovative, high-quality solutions from trusted global brands.
          </p>
        </motion.div>

        <motion.div 
          className="content-block"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2>Delivering Solutions</h2>
          <p>
            Today, Inventa Systems is a trusted leader in life science solutions, delivering world-class products and technologies through partnerships with leading manufacturers in the USA and Europe.
          </p>
          <ul className="delivering-solutions-list" style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>Authorized Distributor of globally recognized life science brands.</li>
            <li style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>Comprehensive Portfolio of laboratory instruments, liquid handling systems, centrifuge ware, cryogenic labware, consumables, and advanced technologies.</li>
            <li style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>Serving research, biotechnology, pharmaceutical, healthcare, and academic laboratories across India.</li>
            <li style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>Committed to innovation, quality, reliability, and exceptional customer support.</li>
          </ul>
          <div className="about-tagline" style={{ marginTop: '30px', fontWeight: 600, borderLeft: '3px solid var(--accent)', paddingLeft: '15px', color: 'var(--text-primary)' }}>
            Inventa Systems stands for Innovation • Quality • Togetherness • Service.
          </div>
        </motion.div>
      </section>

      {/* New Partner With Us Section */}
      <section className="about-partner-section" style={{ padding: '0 5% 15vh 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          className="about-partner-card"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>Partner with us for complete laboratory solutions.</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', paddingLeft: '20px', marginBottom: '30px', listStyleType: 'square', color: 'var(--text-secondary)' }}>
            <li>Customized Quotations</li>
            <li>Live Product Demonstrations</li>
            <li>Expert Technical Consultation</li>
            <li>Application &amp; Product Support</li>
            <li>End-to-End Laboratory Solutions</li>
          </ul>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Contact us today to discover the right technologies, instruments, and consumables for your laboratory.
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage;
