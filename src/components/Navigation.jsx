import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, Menu, X,
  FlaskConical, Microscope, UtensilsCrossed, Pill, Fingerprint,
  Wrench, Settings, ClipboardCheck, Syringe, Eye, Box,
  TestTube, Scale, HeartPulse, CheckCircle2, Droplets, Bug,
  ShieldCheck, Dna, Leaf, Monitor
} from 'lucide-react';
import './Navigation.css';
import { applicationsData } from '../data/applicationsData';
import { productsData } from '../data/productsData';

const navData = [
  { title: 'About Us', href: '/about', hasDropdown: false },
  {
    title: 'Applications',
    href: '/applications',
    hasDropdown: true,
    items: applicationsData.map(app => ({
      id: app.id,
      title: app.title,
      description: app.overview,
      icon: app.icon,
      image: app.image,
      href: `/applications/${app.id}`
    }))
  },
  {
    title: 'Products',
    href: '/products',
    hasDropdown: true,
    items: productsData.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.overview,
      icon: prod.icon,
      image: prod.image,
      href: `/products/${prod.id}`
    }))
  },
  {
    title: 'Services',
    href: '/services',
    hasDropdown: true,
    items: [
      {
        id: 's1',
        title: 'Installation & Site Visits',
        description: 'Precision setup of PCR, RT-PCR, Centrifuges, Microscopes, and more.',
        icon: Wrench,
        image: '/turnkey_lab.png',
        href: '/services'
      },
      {
        id: 's2',
        title: 'Calibration & Validation',
        description: 'Authorized IQ/OQ/IPV protocols for Thermo Fisher equipment.',
        icon: ClipboardCheck,
        image: '/centrifuge_lab.png',
        href: '/services'
      },
      {
        id: 's3',
        title: 'AMC/CMC & Spare Parts',
        description: 'Comprehensive maintenance contracts with genuine spare parts.',
        icon: Settings,
        image: '/lab_solutions.png',
        href: '/services'
      }
    ]
  },
  { title: 'Clients & Brands', href: '/key-clients', hasDropdown: false },
  { title: 'Careers', href: '/careers', hasDropdown: false },
  { title: 'Contact Us', href: '/contact', hasDropdown: false }
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const closeDropdownTimer = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setActiveMenuIndex(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      // Prevent rubber-banding glitches on mobile from looping the menu visibility
      if (currentScrollY <= 0) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // Only show if scrolled up by at least 5px to prevent micro-jitters
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (index) => {
    if (navData[index].hasDropdown) {
      if (closeDropdownTimer.current) clearTimeout(closeDropdownTimer.current);
      setActiveMenuIndex(index);
      if (!hoveredSubItem || !navData[index].items.find(i => i.id === hoveredSubItem?.id)) {
        setHoveredSubItem(navData[index].items[0]);
      }
    } else {
      setActiveMenuIndex(null);
    }
  };

  const handleMouseLeave = () => {
    closeDropdownTimer.current = setTimeout(() => {
      setActiveMenuIndex(null);
    }, 200);
  };

  const handleSubItemHover = (item) => {
    setHoveredSubItem(item);
  };

  return (
    <>
      <header className={`nav-header ${isScrolled ? 'is-pill' : 'is-normal'} ${isHidden ? 'is-hidden' : ''}`}>
        <div className="nav-bar-container" onMouseLeave={handleMouseLeave}>

          {/* Logo */}
          <Link to="/" className="nav-logo">
            <img
              src="/image.png"
              alt="Inventa Systems Logo"
              style={{ maxHeight: '44px', width: 'auto' }}
            />
          </Link>

          {/* Links cluster */}
          <nav className="nav-links">
            {navData.map((link, index) => (
              <div
                key={link.title}
                className="nav-link-wrapper"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <Link
                  to={link.href}
                  className={`nav-link ${activeMenuIndex === index ? 'active' : ''}`}
                >
                  {link.title}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="nav-actions">
            <Link to="/contact" className="cta-btn">Request Quote</Link>
            <button className="mobile-trigger" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>

          {/* Mega Menu */}
          <AnimatePresence>
            {activeMenuIndex !== null && navData[activeMenuIndex].hasDropdown && (
              <motion.div
                className="dynamic-mega-menu"
                initial={{ opacity: 0, y: 10, scale: 0.98, x: '-50%' }}
                animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                exit={{ opacity: 0, y: 5, scale: 0.98, x: '-50%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => { if (closeDropdownTimer.current) clearTimeout(closeDropdownTimer.current); }}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mega-menu-inner">
                  {/* LEFT: Links */}
                  <div className="mega-left-pane">
                    <h4 className="mega-pane-title">Explore {navData[activeMenuIndex].title}</h4>
                    <div className="mega-sub-links">
                      {navData[activeMenuIndex].items.map((item) => {
                        const Icon = item.icon;
                        const isActive = hoveredSubItem?.id === item.id;
                        return (
                          <Link
                            key={item.id}
                            to={item.href || navData[activeMenuIndex].href}
                            className={`mega-sub-item ${isActive ? 'active' : ''}`}
                            onMouseEnter={() => handleSubItemHover(item)}
                            onClick={() => setActiveMenuIndex(null)}
                          >
                            <div className="sub-item-text">
                              <span className="sub-title">{item.title}</span>
                              <p className="sub-desc">{item.description}</p>
                            </div>
                            <motion.div
                              className="sub-arrow"
                              initial={false}
                              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ArrowRight size={16} />
                            </motion.div>
                          </Link>
                        );
                      })}
                    </div>
                    <Link
                      to={navData[activeMenuIndex].href}
                      className="mega-explore-more"
                      onClick={() => setActiveMenuIndex(null)}
                    >
                      <span>Explore All {navData[activeMenuIndex].title}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* RIGHT: Dynamic image crossfade */}
                  <div className="mega-right-pane">
                    <div className="mega-image-container">
                      <AnimatePresence mode="popLayout">
                        <motion.img
                          key={hoveredSubItem?.id}
                          src={hoveredSubItem?.image}
                          alt={hoveredSubItem?.title}
                          className="mega-photo"
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        />
                      </AnimatePresence>
                      <div className="image-overlay" />
                      <motion.div
                        key={`${hoveredSubItem?.id}-tag`}
                        className="image-caption"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        Featured: {hoveredSubItem?.title}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Dim overlay */}
      <AnimatePresence>
        {activeMenuIndex !== null && (
          <motion.div
            className="global-dim-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-full-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="mobile-header">
              <img
                src="/image.png"
                alt="Inventa Systems Logo"
                style={{ maxHeight: '40px' }}
              />
              <button className="mobile-close" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <div className="mobile-links-container">
              {navData.map((link, i) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    to={link.href}
                    className="mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
