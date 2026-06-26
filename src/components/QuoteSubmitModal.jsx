import React, { useState } from 'react';
import { X, Send, User, Phone, Building2, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './QuoteSubmitModal.css';

const QuoteSubmitModal = ({ cart, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const totalUnits = cart.reduce((s, i) => s + i.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please fill in your name and phone number.');
      return;
    }

    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid phone number (min 10 digits).');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          company: company.trim(),
          cart: cart.map(item => ({ name: item.name, quantity: item.quantity })),
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setTimeout(() => onSuccess?.(), 2500);
      } else {
        setErrorMsg(result.errors ? result.errors.join(' ') : (result.message || 'Failed to submit. Please try again.'));
        setStatus('idle');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('idle');
    }
  };

  return (
    <div className="qsm-overlay" onClick={onClose}>
      <motion.div
        className="qsm-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              className="qsm-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="qsm-success-icon">
                <CheckCircle2 size={48} />
              </div>
              <h3>Quote Submitted!</h3>
              <p>Thank you, {name}. Our team will contact you within 24 hours with pricing and availability.</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="qsm-header">
                <div>
                  <h3 className="qsm-title">Submit Quote Request</h3>
                  <p className="qsm-subtitle">
                    {cart.length} product{cart.length > 1 ? 's' : ''} · {totalUnits} unit{totalUnits > 1 ? 's' : ''} total
                  </p>
                </div>
                <button className="qsm-close" onClick={onClose}><X size={20} /></button>
              </div>

              <div className="qsm-items-summary">
                {cart.map((item, idx) => (
                  <div key={idx} className="qsm-item-row">
                    <span className="qsm-item-name">{item.name}</span>
                    <span className="qsm-item-cat">{item.category}</span>
                    <span className="qsm-item-qty">×{item.quantity}</span>
                  </div>
                ))}
              </div>

              <form className="qsm-form" onSubmit={handleSubmit}>
                <p className="qsm-form-label">Your Contact Details</p>

                <div className="qsm-field">
                  <div className="qsm-field-icon"><User size={16} /></div>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="qsm-field">
                  <div className="qsm-field-icon"><Building2 size={16} /></div>
                  <input
                    type="text"
                    placeholder="Company / Organization (optional)"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                  />
                </div>

                <div className="qsm-field">
                  <div className="qsm-field-icon"><Phone size={16} /></div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>

                {errorMsg && (
                  <div className="qsm-error">
                    <AlertCircle size={14} />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="qsm-submit-btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <><Loader2 size={16} className="qsm-spinner" /> Sending...</>
                  ) : (
                    <><Send size={16} /> Submit Quote Request</>
                  )}
                </button>

                <p className="qsm-privacy">
                  Your details are only used to respond to your quote request.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default QuoteSubmitModal;
