import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, MapPin, FlaskConical, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { setIsCartOpen } = useCart();

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0.8, 1], [100, 0]);

  return (
    <footer className="footer-creative-wrapper" id="contact">
      {/* Ambient background glowing orb */}
      <div className="footer-ambient-orb" />

      {/* ── 1. The Floating Glass Island CTA ── */}
      <div className="footer-island-container">
        <motion.div 
          className="footer-cta-island"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="island-noise" />
          
          <div className="island-content">
            <div className="island-text-group">
              <span className="island-kicker">
                <FlaskConical size={14} /> Start Your Project
              </span>
              <h2 className="island-headline">Ready to equip<br/>your laboratory?</h2>
              <p className="island-desc">Custom quotes, product demos, and deep technical consultations.</p>
            </div>
            
            <div className="island-actions">
              <button onClick={() => setIsCartOpen(true)} className="island-btn-primary island-btn-primary--btn">
                <span>Request a Quote</span>
                <div className="btn-icon-circle">
                  <ArrowUpRight size={16} />
                </div>
              </button>
              <a href="tel:+918734013927" className="island-btn-secondary">
                <Phone size={16} />
                <span>Call Us Today</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 2. Structural Data Grid ── */}
      <div className="footer-data-grid">
        <motion.div 
          className="data-brand"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img src="/image.png" alt="Inventa Systems" className="footer-logo-bright" />
          <p className="data-brand-desc">
            Gujarat's premier authorized distributor of high-end analytical instruments, centrifuges, and critical laboratory plastic ware.
          </p>
        </motion.div>

        <div className="data-links-wrapper">
          <motion.div 
            className="data-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="data-col-title">Headquarters</h4>
            <div className="data-col-content">
              <a
                href="https://maps.google.com/?q=510+Anand+Mangal+3,+Near+Hira+Baug+Crossing,+Ambawadi,+Ahmedabad+380006"
                target="_blank"
                rel="noopener noreferrer"
                className="data-link-hover footer-address-link"
              >
                <MapPin size={14} className="footer-address-pin" />
                <span>510, Anand Mangal-3<br/>Near Hira Baug Crossing<br/>Ambawadi, Ahmedabad 380006</span>
              </a>
              <div className="footer-hours">
                <Clock size={13} className="footer-hours-icon" />
                <span>Mon – Sat, 11 AM – 7 PM</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="data-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="data-col-title">Contact Directory</h4>
            <div className="data-col-content">
              <a href="mailto:dharapanchal@inventasystems.in" className="data-link-hover">dharapanchal@inventasystems.in</a>
              <a href="tel:+919313840714" className="data-link-hover">+91 93138 40714</a>
              <a href="tel:+917698186968" className="data-link-hover">+91 76981 86968</a>
              <a href="tel:+918734013927" className="data-link-hover">+91 87340 13927</a>
            </div>
          </motion.div>

          <motion.div 
            className="data-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="data-col-title">Quick Links</h4>
            <div className="data-col-content">
              <Link to="/about" className="data-link-hover">About Us</Link>
              <Link to="/applications" className="data-link-hover">Applications</Link>
              <Link to="/services" className="data-link-hover">Services</Link>
              <Link to="/products" className="data-link-hover">Products</Link>
              <Link to="/careers" className="data-link-hover">Careers</Link>
              <Link to="/contact" className="data-link-hover">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 3. Massive Edge-to-Edge Typography ── */}
      <div className="footer-massive-mark-wrapper">
        <motion.h1 
          className="footer-massive-mark"
          style={{ y: yParallax }}
        >
          INVENTA
        </motion.h1>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-absolute-bottom">
        <div className="bottom-content">
          <span>© {currentYear} Inventa Systems. All Rights Reserved.</span>
          <span className="bottom-tag">A Premium Life Science Distributor</span>
        </div>
        <div className="bottom-dev-credit">
          Developed by&nbsp;
          <a href="https://techsentinals.in/" target="_blank" rel="noopener noreferrer" className="bottom-dev-link">
            Techsentinals LLP
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
