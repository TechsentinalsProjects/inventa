import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import {
  ArrowLeft, ArrowRight, X, CheckCircle2, Box,
  ShoppingCart, Trash2, Plus, Minus, Send, ExternalLink, Phone, User, Mail, MessageSquare,
  Loader2, AlertCircle, FileText
} from 'lucide-react';
import { productsData } from '../data/productsData';
import { useCart } from '../context/CartContext';
import './ProductCategoryPage.css';


/* ── Family Drawer ── */
const FamilyModal = ({ family, category, quantities, addedItem, onClose, onAddToQuote, onQuantityChange }) => {
  const { cart, setIsCartOpen } = useCart();
  const [activeModelIdx, setActiveModelIdx] = useState(0);
  const [askName, setAskName] = useState('');
  const [askEmail, setAskEmail] = useState('');
  const [askMessage, setAskMessage] = useState('');
  const [askStatus, setAskStatus] = useState('idle');
  const activeModel = family.models[activeModelIdx];

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    setActiveModelIdx(0);
    setAskName('');
    setAskEmail('');
    setAskMessage('');
    setAskStatus('idle');
  }, [family.id]);

  const handleAskSubmit = async (e) => {
    e.preventDefault();
    if (!askName.trim() || !askEmail.trim()) return;
    setAskStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: askName.trim(),
          email: askEmail.trim(),
          context: `${family.name} — ${activeModel.name} (${category.title})`,
          message: askMessage.trim(),
        }),
      });
      const result = await res.json();
      if (result.success) {
        setAskStatus('success');
        setTimeout(() => { setAskStatus('idle'); setAskName(''); setAskEmail(''); setAskMessage(''); }, 3000);
      } else {
        setAskStatus('error');
        setTimeout(() => setAskStatus('idle'), 3000);
      }
    } catch {
      setAskStatus('error');
      setTimeout(() => setAskStatus('idle'), 3000);
    }
  };

  return (
    <motion.div
        className="pcp-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
      <motion.div
        className="pcp-modal"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="pcp-modal-header">
          <div className="pcp-modal-header-left">
            <span className="pcp-drawer-kicker" style={{ color: category.color, background: `${category.color}12` }}>
              {category.shortTitle}
            </span>
            <h2 className="pcp-drawer-title">{family.name}</h2>
          </div>
          <button className="pcp-drawer-close" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Two-column body */}
        <div className="pcp-modal-body">

          {/* LEFT — Image + Overview + Specs */}
          <div className="pcp-modal-left">
            <div className="pcp-drawer-img-wrap">
              <img src={activeModel?.image || family.image} alt={activeModel?.name || family.name} className="pcp-drawer-img" />
              <div className="pcp-drawer-img-overlay" style={{ background: `linear-gradient(to top, ${category.color}99 0%, transparent 60%)` }} />
            </div>

            <div className="pcp-modal-section">
              <h4 className="pcp-modal-section-title">
                <span className="pcp-modal-section-bar" style={{ background: category.color }} />
                <span style={{ color: category.color }}>Product Overview</span>
              </h4>
              <p className="pcp-drawer-desc">{family.description}</p>
              <p className="pcp-drawer-ext-desc">{family.extendedDescription}</p>
            </div>

            <div className="pcp-modal-section">
              <h4 className="pcp-modal-section-title">
                <span className="pcp-modal-section-bar" style={{ background: category.color }} />
                <span style={{ color: category.color }}>System Specifications</span>
              </h4>
              <ul className="pcp-drawer-feature-list">
                {family.keyFeatures.map((f, i) => (
                  <li key={i}>
                    <CheckCircle2 size={15} style={{ color: category.color, flexShrink: 0 }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {family.relatedApplications && family.relatedApplications.length > 0 && (
              <div className="pcp-modal-section">
                <h4 className="pcp-modal-section-title">
                  <span className="pcp-modal-section-bar" style={{ background: category.color }} />
                  <span style={{ color: category.color }}>Related Applications</span>
                </h4>
                <div className="pcp-related-apps">
                  {family.relatedApplications.map(appId => (
                    <Link key={appId} to={`/applications/${appId}`} className="pcp-app-tag" style={{ color: category.color, borderColor: `${category.color}35`, background: `${category.color}08` }}>
                      <ExternalLink size={11} />
                      {appId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {family.documents && family.documents.length > 0 && (
              <div className="pcp-modal-section">
                <h4 className="pcp-modal-section-title">
                  <span className="pcp-modal-section-bar" style={{ background: category.color }} />
                  <span style={{ color: category.color }}>Documents & Resources</span>
                </h4>
                <div className="pcp-docs-container">
                  {family.documents.map((group, gIdx) => (
                    <div key={gIdx} className="pcp-doc-group">
                      <h5 className="pcp-doc-group-title">{group.header}</h5>
                      <div className="pcp-doc-links-grid">
                        {group.links.map((link, lIdx) => (
                          <a
                            key={lIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pcp-doc-link-card"
                            title={link.text}
                          >
                            <div className="pcp-doc-icon-wrap" style={{ color: category.color, background: `${category.color}10` }}>
                              <FileText size={16} />
                            </div>
                            <div className="pcp-doc-info">
                              <span className="pcp-doc-text">{link.text}</span>
                              <span className="pcp-doc-type">
                                {link.url.toLowerCase().endsWith('.pdf') ? 'PDF Document' : 'External Link'}
                              </span>
                            </div>
                            <ExternalLink size={12} className="pcp-doc-external-icon" />
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Model Selector + Specs + Qty/Quote + Enquiry */}
          <div className="pcp-modal-right">

            {/* Model Selector */}
            <div className="pcp-model-selector">
              <span className="pcp-model-selector-label">Select Model</span>
              <div className="pcp-model-tabs">
                {family.models.map((model, i) => (
                  <button
                    key={model.id}
                    className={`pcp-model-tab ${i === activeModelIdx ? 'is-active' : ''}`}
                    style={i === activeModelIdx ? { background: category.color, borderColor: category.color } : {}}
                    onClick={() => setActiveModelIdx(i)}
                  >
                    {model.name}
                    <span className={`pcp-model-tier ${model.tier.toLowerCase()}`}>{model.tier}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Specs + inline Qty/Add-to-Quote — updates on model switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModel.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <div className="pcp-specs-block">
                  <h4 className="pcp-specs-title">{activeModel.name} — Specifications</h4>
                  <table className="pcp-specs-table">
                    <tbody>
                      {Object.entries(activeModel.specs).map(([k, v]) => (
                        <tr key={k}>
                          <td className="pcp-spec-key">{k}</td>
                          <td className="pcp-spec-val">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pcp-model-features">
                    {activeModel.keyFeatures.map((f, i) => (
                      <span key={i} className="pcp-model-feature-tag" style={{ background: `${category.color}10`, color: category.color }}>
                        <CheckCircle2 size={11} />
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Qty + Add to Quote — inside the specs card */}
                  <div className="pcp-model-cta">
                    <div className="pcp-model-cta-qty">
                      <button onClick={() => onQuantityChange(activeModel.name, -1)}><Minus size={13} /></button>
                      <span>{quantities[activeModel.name] || 1}</span>
                      <button onClick={() => onQuantityChange(activeModel.name, 1)}><Plus size={13} /></button>
                    </div>
                    <button
                      className={`pcp-model-cta-btn ${addedItem === activeModel.name ? 'added' : ''}`}
                      style={{ background: addedItem === activeModel.name ? '#10B981' : category.color }}
                      onClick={() => onAddToQuote(activeModel.name, category.title, family.description)}
                    >
                      {addedItem === activeModel.name
                        ? <><CheckCircle2 size={14} /> Added to Quote</>
                        : <><ShoppingCart size={14} /> Add to Quote</>}
                    </button>
                  </div>
                </div>

                {cart.length > 0 && (
                  <button
                    className="pcp-qb-view-quote"
                    style={{ '--cat-color': category.color }}
                    onClick={() => { onClose(); setIsCartOpen(true); }}
                  >
                    <ShoppingCart size={14} />
                    View Quote Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
                  </button>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Enquiry Form */}
            <form className="pcp-ask-block" style={{ borderColor: `${category.color}30` }} onSubmit={handleAskSubmit}>
              <span className="pcp-ask-label" style={{ color: category.color }}>Ask About This Product</span>

              {askStatus === 'success' ? (
                <div className="pcp-ask-success">
                  <CheckCircle2 size={18} style={{ color: category.color }} />
                  <span>Enquiry sent! We'll get back to you soon.</span>
                </div>
              ) : (
                <>
                  <div className="pcp-ask-field">
                    <div className="pcp-ask-field-icon"><User size={13} /></div>
                    <input
                      className="pcp-ask-input-field"
                      type="text"
                      placeholder="Your Name *"
                      value={askName}
                      onChange={e => setAskName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="pcp-ask-field">
                    <div className="pcp-ask-field-icon"><Mail size={13} /></div>
                    <input
                      className="pcp-ask-input-field"
                      type="email"
                      placeholder="Email Address *"
                      value={askEmail}
                      onChange={e => setAskEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="pcp-ask-field pcp-ask-field--textarea">
                    <div className="pcp-ask-field-icon pcp-ask-field-icon--top"><MessageSquare size={13} /></div>
                    <textarea
                      className="pcp-ask-input-field pcp-ask-textarea"
                      placeholder="Describe your requirement, quantity needed, or any questions…"
                      value={askMessage}
                      onChange={e => setAskMessage(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {askStatus === 'error' && (
                    <div className="pcp-ask-error"><AlertCircle size={13} /> Failed to send. Please try again.</div>
                  )}

                  <button
                    type="submit"
                    className="pcp-ask-submit"
                    style={{ background: category.color }}
                    disabled={askStatus === 'sending'}
                  >
                    {askStatus === 'sending'
                      ? <><Loader2 size={13} className="pcp-ask-spinner" /> Sending…</>
                      : <><Send size={14} /> Send Enquiry</>}
                  </button>
                </>
              )}
            </form>

            <a href="tel:+918734013927" className="pcp-support-call-btn">
              <Phone size={15} />
              Call Technical Support
            </a>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Main Page ── */
const ProductCategoryPage = () => {
  const { categoryId: catId } = useParams();
  const navigate = useNavigate();
  const { addToCart, isCartOpen } = useCart();
  
  const category = productsData.find(c => c.id === catId);
  const [activeFamily, setActiveFamily] = useState(null);
  
  const [addedItem, setAddedItem] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (!category) navigate('/products', { replace: true });
  }, [category, navigate]);

  useEffect(() => {
    const anyOverlay = isCartOpen || activeFamily;
    document.body.style.overflow = anyOverlay ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen, activeFamily]);

  if (!category) return null;

  const CatIcon = category.icon;

  const handleQuantityChange = (product, delta) => {
    setQuantities(prev => ({ ...prev, [product]: Math.max(1, (prev[product] || 1) + delta) }));
  };

  const handleAddToQuote = (productName, categoryTitle, description) => {
    const qty = quantities[productName] || 1;
    addToCart({ name: productName, category: categoryTitle, quantity: qty, type: 'Product', description });
    setQuantities(prev => ({ ...prev, [productName]: 1 }));
    setAddedItem(productName);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const desc = category.overview
    ? category.overview.slice(0, 155) + (category.overview.length > 155 ? '…' : '')
    : `Browse ${category.title} instruments and solutions from Inventa Systems. Get quotes, specs, and expert guidance.`;

  const catSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.inventasystems.in/' },
          { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.inventasystems.in/products' },
          { '@type': 'ListItem', position: 3, name: category.title, item: `https://www.inventasystems.in/products/${catId}` },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: category.title,
        description: category.overview,
        url: `https://www.inventasystems.in/products/${catId}`,
        provider: { '@id': 'https://www.inventasystems.in/#organization' },
      },
    ],
  };

  return (
    <main className="pcp-page">
      <SEO
        title={`${category.title} | Lab Instruments India`}
        description={desc}
        keywords={`${category.title}, ${category.shortTitle || ''}, lab instruments India, Inventa Systems, buy ${category.shortTitle || category.title}`}
        canonical={`/products/${catId}`}
        structuredData={catSchema}
      />

      {/* ── Hero Banner ── */}
      <div className="pcp-hero">
        <img src={category.image} alt={category.title} className="pcp-hero-bg" />
        <div className="pcp-hero-overlay" />
        <div className="pcp-hero-color-wash" style={{ background: category.color }} />
        <div className="pcp-hero-inner">
          <div className="pcp-breadcrumb">
            <Link to="/products" className="pcp-back-btn">
              <ArrowLeft size={14} />
              All Products
            </Link>
            <span className="pcp-breadcrumb-sep">/</span>
            <span className="pcp-breadcrumb-current" style={{ color: '#fff', opacity: 0.85 }}>
              <CatIcon size={13} />
              {category.shortTitle}
            </span>
          </div>
          <h1>{category.title}</h1>
          <p>{category.overview}</p>
        </div>
      </div>

      {/* ── Product Families Grid ── */}
      <section className="pcp-families-section">
        <div className="pcp-families-inner">
          <div className="pcp-section-label">
            <span className="pcp-label-kicker" style={{ color: category.color }}>Product Families</span>
            <h2>Explore our {category.shortTitle} solutions</h2>
          </div>

          <div className="pcp-families-grid">
            {category.families.map((family, idx) => (
              <motion.div
                key={family.id}
                className="pcp-family-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveFamily(family)}
              >
                <div className="pcp-fc-img-wrap">
                  <img src={family.image} alt={family.name} className="pcp-fc-img" />
                  <div className="pcp-fc-gradient" style={{ background: `linear-gradient(to top, ${category.color}bb 0%, transparent 55%)` }} />
                  <div className="pcp-fc-badge" style={{ background: `${category.color}`, color: '#fff' }}>
                    {family.models.length} model{family.models.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="pcp-fc-body">
                  <div className="pcp-fc-body-main">
                    <h3 className="pcp-fc-name">{family.name}</h3>
                    <p className="pcp-fc-tagline">{family.tagline}</p>
                    <div className="pcp-fc-model-chips">
                      {family.models.map(m => (
                        <span key={m.id} className="pcp-fc-chip">{m.name}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="pcp-fc-view-btn"
                    style={{ color: category.color, borderColor: `${category.color}35`, '--btn-color': category.color }}
                    onClick={e => { e.stopPropagation(); setActiveFamily(family); }}
                  >
                    View Detail <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Support CTA ── */}
      <section className="pcp-support-section">
        <div className="pcp-support-inner">
          <div className="pcp-support-card" style={{ borderColor: `${category.color}25` }}>
            <div className="pcp-support-text">
              <h3>Need expert guidance on {category.shortTitle}?</h3>
              <p>Speak with a product specialist about your requirements, compliance needs, and workflow integration.</p>
            </div>
            <div className="pcp-support-actions">
              <Link to="/contact" className="pcp-support-btn" style={{ background: category.color }}>
                Contact a Specialist
              </Link>
              <Link to="/products" className="pcp-support-link-btn" style={{ color: category.color, borderColor: `${category.color}35` }}>
                All Product Categories <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Family Modal ── */}
      <AnimatePresence>
        {activeFamily && (
          <FamilyModal
            family={activeFamily}
            category={category}
            quantities={quantities}
            addedItem={addedItem}
            onClose={() => setActiveFamily(null)}
            onAddToQuote={handleAddToQuote}
            onQuantityChange={handleQuantityChange}
          />
        )}
      </AnimatePresence>

    </main>
  );
};

export default ProductCategoryPage;
