import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { Send, MessageCircle, CheckCircle2, Loader2, AlertCircle, MapPin, Clock } from 'lucide-react';
import './ContactPage.css';

function pickError(data, fallback) {
  if (data.errors && data.errors.length) return data.errors.join(' ');
  if (data.message) return data.message;
  return fallback;
}

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef(null);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setTimeout(() => {
          setName(''); setEmail(''); setSubject(''); setMessage('');
          setStatus('idle'); setErrorMsg('');
        }, 3000);
      } else {
        setStatus('error');
        setErrorMsg(pickError(data, 'Failed to send. Please try again.'));
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleWhatsApp = async () => {
    setErrorMsg('');
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in your name, email and message before sending via WhatsApp.');
      return;
    }
    try {
      const res = await fetch('/api/contact/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() }),
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
    <main className="contact-page">
      <SEO
        title="Contact Us — Lab Instruments Enquiry"
        description="Contact Inventa Systems for lab instrument enquiries, quotes, and service requests. Visit us at Sola, Ahmedabad or call +91 93138 40714. Email: inquiry@inventasystems.in."
        keywords="contact Inventa Systems, lab instrument enquiry India, laboratory supplier Ahmedabad, scientific equipment quote India"
        canonical="/contact"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Inventa Systems',
          url: 'https://www.inventasystems.in/contact',
          mainEntity: {
            '@type': 'Organization',
            name: 'Inventa Systems',
            telephone: '+91-93138-40714',
            email: 'inquiry@inventasystems.in',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '907, The Empire, Sarkhej - Gandhinagar Hwy, beside Audi Showroom, near Gujarat High court, Vishwas City 1, Sola',
              addressLocality: 'Ahmedabad',
              addressRegion: 'Gujarat',
              postalCode: '380061',
              addressCountry: 'IN',
            },
          },
        }}
      />
      <section className="contact-hero">
        <motion.h1
          className="contact-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let's Start a Conversation.
        </motion.h1>
        <motion.p
          className="contact-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Reach out to our expert team for product inquiries, maintenance contracts, or service calibration requests.
        </motion.p>
      </section>

      <section className="contact-container">
        {/* Left: Interactive Form */}
        <motion.div
          className="contact-form-side"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form ref={formRef} onSubmit={handleSubmitEmail}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text" id="name" placeholder="Dr. John Doe" required
                value={name} onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email" id="email" placeholder="john@laboratory.com" required
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text" id="subject" placeholder="Equipment Calibration Request"
                value={subject} onChange={e => setSubject(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message" rows={5} placeholder="How can we help you?" required
                value={message} onChange={e => setMessage(e.target.value)}
              />
            </div>

            {/* Error / status messages */}
            {errorMsg && (
              <div className="contact-error-msg">
                <AlertCircle size={14} /> {errorMsg}
              </div>
            )}
            {status === 'success' && (
              <div className="contact-success-msg">
                <CheckCircle2 size={14} /> Message sent! We'll respond within 24 hours.
              </div>
            )}

            {/* Action Buttons */}
            <div className="contact-actions">
              <button
                type="submit"
                className="submit-btn"
                disabled={status === 'sending' || status === 'success'}
              >
                {status === 'sending' ? (
                  <><Loader2 size={16} className="spin" /> Sending…</>
                ) : status === 'success' ? (
                  <><CheckCircle2 size={16} /> Sent Successfully!</>
                ) : (
                  <><Send size={16} /> Send via Email</>
                )}
              </button>

              <button
                type="button"
                className="whatsapp-send-btn"
                onClick={handleWhatsApp}
                disabled={status === 'sending'}
              >
                <MessageCircle size={16} />
                Send via WhatsApp
              </button>
            </div>
          </form>
        </motion.div>

        {/* Right: Bento Address & Info */}
        <motion.div
          className="contact-info-side"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="info-card">
            <a
              href="https://maps.google.com/?q=907,+The+Empire,+Sarkhej+-+Gandhinagar+Hwy,+beside+Audi+Showroom,+near+Gujarat+High+court,+Vishwas+City+1,+Sola,+Ahmedabad,+Gujarat+380061"
              target="_blank"
              rel="noopener noreferrer"
              className="info-card dark"
              style={{ flex: 1.4 }}
            >
              <span className="info-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} />
                Headquarters
              </span>
              <span className="info-value">
                907, The Empire, Sarkhej - Gandhinagar Hwy <br />
                beside Audi Showroom, near Gujarat High court <br />
                Sola, Ahmedabad, Gujarat 380061
              </span>
            </a>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div className="info-card light" style={{ flex: 1 }}>
              <span className="info-label">Email Us</span>
              <p className="info-value">
                <a href="mailto:inquiry@inventasystems.in">inquiry@inventasystems.in</a>
              </p>
            </div>

            <div className="info-card light" style={{ flex: 1 }}>
              <span className="info-label">Call Us</span>
              <p className="info-value">
                <a href="tel:+919313840714">+91 93138 40714</a><br/>
                <a href="tel:+918734013927">+91 87340 13927</a><br/>
                <a href="tel:+917698186968">+91 76981 86968</a>
              </p>
            </div>
          </div>

          <div className="info-card light">
            <span className="info-label">WhatsApp</span>
            <p className="info-value">
              <a
                href={`https://wa.me/919313840714?text=${encodeURIComponent('Hi Inventa Systems! I came across your website and would like to know more about your lab instruments and solutions.')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#25D366', fontWeight: 600 }}
              >
                Chat with us on WhatsApp →
              </a>
            </p>
          </div>

          <div className="info-card light">
            <span className="info-label">Business Hours</span>
            <div className="contact-hours-row">
              <Clock size={20} className="contact-hours-icon" />
              <p className="info-value">
                Mon – Sat <br/>
                11 AM – 7 PM
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default ContactPage;
