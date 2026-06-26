import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import {
  ArrowRight, X,
  CheckCircle2, Box, ShoppingCart, Trash2, Plus, Minus, Send,
  Phone, User, Mail, MessageSquare, ExternalLink, Loader2, AlertCircle, FileText
} from 'lucide-react';
import { productsData } from '../data/productsData';
import { useCart } from '../context/CartContext';
import './ProductsPage.css';
import './ProductCategoryPage.css';


/* ── Product Family Modal (identical to Explore Category modal) ── */
const ProductFamilyModal = ({ family, category, quantities, addedItem, onClose, onAddToQuote, onQuantityChange }) => {
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
                    <Link key={appId} to={`/applications/${appId}`} className="pcp-app-tag" style={{ color: category.color, borderColor: `${category.color}35`, background: `${category.color}08` }} onClick={onClose}>
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
const ProductsPage = () => {
  const { addToCart, isCartOpen } = useCart();
  const [activeSection, setActiveSection] = useState(productsData[0].id);
  const [addedItem, setAddedItem] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  const sidebarListRef = useRef(null);
  const sidebarItemsRef = useRef(new Map());

  /* ── Scroll-spy via IntersectionObserver ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.id.replace('cat-', '');
          setActiveSection(id);
        }
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: 0 }
    );
    productsData.forEach(cat => {
      const el = document.getElementById(`cat-${cat.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* ── Auto-scroll sidebar so active item stays visible ── */
  useEffect(() => {
    const list = sidebarListRef.current;
    const item = sidebarItemsRef.current.get(activeSection);
    if (!list || !item) return;
    const listTop = list.scrollTop;
    const listBottom = listTop + list.clientHeight;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    if (itemTop < listTop + 24 || itemBottom > listBottom - 24) {
      list.scrollTo({
        top: itemTop - list.clientHeight / 2 + item.offsetHeight / 2,
        behavior: 'smooth',
      });
    }
  }, [activeSection]);

  useEffect(() => {
    const anyOverlay = isCartOpen || selectedFamily;
    document.body.style.overflow = anyOverlay ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen, selectedFamily]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const openModal = (family, category) => {
    setSelectedFamily(family);
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setSelectedFamily(null);
    setSelectedCategory(null);
  };

  const handleAddToQuote = (productName, categoryTitle, description) => {
    const qty = quantities[productName] || 1;
    addToCart({ name: productName, category: categoryTitle, quantity: qty, type: 'Product', description });
    setQuantities(prev => ({ ...prev, [productName]: 1 }));
    setAddedItem(productName);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const handleQtyChange = (product, delta) => {
    setQuantities(prev => ({ ...prev, [product]: Math.max(1, (prev[product] || 1) + delta) }));
  };

  return (
    <main className="pp-page">
      <SEO
        title="Lab Products — PCR, NGS, HPLC, Mass Spectrometry & More"
        description="Browse 13+ product categories: PCR thermal cyclers, real-time PCR, next-gen sequencers, HPLC, mass spectrometers, centrifuges, lab chemicals, refrigerators and more from Inventa Systems."
        keywords="PCR instruments India, real-time PCR, NGS sequencer, HPLC systems, mass spectrometry India, centrifuges lab, molecular biology kits, lab chemicals reagents India"
        canonical="/products"
      />

      {/* ── Page Header ── */}
      <header className="pp-page-header">
        <div className="pp-header-inner">
          <span className="pp-kicker">Inventa Systems</span>
          <h1>Products Catalogue</h1>
          <p>Analytical instruments, reagents, labware, and manufacturing solutions across every discipline.</p>
        </div>
      </header>

      <div className="pp-container">

        {/* ── Sticky Sidebar ── */}
        <aside className="pp-sidebar">
          <nav className="pp-sidebar-nav">
            <h3 className="pp-sidebar-title">Products</h3>
            <ul ref={sidebarListRef}>
              {productsData.map(cat => {
                const Icon = cat.icon;
                const isActive = activeSection === cat.id;
                return (
                  <li
                    key={cat.id}
                    ref={el => {
                      if (el) sidebarItemsRef.current.set(cat.id, el);
                      else sidebarItemsRef.current.delete(cat.id);
                    }}
                  >
                    <a
                      href={`#cat-${cat.id}`}
                      className={isActive ? 'active' : ''}
                      onClick={e => scrollToSection(e, cat.id)}
                      style={isActive ? { '--active-color': cat.color } : {}}
                    >
                      <span className="pp-sidebar-text">{cat.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="pp-sidebar-contact">
            <h4>Product Enquiries</h4>
            <p>Contact a product specialist for pricing, availability, and technical guidance.</p>
            <Link to="/contact" className="pp-sidebar-btn">Contact Us</Link>
          </div>
        </aside>

        {/* ── Main Scrollable Content ── */}
        <div className="pp-content">
          {productsData.map(cat => {
            const isExpanded = !!expandedCategories[cat.id];
            const visibleFamilies = isExpanded ? cat.families : cat.families.slice(0, 3);
            return (
              <section key={cat.id} id={`cat-${cat.id}`} className="pp-cat-section">

                {/* Category Header */}
                <div className="pp-cat-header">
                  <div className="pp-cat-header-overlay" style={{ background: `linear-gradient(135deg, ${cat.color} 0%, ${cat.color}99 60%, #0d111e 100%)` }} />
                  <div className="pp-cat-header-inner">
                    <div>
                      <h2>{cat.title}</h2>
                      <p>{cat.overview}</p>
                    </div>
                  </div>
                </div>

                {/* Families Grid */}
                <div className="pp-families-grid">
                  {visibleFamilies.map(family => (
                    <div
                      key={family.id}
                      className="pp-family-card"
                      onClick={() => openModal(family, cat)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="pp-fc-img-wrap">
                        <img src={family.image} alt={family.name} className="pp-fc-img" />
                        <div className="pp-fc-badge" style={{ background: cat.color }}>
                          {family.models.length} model{family.models.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                      <div className="pp-fc-body">
                        <h3 className="pp-fc-name">{family.name}</h3>
                        <p className="pp-fc-tagline">{family.tagline}</p>

                        <div className="pp-fc-model-chips">
                          {family.models.map(m => (
                            <span key={m.id} className="pp-fc-chip">{m.name}</span>
                          ))}
                        </div>

                        <button
                          className="pp-fc-view-btn"
                          style={{ '--btn-color': cat.color }}
                          onClick={e => { e.stopPropagation(); openModal(family, cat); }}
                        >
                          View Detail <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show More / Detail Product Button */}
                {cat.families.length > 3 && (
                  <div className="pp-show-more-row">
                    <button
                      className="pp-detail-product-btn"
                      style={{ '--btn-color': cat.color }}
                      onClick={() => setExpandedCategories(prev => ({ ...prev, [cat.id]: !prev[cat.id] }))}
                    >
                      {isExpanded ? 'Show Less' : 'Detail Product'}
                      <ArrowRight size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '6px', transform: isExpanded ? 'rotate(-90deg)' : 'none', transition: 'transform 0.3s' }} />
                    </button>
                  </div>
                )}

              </section>
            );
          })}
        </div>
      </div>

      {/* ── Product Family Modal ── */}
      <AnimatePresence>
        {selectedFamily && selectedCategory && (
          <ProductFamilyModal
            family={selectedFamily}
            category={selectedCategory}
            quantities={quantities}
            addedItem={addedItem}
            onClose={closeModal}
            onAddToQuote={handleAddToQuote}
            onQuantityChange={handleQtyChange}
          />
        )}
      </AnimatePresence>

    </main>
  );
};

export default ProductsPage;
