import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  ArrowRight, X, User, Mail, Phone, Wrench, MessageSquare,
  Send, CheckCircle2, Loader2, AlertCircle, MessageCircle
} from 'lucide-react';
import './ServicesPage.css';

function pickError(data, fallback) {
  if (data.errors && data.errors.length) return data.errors.join(' ');
  if (data.message) return data.message;
  return fallback;
}

const BookEngineerModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [equipment, setEquipment] = useState('');
  const [issue, setIssue] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const payload = () => ({
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim(),
    equipment: equipment.trim(),
    issue: issue.trim(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload()),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('idle');
        setErrorMsg(pickError(result, 'Failed to send. Please call us at +91 87340 13927.'));
      }
    } catch {
      setStatus('idle');
      setErrorMsg('Network error. Please call us at +91 87340 13927.');
    }
  };

  const handleWhatsApp = async () => {
    setErrorMsg('');
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please enter your name and phone number before sending via WhatsApp.');
      return;
    }
    try {
      const res = await fetch('/api/service/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload()),
      });
      const data = await res.json();
      if (data.success && data.url) {
        window.open(data.url, '_blank');
      } else {
        setErrorMsg(pickError(data, 'Could not open WhatsApp. Please try again.'));
      }
    } catch {
      setErrorMsg('Could not open WhatsApp. Please check your connection.');
    }
  };

  return (
    <div className="be-overlay" onClick={onClose}>
      <motion.div
        className="be-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div key="success" className="be-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <CheckCircle2 size={48} className="be-success-icon" />
              <h3>Booking Received!</h3>
              <p>Thank you, {name}. Our service team will call you within 24 hours to schedule your visit.</p>
              <button className="be-close-btn" onClick={onClose}>Close</button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="be-header">
                <div>
                  <h3 className="be-title">Book a Service Engineer</h3>
                  <p className="be-subtitle">We'll contact you within 24 hours to schedule your visit.</p>
                </div>
                <button className="be-x" onClick={onClose}><X size={20} /></button>
              </div>

              <form className="be-form" onSubmit={handleSubmit}>
                <div className="be-field">
                  <div className="be-field-icon"><User size={15} /></div>
                  <input type="text" placeholder="Your Name *" value={name} onChange={e => setName(e.target.value)} required className="be-input" />
                </div>

                <div className="be-field">
                  <div className="be-field-icon"><Phone size={15} /></div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    required
                    className="be-input"
                  />
                </div>

                <div className="be-field">
                  <div className="be-field-icon"><Mail size={15} /></div>
                  <input type="email" placeholder="Email Address (optional)" value={email} onChange={e => setEmail(e.target.value)} className="be-input" />
                </div>

                <div className="be-field">
                  <div className="be-field-icon"><Wrench size={15} /></div>
                  <input type="text" placeholder="Equipment / Instrument Name" value={equipment} onChange={e => setEquipment(e.target.value)} className="be-input" />
                </div>

                <div className="be-field be-field--textarea">
                  <div className="be-field-icon be-field-icon--top"><MessageSquare size={15} /></div>
                  <textarea
                    placeholder="Describe the issue or service required…"
                    value={issue}
                    onChange={e => setIssue(e.target.value)}
                    rows={3}
                    className="be-input be-textarea"
                  />
                </div>

                {errorMsg && (
                  <div className="be-error"><AlertCircle size={14} /> {errorMsg}</div>
                )}

                <button type="submit" className="be-submit" disabled={status === 'sending'}>
                  {status === 'sending'
                    ? <><Loader2 size={16} className="be-spinner" /> Sending…</>
                    : <><Send size={16} /> Book Engineer</>}
                </button>

                <button type="button" className="be-whatsapp" onClick={handleWhatsApp} disabled={status === 'sending'}>
                  <MessageCircle size={16} />
                  Book via WhatsApp
                </button>

                <p className="be-privacy">Or call directly: <a href="tel:+918734013927">+91 87340 13927</a></p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const ServicesPage = () => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <main className="services-page">
      <SEO
        title="Lab Equipment Services — AMC, Calibration & Training"
        description="Inventa Systems provides comprehensive laboratory services: annual maintenance contracts, calibration, on-site repair, instrument demos, user training, and backup lab facility across India."
        keywords="lab equipment service India, annual maintenance contract laboratory, instrument calibration India, lab training, equipment repair service"
        canonical="/services"
      />
      {/* Hero Section */}
      <section className="services-hero">
        <motion.span
          className="services-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Authorized Service Provider
        </motion.span>

        <motion.h1
          className="services-hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Uncompromising <br/> Technical Support.
        </motion.h1>

        <motion.p
          className="services-hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Factory-trained engineers delivering precision calibration, rigorous validation, and zero-downtime maintenance for modern laboratories.
        </motion.p>
      </section>

      {/* Modern Bento Box Grid */}
      <section className="bento-container">
        <motion.div
          className="bento-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {}
          }}
        >

          {/* 1. Large Feature Card: Installation */}
          <motion.div
            className="bento-card span-2 row-span-2"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" }}
            }}
          >
            <div className="bento-img-wrapper">
              <img src="/turnkey_lab.png" alt="Installation" className="bento-img" />
              <div className="bento-overlay" />
            </div>
            <div className="bento-content">
              <span className="bento-num">01. Service</span>
              <h2 className="bento-title">Installation &<br/> Site Visits</h2>
              <p className="bento-desc">We ensure your laboratory equipment is installed optimally. Our engineers perform rigorous unboxing, site preparation, and integration following strict factory protocols.</p>
              <ul className="bento-features">
                <li>Spatial Planning</li>
                <li>Factory Protocols</li>
                <li>Power Compliance</li>
                <li>Operational Training</li>
              </ul>
            </div>
          </motion.div>

          {/* 2. Text Only: Thermo Fisher */}
          <motion.div
            className="bento-card text-only"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" }}
            }}
          >
            <div className="bento-content">
              <span className="bento-num">Partnership</span>
              <h2 className="bento-title">Thermo Fisher Scientific</h2>
              <p className="bento-desc" style={{ color: '#aaa' }}>Official authorized service provider. We carry genuine parts and factory certifications.</p>
            </div>
          </motion.div>

          {/* 3. Small Feature Card: Calibration */}
          <motion.div
            className="bento-card"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" }}
            }}
          >
            <div className="bento-img-wrapper">
              <img src="/centrifuge_lab.png" alt="Calibration" className="bento-img" />
              <div className="bento-overlay" />
            </div>
            <div className="bento-content">
              <span className="bento-num">02. Validation</span>
              <h2 className="bento-title">Calibration</h2>
              <ul className="bento-features">
                <li>IQ & OQ Protocols</li>
                <li>IPV Verification</li>
              </ul>
            </div>
          </motion.div>

          {/* 4. Wide Feature Card: Maintenance */}
          <motion.div
            className="bento-card span-2"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" }}
            }}
          >
            <div className="bento-img-wrapper">
              <img src="/lab_solutions.png" alt="Maintenance" className="bento-img" />
              <div className="bento-overlay" />
            </div>
            <div className="bento-content">
              <span className="bento-num">03. Support</span>
              <h2 className="bento-title">AMC / CMC Contracts</h2>
              <p className="bento-desc">Minimize downtime with tiered maintenance. We keep extensive genuine spare parts ready for rapid response.</p>
              <ul className="bento-features">
                <li>Preventive Maintenance</li>
                <li>Priority Support</li>
                <li>Genuine Spares</li>
              </ul>
            </div>
          </motion.div>

          {/* 5. Text Only: Book Engineer CTA */}
          <motion.div
            className="bento-card text-only"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" }}
            }}
          >
            <div className="bento-content">
              <h2 className="bento-title" style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Need Support?</h2>
              <p className="bento-desc" style={{ color: '#aaa', marginBottom: '24px' }}>Our technical team is ready to assist you.</p>
              <button className="bento-cta" onClick={() => setShowBooking(true)}>
                Book Engineer <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

        </motion.div>
      </section>

      <AnimatePresence>
        {showBooking && <BookEngineerModal onClose={() => setShowBooking(false)} />}
      </AnimatePresence>
    </main>
  );
};

export default ServicesPage;
