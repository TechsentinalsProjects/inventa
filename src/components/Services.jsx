import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Services.css';


const servicesData = [
  {
    num: "01",
    title: "Installation & Breakdown Support",
    desc: "Precision installation and rapid breakdown troubleshooting. We provide continuous training support to ensure every instrument functions correctly and your staff is fully equipped.",
    img: "/turnkey_lab.png"
  },
  {
    num: "02",
    title: "Maintenance & Calibration",
    desc: "Preventive maintenance and specialized calibration support. Our In-house Calibration Center is fully equipped to calibrate mechanical instruments, centrifuges, and microscopes.",
    img: "/centrifuge_lab.png"
  },
  {
    num: "03",
    title: "Training & Backup Facility",
    desc: "A dedicated Training Centre and Backup Molecular Laboratory available for continuous staff and client training, ensuring optimal use of our supplied equipment.",
    img: "/training_centre.png"
  }
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="services-accordion-wrapper" id="services">
      <div className="services-header">
        <motion.span 
          className="services-kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker-line" />
          Authorized Service Provider
        </motion.span>
        <motion.h2 
          className="services-headline"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Expert equipment services for your laboratory.
        </motion.h2>
        <motion.div 
          className="services-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p style={{ marginBottom: '1.5rem', opacity: 0.7 }}>Our dedicated Service Division operates as an independent profit center. We believe that excellent service is key to long-term partnerships — from preventive maintenance to our in-house calibration and training centers.</p>
          <Link to="/services" className="services-explore-btn">
            <span>Explore All Services</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      <div className="accordion-container">
        {servicesData.map((service, index) => {
          const isActive = activeIndex === index;
          
          return (
            <motion.div
              key={service.num}
              className={`accordion-panel ${isActive ? 'active' : ''}`}
              onHoverStart={() => {
                if (window.matchMedia("(min-width: 1025px)").matches) {
                  setActiveIndex(index);
                }
              }}
              onClick={() => setActiveIndex(index)}
              layout={!isMobile}
              initial={{ borderRadius: 32 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Full bleed background image */}
              <div className="accordion-bg">
                <motion.div
                  className="accordion-bg-overlay"
                  animate={{ opacity: isActive ? 0.25 : 1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.img 
                  src={service.img} 
                  alt={service.title} 
                  animate={{ 
                    scale: isActive ? 1 : 1.05
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              {/* Compressed state (vertical text) */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div 
                    className="accordion-compressed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="compressed-num">{service.num}</span>
                    <h3 className="compressed-title">{service.title}</h3>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expanded state (full details) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    className="accordion-expanded"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  >
                    <div className="expanded-header">
                      <span className="expanded-num">{service.num}</span>
                      <div className="expanded-icon">
                        <ArrowRight size={24} />
                      </div>
                    </div>
                    <div className="expanded-text-block">
                      <h2 className="expanded-title">{service.title}</h2>
                      <p className="expanded-desc">{service.desc}</p>
                      <Link to="/services" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid currentColor', paddingBottom: '4px', display: 'inline-block', marginTop: '16px', fontWeight: 600 }}>Learn More</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
