import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  ArrowRight, ArrowLeft, X,
  CheckCircle2, Box, ShoppingCart, Trash2, Plus, Minus, Send, Phone, User, Mail, MessageSquare,
  Loader2, AlertCircle, MessageCircle
} from 'lucide-react';
import { applicationsData } from '../data/applicationsData';
import { useCart } from '../context/CartContext';
import './ApplicationDetailPage.css';


/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
const ApplicationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const app = applicationsData.find(a => a.id === id);
  const { cart, addToCart, isCartOpen, setIsCartOpen } = useCart();

  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [addedItem, setAddedItem] = useState(null);
  const [askName, setAskName] = useState('');
  const [askEmail, setAskEmail] = useState('');
  const [askMessage, setAskMessage] = useState('');
  const [askStatus, setAskStatus] = useState('idle');
  const [askError, setAskError] = useState('');

  useEffect(() => {
    if (!app) navigate('/applications', { replace: true });
  }, [app, navigate]);

  useEffect(() => {
    const anyOverlay = selectedWorkflow || isCartOpen;
    document.body.style.overflow = anyOverlay ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedWorkflow, isCartOpen]);

  useEffect(() => {
    if (selectedWorkflow) { setAskName(''); setAskEmail(''); setAskMessage(''); setAskStatus('idle'); setAskError(''); }
  }, [selectedWorkflow]);

  const askPayload = () => ({
    name: askName.trim(),
    email: askEmail.trim(),
    context: `${selectedWorkflow.title} (${selectedWorkflow.appCategory})`,
    message: askMessage.trim(),
  });

  const handleAskSubmit = async (e) => {
    e.preventDefault();
    setAskStatus('sending');
    setAskError('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(askPayload()),
      });
      const result = await res.json();
      if (result.success) {
        setAskStatus('success');
        setTimeout(() => { setAskStatus('idle'); setAskName(''); setAskEmail(''); setAskMessage(''); setAskError(''); }, 3000);
      } else {
        setAskStatus('idle');
        setAskError(result.errors ? result.errors.join(' ') : (result.message || 'Failed to send. Please try again.'));
      }
    } catch {
      setAskStatus('idle');
      setAskError('Network error. Please try again.');
    }
  };

  const handleAskWhatsApp = async () => {
    setAskError('');
    if (!askName.trim() || !askEmail.trim()) {
      setAskError('Please enter your name and email before sending via WhatsApp.');
      return;
    }
    try {
      const res = await fetch('/api/enquiry/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(askPayload()),
      });
      const data = await res.json();
      if (data.success && data.url) {
        window.open(data.url, '_blank');
      } else {
        setAskError(data.errors ? data.errors.join(' ') : (data.message || 'Could not open WhatsApp. Please try again.'));
      }
    } catch {
      setAskError('Could not open WhatsApp. Please check your connection.');
    }
  };

  if (!app) return null;

  const AppIcon = app.icon;

  const handleQuantityChange = (product, delta) => {
    setQuantities(prev => ({ ...prev, [product]: Math.max(1, (prev[product] || 1) + delta) }));
  };

  const handleAddToQuote = (product, category, description) => {
    const qty = quantities[product] || 1;
    addToCart({ name: product, category, quantity: qty, type: 'Product', description });
    setQuantities(prev => ({ ...prev, [product]: 1 }));
    setAddedItem(product);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const appDesc = app.overview
    ? app.overview.slice(0, 155) + (app.overview.length > 155 ? '…' : '')
    : `Inventa Systems provides instruments and reagents for ${app.title}. Explore workflows, products, and get expert guidance.`;

  const appSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.inventasystems.in/' },
          { '@type': 'ListItem', position: 2, name: 'Applications', item: 'https://www.inventasystems.in/applications' },
          { '@type': 'ListItem', position: 3, name: app.title, item: `https://www.inventasystems.in/applications/${id}` },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: `${app.title} — Inventa Systems`,
        description: app.overview,
        url: `https://www.inventasystems.in/applications/${id}`,
        provider: { '@id': 'https://www.inventasystems.in/#organization' },
      },
    ],
  };

  return (
    <main className="adp-page">
      <SEO
        title={`${app.title} | Laboratory Solutions India`}
        description={appDesc}
        keywords={`${app.title}, ${app.shortTitle || ''}, laboratory solutions India, lab instruments ${app.shortTitle || app.title}, Inventa Systems`}
        canonical={`/applications/${id}`}
        structuredData={appSchema}
      />

      {/* ── Hero Banner ── */}
      <div className="adp-hero">
        <img src={app.image} alt={app.title} className="adp-hero-bg" />
        <div className="adp-hero-overlay" />
        <div className="adp-hero-color-wash" style={{ background: app.color }} />
        <div className="adp-hero-inner">
          <div className="adp-breadcrumb">
            <Link to="/applications" className="adp-back-btn">
              <ArrowLeft size={14} />
              All Applications
            </Link>
            <span className="adp-breadcrumb-sep">/</span>
            <span className="adp-breadcrumb-current" style={{ color: '#fff', opacity: 0.85 }}>
              <AppIcon size={13} />
              {app.shortTitle}
            </span>
          </div>
          <h1>{app.title}</h1>
          <p>{app.overview}</p>
        </div>
      </div>

      {/* ── Techniques Grid ── */}
      <section className="adp-techniques-section">
        <div className="adp-techniques-inner">
          <div className="adp-section-label">
            <span className="adp-label-kicker" style={{ color: app.color }}>Techniques & Workflows</span>
            <h2>Explore our {app.shortTitle} solutions</h2>
          </div>
          <div className="adp-workflow-grid">
            {app.workflows.map((wf, idx) => {
              const WfIcon = wf.icon;
              return (
                <div key={idx} className="adp-workflow-card">
                  <div className="adp-wf-img">
                    <img src={wf.image} alt={wf.title} />
                  </div>
                  <div className="adp-wf-body">
                    <div className="adp-wf-title-row">
                      <span className="adp-wf-icon" style={{ color: app.color, background: `${app.color}15` }}>
                        <WfIcon size={18} />
                      </span>
                      <h3>{wf.title}</h3>
                    </div>
                    <p className="adp-wf-desc">{wf.description}</p>
                    <button
                      className="adp-wf-view-btn"
                      style={{ '--btn-color': app.color }}
                      onClick={() => setSelectedWorkflow({ ...wf, appColor: app.color, appCategory: app.title })}
                    >
                      View Detail <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Support CTA ── */}
      <section className="adp-support-section">
        <div className="adp-support-inner">
          <div className="adp-support-card" style={{ borderColor: `${app.color}25` }}>
            <div className="adp-support-text">
              <h3>Need expert guidance?</h3>
              <p>Speak with an applications specialist about your specific requirements and workflow challenges.</p>
            </div>
            <div className="adp-support-actions">
              <Link to="/contact" className="adp-support-btn-primary" style={{ background: app.color }}>
                Contact a Specialist
              </Link>
              <Link to="/applications" className="adp-support-btn-outline" style={{ color: app.color, borderColor: `${app.color}40` }}>
                All Applications <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflow Detail Modal ── */}
      {selectedWorkflow && (
        <div className="adp-modal-overlay" onClick={() => setSelectedWorkflow(null)}>
          <div className="adp-modal-content" style={{ '--modal-accent': selectedWorkflow.appColor }} onClick={e => e.stopPropagation()}>

            <div className="adp-modal-header">
              <div className="adp-modal-header-titles">
                <span className="adp-modal-kicker" style={{ color: selectedWorkflow.appColor }}>{selectedWorkflow.appCategory}</span>
                <h2>{selectedWorkflow.title}</h2>
              </div>
              <button className="adp-modal-close" onClick={() => setSelectedWorkflow(null)}><X size={24} /></button>
            </div>

            <div className="adp-modal-body">
              <div className="adp-modal-left">
                <img src={selectedWorkflow.image} alt={selectedWorkflow.title} className="adp-modal-main-img" />
                <div className="adp-modal-section">
                  <h3>Application Overview</h3>
                  <p className="adp-extended-desc">{selectedWorkflow.extendedDescription}</p>
                </div>
                <div className="adp-modal-section">
                  <h3>System Specifications</h3>
                  <ul className="adp-feature-list">
                    {selectedWorkflow.keyFeatures.map((f, i) => (
                      <li key={i}><CheckCircle2 size={18} color={selectedWorkflow.appColor} /><span>{f}</span></li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── Quote Builder Sidebar ── */}
              <div className="adp-modal-right">
                <div className="adp-sticky-sidebar">
                  <div className="adp-quote-builder-box" style={{ borderColor: `${selectedWorkflow.appColor}30` }}>
                    <div className="adp-qbb-header" style={{ background: `${selectedWorkflow.appColor}12` }}>
                      <ShoppingCart size={18} style={{ color: selectedWorkflow.appColor }} />
                      <h4>Build Your Quote</h4>
                    </div>
                    <p className="adp-qbb-desc">Select products and quantities to build your quote request.</p>

                    <div className="adp-qbb-products">
                      {selectedWorkflow.relatedProducts.map((product, idx) => {
                        const qty = quantities[product] || 1;
                        const isAdded = addedItem === product;
                        const inCart = cart.some(i => i.name === product);
                        return (
                          <div key={idx} className={`adp-qbb-product-row ${inCart ? 'in-cart' : ''}`}>

                            {/* Product identity */}
                            <div className="adp-qbb-product-info">
                              <div className="adp-qbb-product-icon" style={{ background: `${selectedWorkflow.appColor}15`, color: selectedWorkflow.appColor }}>
                                <Box size={16} />
                              </div>
                              <div className="adp-qbb-product-text">
                                <span className="adp-qbb-product-name">{product}</span>
                                {inCart ? <span className="adp-qbb-in-cart-tag">In Quote</span> : <span className="adp-qbb-unit-tag">Unit</span>}
                              </div>
                            </div>

                            {/* Qty + Add to Quote */}
                            <div className="adp-qbb-product-actions">
                              <div className="adp-qbb-qty-stepper">
                                <button onClick={() => handleQuantityChange(product, -1)}><Minus size={12} /></button>
                                <span>{qty}</span>
                                <button onClick={() => handleQuantityChange(product, 1)}><Plus size={12} /></button>
                              </div>
                              <button
                                className={`adp-qbb-add-btn ${isAdded ? 'added' : ''}`}
                                style={{ background: isAdded ? '#10B981' : selectedWorkflow.appColor }}
                                onClick={() => handleAddToQuote(product, selectedWorkflow.appCategory, `Requested from Application: ${selectedWorkflow.title}`)}
                              >
                                {isAdded ? <><CheckCircle2 size={14} /> Added!</> : <>Add to Quote</>}
                              </button>
                            </div>

                          </div>
                        );
                      })}
                    </div>

                    {cart.length > 0 && (
                      <button
                        className="adp-qbb-view-quote-btn"
                        onClick={() => { setSelectedWorkflow(null); setIsCartOpen(true); }}
                        style={{ borderColor: selectedWorkflow.appColor, color: selectedWorkflow.appColor }}
                      >
                        <ShoppingCart size={15} />
                        View Quote Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
                      </button>
                    )}
                  </div>

                  {/* Ask About This Application — 3-field form */}
                  <form className="adp-ask-block" style={{ borderColor: `${selectedWorkflow.appColor}30` }} onSubmit={handleAskSubmit}>
                    <span className="adp-ask-label" style={{ color: selectedWorkflow.appColor }}>
                      Ask About This Application
                    </span>

                    {askStatus === 'success' ? (
                      <div className="adp-ask-success">
                        <CheckCircle2 size={18} style={{ color: selectedWorkflow.appColor }} />
                        <span>Enquiry sent! We'll get back to you soon.</span>
                      </div>
                    ) : (
                      <>
                        <div className="adp-ask-field">
                          <div className="adp-ask-field-icon"><User size={13} /></div>
                          <input
                            className="adp-ask-input-field"
                            type="text"
                            placeholder="Your Name *"
                            value={askName}
                            onChange={e => setAskName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="adp-ask-field">
                          <div className="adp-ask-field-icon"><Mail size={13} /></div>
                          <input
                            className="adp-ask-input-field"
                            type="email"
                            placeholder="Email Address *"
                            value={askEmail}
                            onChange={e => setAskEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div className="adp-ask-field adp-ask-field--textarea">
                          <div className="adp-ask-field-icon adp-ask-field-icon--top"><MessageSquare size={13} /></div>
                          <textarea
                            className="adp-ask-input-field adp-ask-textarea"
                            placeholder="Describe your requirement or any questions about this application…"
                            value={askMessage}
                            onChange={e => setAskMessage(e.target.value)}
                            rows={3}
                          />
                        </div>

                        {askError && (
                          <div className="adp-ask-error"><AlertCircle size={13} /> {askError}</div>
                        )}

                        <button
                          type="submit"
                          className="adp-ask-submit"
                          style={{ background: selectedWorkflow.appColor }}
                          disabled={askStatus === 'sending'}
                        >
                          {askStatus === 'sending'
                            ? <><Loader2 size={13} className="adp-ask-spinner" /> Sending…</>
                            : <><Send size={13} /> Send via Email</>}
                        </button>

                        <button
                          type="button"
                          className="adp-ask-whatsapp"
                          onClick={handleAskWhatsApp}
                          disabled={askStatus === 'sending'}
                        >
                          <MessageCircle size={13} /> Send via WhatsApp
                        </button>
                      </>
                    )}
                  </form>

                  <a href="tel:+918734013927" className="adp-support-call-btn">
                    <Phone size={15} />
                    Call Technical Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default ApplicationDetailPage;
