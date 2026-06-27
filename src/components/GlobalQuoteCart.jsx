import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Send, User, Phone, Building2, CheckCircle2, Loader2, AlertCircle, ShoppingCart, Box, Minus, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './GlobalQuoteCart.css';

const GlobalQuoteCart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, isCartOpen, setIsCartOpen } = useCart();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setBackToTopVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Form states
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const totalItems = cart.length;
  const totalUnits = cart.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    if (totalItems > 0 && !isCartOpen) {
      setIsCollapsed(false);
      const timer = setTimeout(() => {
        setIsCollapsed(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [totalItems, isCartOpen]);

  if (totalItems === 0 && !isCartOpen && !showSubmitModal) {
    return null;
  }

  const handleWhatsAppSend = async () => {
    setErrorMsg('');
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please enter your name and phone number before sending via WhatsApp.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid phone number (min 10 digits).');
      return;
    }
    try {
      const res = await fetch('/api/quote/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          company: company.trim(),
          cart: cart.map(item => ({ name: item.name, quantity: item.quantity })),
        }),
      });
      const data = await res.json();
      if (data.success && data.url) {
        window.open(data.url, '_blank');
      } else {
        setErrorMsg(data.errors ? data.errors[0] : (data.message || 'Could not open WhatsApp. Please try again.'));
      }
    } catch {
      setErrorMsg('Could not open WhatsApp. Please check your connection.');
    }
  };

  const handleSubmitQuoteRequest = async (e) => {
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
        setTimeout(() => {
          clearCart();
          setShowSubmitModal(false);
          setIsCartOpen(false);
          setStatus('idle');
          setName(''); setCompany(''); setPhone('');
        }, 2500);
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
    <>
      {/* Floating Action Button */}
      {!isCartOpen && !showSubmitModal && totalItems > 0 && (
        <button
          className={`gqc-fab${isCollapsed ? '' : ' gqc-fab--expanded'}${backToTopVisible ? ' gqc-fab--raised' : ''}`}
          onClick={() => setIsCartOpen(true)}
          onMouseEnter={() => setIsCollapsed(false)}
          onMouseLeave={() => setIsCollapsed(true)}
        >
          <ShoppingCart size={20} />
          <span className="gqc-fab-text">View Quote</span>
          <span className="gqc-fab-badge">{totalUnits}</span>
        </button>
      )}

      {/* Side Cart Panel */}
      <AnimatePresence>
        {isCartOpen && !showSubmitModal && (
          <div className="gqc-panel-overlay" onClick={() => setIsCartOpen(false)}>
            <motion.div 
              className="gqc-panel"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="gqc-panel-header">
                <div className="gqc-panel-title">
                  <ShoppingCart size={20} />
                  <span>Quote Request</span>
                  <span className="gqc-badge">{totalUnits}</span>
                </div>
                <button className="gqc-panel-close" onClick={() => setIsCartOpen(false)}><X size={20} /></button>
              </div>

              {totalItems === 0 ? (
                <div className="gqc-panel-empty">
                  <ShoppingCart size={40} opacity={0.2} />
                  <p>No items added yet.</p>
                  <span>Browse our catalogue and click "Add to Quote".</span>
                </div>
              ) : (
                <>
                  <div className="gqc-panel-items">
                    {cart.map((item, idx) => (
                      <div key={idx} className="gqc-item">
                        <div className="gqc-item-icon"><Box size={16} /></div>
                        <div className="gqc-item-info">
                          <span className="gqc-item-name">{item.name}</span>
                          <span className="gqc-item-cat">{item.category}</span>
                        </div>
                        <div className="gqc-item-qty">
                          <button onClick={() => updateQuantity(item.name, -1)}><Minus size={12} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.name, 1)}><Plus size={12} /></button>
                        </div>
                        <button className="gqc-item-remove" onClick={() => removeFromCart(item.name)}><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                  <div className="gqc-panel-footer">
                    <div className="gqc-summary">
                      <span>{totalItems} item{totalItems > 1 ? 's' : ''}</span>
                      <span>{totalUnits} unit{totalUnits > 1 ? 's' : ''} total</span>
                    </div>
                    <button className="gqc-submit-btn" onClick={() => setShowSubmitModal(true)}>
                      <Send size={16} />
                      Proceed to Request
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Submit Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="gqc-modal-overlay" onClick={() => setShowSubmitModal(false)}>
            <motion.div
              className="gqc-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {status === 'success' ? (
                <motion.div className="gqc-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <CheckCircle2 size={48} className="gqc-success-icon" />
                  <h3>Quote Submitted!</h3>
                  <p>Thank you, {name}. Our team will contact you within 24 hours with pricing and availability.</p>
                </motion.div>
              ) : (
                <motion.div className="gqc-modal-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="gqc-modal-header">
                    <div>
                      <h3 className="gqc-modal-title">Submit Quote Request</h3>
                      <p className="gqc-modal-subtitle">
                        {totalItems} item{totalItems > 1 ? 's' : ''} · {totalUnits} unit{totalUnits > 1 ? 's' : ''} total
                      </p>
                    </div>
                    <button className="gqc-modal-close" onClick={() => setShowSubmitModal(false)}><X size={20} /></button>
                  </div>

                  <div className="gqc-modal-summary">
                    {cart.map((item, idx) => (
                      <div key={idx} className="gqc-summary-row">
                        <span className="gqc-summary-name">{item.name}</span>
                        <span className="gqc-summary-cat">[{item.type}]</span>
                        <span className="gqc-summary-qty">×{item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <form className="gqc-form" onSubmit={handleSubmitQuoteRequest}>
                    <p className="gqc-form-label">Your Contact Details</p>

                    <div className="gqc-field">
                      <div className="gqc-field-icon"><User size={16} /></div>
                      <input type="text" placeholder="Your Name *" value={name} onChange={e => setName(e.target.value)} required />
                    </div>

                    <div className="gqc-field">
                      <div className="gqc-field-icon"><Building2 size={16} /></div>
                      <input type="text" placeholder="Company / Organization (optional)" value={company} onChange={e => setCompany(e.target.value)} />
                    </div>

                    <div className="gqc-field">
                      <div className="gqc-field-icon"><Phone size={16} /></div>
                      <input type="tel" placeholder="Phone Number *" value={phone} onChange={e => {
                        const val = e.target.value.replace(/\D/g, '');
                        setPhone(val);
                      }} required />
                    </div>

                    {errorMsg && (
                      <div className="gqc-error">
                        <AlertCircle size={14} /> {errorMsg}
                      </div>
                    )}

                    <button type="submit" className="gqc-final-submit" disabled={status === 'sending'}>
                      {status === 'sending' ? (
                        <><Loader2 size={16} className="gqc-spinner" /> Sending...</>
                      ) : (
                        <><Send size={16} /> Submit Quote Request</>
                      )}
                    </button>

                    <div className="gqc-divider"><span>or</span></div>

                    <button type="button" className="gqc-whatsapp-btn" onClick={handleWhatsAppSend}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Send via WhatsApp
                    </button>

                    <p className="gqc-privacy">Your details are only used to respond to your quote request.</p>
                  </form>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalQuoteCart;
