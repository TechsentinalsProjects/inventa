import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  ArrowRight, X,
  CheckCircle2, Box, ShoppingCart, Trash2, Plus, Minus, Send, Phone, User, Mail, MessageSquare,
  Loader2, AlertCircle, ExternalLink, FileText
} from 'lucide-react';
import { applicationsData } from '../data/applicationsData';
import { useCart } from '../context/CartContext';
import './ApplicationsPage.css';


// ── Main Page Component ──
const ApplicationsPage = () => {
  const { cart, addToCart, isCartOpen, setIsCartOpen } = useCart();
  const [activeSection, setActiveSection] = useState(applicationsData[0].id);
  const sidebarListRef = useRef(null);
  const sidebarItemsRef = useRef(new Map());
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [addedItem, setAddedItem] = useState(null);
  const [askName, setAskName] = useState('');
  const [askEmail, setAskEmail] = useState('');
  const [askMessage, setAskMessage] = useState('');
  const [askStatus, setAskStatus] = useState('idle'); // idle | sending | success | error

  /* ── Scroll-spy via IntersectionObserver ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: 0 }
    );
    applicationsData.forEach(app => {
      const el = document.getElementById(app.id);
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
    document.body.style.overflow = (selectedWorkflow || isCartOpen) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedWorkflow, isCartOpen]);

  useEffect(() => {
    if (selectedWorkflow) { setAskName(''); setAskEmail(''); setAskMessage(''); setAskStatus('idle'); }
  }, [selectedWorkflow]);

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
          context: `${selectedWorkflow.title} (${selectedWorkflow.appCategory})`,
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

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) { window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' }); setActiveSection(id); }
  };

  const handleQuantityChange = (productName, delta) => {
    setQuantities(prev => ({ ...prev, [productName]: Math.max(1, (prev[productName] || 1) + delta) }));
  };

  const handleAddToQuote = (productName, category, description) => {
    const qty = quantities[productName] || 1;
    addToCart({ name: productName, category, quantity: qty, type: 'Product', description });
    setQuantities(prev => ({ ...prev, [productName]: 1 }));
    setAddedItem(productName);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <main className="corp-app-page">
      <SEO
        title="Laboratory Applications — Molecular Diagnostics, Forensics & Cell Biology"
        description="Inventa Systems serves 15+ laboratory application areas: molecular diagnostics, cell biology, cell & gene therapy, analytical science, forensic science, animal health, agri-veterinary and more."
        keywords="molecular diagnostics instruments, cell biology lab equipment, forensic science instruments India, analytical chemistry tools, NGS applications, PCR diagnostics India"
        canonical="/applications"
      />

      {/* Page Header */}
      <header className="corp-page-header">
        <div className="corp-header-inner">
          <span className="corp-kicker">Inventa Systems</span>
          <h1>Applications & Techniques</h1>
          <p>Laboratory equipment and consumables organized by industry sector.</p>
        </div>
      </header>

      <div className="corp-app-container">

        {/* Sticky Sidebar */}
        <aside className="corp-sidebar">
          <nav className="corp-sidebar-nav">
            <h3 className="corp-sidebar-title">Applications</h3>
            <ul ref={sidebarListRef}>
              {applicationsData.map(app => {
                const isActive = activeSection === app.id;
                return (
                  <li
                    key={app.id}
                    ref={el => {
                      if (el) sidebarItemsRef.current.set(app.id, el);
                      else sidebarItemsRef.current.delete(app.id);
                    }}
                  >
                    <a
                      href={`#${app.id}`}
                      className={isActive ? 'active' : ''}
                      onClick={(e) => scrollToSection(e, app.id)}
                      style={isActive ? { '--active-color': app.color } : {}}
                    >
                      
                      <span className="corp-sidebar-text">{app.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="corp-sidebar-contact">
            <h4>Technical Inquiries</h4>
            <p>Contact an applications specialist regarding equipment specifications.</p>
            <Link to="/contact" className="corp-btn-outline">Contact Us</Link>
          </div>
        </aside>

        {/* Scrollable Content */}
        <div className="corp-content">
          {applicationsData.map(app => {
            return (
            <section key={app.id} id={app.id} className="corp-section">
              <div
                className="corp-section-header"
                style={{ backgroundImage: app.bannerImage ? `url(${app.bannerImage})` : undefined }}
              >
                <div className="corp-section-overlay" style={{ background: `linear-gradient(135deg, ${app.color}dd 0%, rgba(0,0,0,0.72) 100%)` }} />
                <div className="corp-section-info">
                  <h2>{app.title}</h2>
                  <p>{app.overview}</p>
                </div>
              </div>
              <div className="corp-workflow-grid">
                {app.workflows.map((wf, idx) => {
                  return (
                    <div key={idx} className="corp-workflow-card">
                      <div className="corp-wf-img"><img src={wf.image} alt={wf.title} /></div>
                      <div className="corp-wf-content">
                        <div className="corp-wf-title-row">
                          
                          <h3>{wf.title}</h3>
                        </div>
                        <p className="corp-wf-desc">{wf.description}</p>
                        <button
                          onClick={() => setSelectedWorkflow({ ...wf, appColor: app.color, appCategory: app.title })}
                          className="corp-wf-link"
                          style={{ '--btn-color': app.color }}
                        >
                          View Detail <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            );
          })}
        </div>
      </div>

      {/* Workflow Detail Modal */}
      {selectedWorkflow && (
        <div className="corp-modal-overlay" onClick={() => setSelectedWorkflow(null)}>
          <div className="corp-modal-content" style={{ '--modal-accent': selectedWorkflow.appColor }} onClick={e => e.stopPropagation()}>

            <div className="corp-modal-header">
              <div className="corp-modal-header-titles">
                <span className="corp-modal-kicker" style={{ color: selectedWorkflow.appColor }}>{selectedWorkflow.appCategory}</span>
                <h2>{selectedWorkflow.title}</h2>
              </div>
              <button className="corp-modal-close" onClick={() => setSelectedWorkflow(null)}><X size={24} /></button>
            </div>

            <div className="corp-modal-body">

              {/* Left: Details */}
              <div className="corp-modal-left">
                <img src={selectedWorkflow.image} alt={selectedWorkflow.title} className="corp-modal-main-img" />
                <div className="corp-modal-section">
                  <h3>Application Overview</h3>
                  <p className="corp-extended-desc">{selectedWorkflow.extendedDescription}</p>
                </div>
                <div className="corp-modal-section">
                  <h3>System Specifications</h3>
                  <ul className="corp-feature-list">
                    {selectedWorkflow.keyFeatures.map((f, i) => (
                      <li key={i}><CheckCircle2 size={18} color={selectedWorkflow.appColor} /><span>{f}</span></li>
                    ))}
                  </ul>
                </div>

                {selectedWorkflow.title === 'Cell Therapy Manufacturing' && (
                  <div className="corp-modal-section">
                    <h3>Our Workflow</h3>
                    <div className="adp-our-workflow">
                      {[
                        { step: 1, title: 'Collection and tracking', items: ['Apheresis', 'Supply and cold chain logistics', 'Documentation', 'Chain of custody'] },
                        { step: 2, title: 'Cell isolation, activation, and processing', items: ['Closed modular cell processing systems', 'Magnetic bead-based cell isolation and activation', 'Single-use platforms', 'High cell purity and viability', 'Flexible, high-speed, and scalable solutions'] },
                        { step: 3, title: 'Cell engineering and genome editing', items: ['Genome editing technologies—CRISPR and TALEN tools', 'Closed modular electroporation system', 'Lentiviral production system', 'Lipid nanoparticles', 'Sequence confirmation, verification, and QC'] },
                        { step: 4, title: 'Cell expansion', items: ['Custom and catalog media', 'PeproGMP cytokines and recombinant proteins', 'Premium fetal bovine serum (FBS) that meets USP/EP guidelines', 'Serum-free and xeno-free reagents', 'Closed modular cell processing systems', 'Single-use technologies (SUTs), incubators, bioreactors, centrifuges, and biosafety cabinets'] },
                        { step: 5, title: 'Formulation, fill, finish, and cryopreservation', items: ['Automated formulation and filling', 'Broader compatibility to various outputs and volume ranges', 'Precise and consistent volumes', 'Cryopreservation platforms'] },
                        { step: 6, title: 'Lot release, characterization, and purity analysis', items: ['Identity, purity, and potency assays', 'Contamination and impurity solutions', 'Microbial safety', 'Genomic, proteomic, and cellular analytical tools'] },
                        { step: 7, title: 'Supply and logistics', items: ['Supply and cold chain logistics', 'Clinical trial support', 'Global distribution'] },
                      ].map((stage) => (
                        <div key={stage.step} className="adp-wf-step">
                          <div className="adp-wf-step-header">
                            <span className="adp-wf-step-num" style={{ background: selectedWorkflow.appColor }}>{stage.step}</span>
                            <span className="adp-wf-step-title">{stage.title}</span>
                          </div>
                          <ul className="adp-wf-items">
                            {stage.items.map((item, idx) => (
                              <li key={idx}>
                                <span className="adp-wf-dot" style={{ background: selectedWorkflow.appColor }} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedWorkflow.relatedProducts.some(p => p.docs?.length) && (
                  <div className="corp-modal-section">
                    <h3>Documents &amp; Resources</h3>
                    <div className="corp-app-docs-container">
                      {selectedWorkflow.relatedProducts
                        .filter(p => p.docs?.length)
                        .map((product, pIdx) => (
                          <div key={pIdx} className="corp-app-doc-group">
                            <h5 className="corp-app-doc-group-title">{product.name}</h5>
                            <div className="corp-app-doc-links-grid">
                              {product.docs.map((doc, dIdx) => (
                                <a
                                  key={dIdx}
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="corp-app-doc-link-card"
                                  title={doc.text}
                                >
                                  <div className="corp-app-doc-icon-wrap" style={{ color: selectedWorkflow.appColor, background: `${selectedWorkflow.appColor}12` }}>
                                    <FileText size={16} />
                                  </div>
                                  <div className="corp-app-doc-info">
                                    <span className="corp-app-doc-text">{doc.text}</span>
                                    <span className="corp-app-doc-type">
                                      {doc.url.toLowerCase().endsWith('.pdf') ? 'PDF Document' : 'External Link'}
                                    </span>
                                  </div>
                                  <ExternalLink size={12} className="corp-app-doc-external-icon" />
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Quote Builder */}
              <div className="corp-modal-right">
                <div className="corp-sticky-sidebar-inner">

                  {/* Quote Builder Box */}
                  <div className="quote-builder-box" style={{ borderColor: `${selectedWorkflow.appColor}30` }}>
                    <div className="qbb-header" style={{ background: `${selectedWorkflow.appColor}12` }}>
                      <ShoppingCart size={18} style={{ color: selectedWorkflow.appColor }} />
                      <h4>Build Your Quote</h4>
                    </div>
                    <p className="qbb-desc">Select products and quantities, then add to your quote request.</p>

                    <div className="qbb-products">
                      {selectedWorkflow.relatedProducts.map((product, idx) => {
                        const qty = quantities[product.name] || 1;
                        const isAdded = addedItem === product.name;
                        const inCart = cart.some(i => i.name === product.name);
                        return (
                          <div key={idx} className={`qbb-product-row ${inCart ? 'in-cart' : ''}`}>
                            <div className="qbb-product-info">
                              <div className="qbb-product-icon" style={{ background: `${selectedWorkflow.appColor}15`, color: selectedWorkflow.appColor }}>
                                <Box size={16} />
                              </div>
                              <span className="qbb-product-name">{product.name}</span>
                              {inCart && <span className="qbb-in-cart-tag">In Quote</span>}
                            </div>
                            <div className="qbb-product-actions">
                              <div className="qbb-qty-stepper">
                                <button onClick={() => handleQuantityChange(product.name, -1)}><Minus size={12} /></button>
                                <span>{qty}</span>
                                <button onClick={() => handleQuantityChange(product.name, 1)}><Plus size={12} /></button>
                              </div>
                              <button
                                className={`qbb-add-btn ${isAdded ? 'added' : ''}`}
                                style={{ background: isAdded ? '#10B981' : selectedWorkflow.appColor }}
                                onClick={() => handleAddToQuote(product.name, selectedWorkflow.appCategory, `Requested from Application: ${selectedWorkflow.title}`)}
                              >
                                {isAdded ? <><CheckCircle2 size={14} /> Added!</> : <>Add to Quote</>}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {cart.length > 0 && (
                      <button className="qbb-view-quote-btn" onClick={() => { setSelectedWorkflow(null); setIsCartOpen(true); }} style={{ borderColor: selectedWorkflow.appColor, color: selectedWorkflow.appColor }}>
                        <ShoppingCart size={15} />
                        View Quote Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
                      </button>
                    )}
                  </div>

                  {/* Enquiry Form */}
                  <form className="corp-ask-block" style={{ borderColor: `${selectedWorkflow.appColor}30` }} onSubmit={handleAskSubmit}>
                    <span className="corp-ask-label" style={{ color: selectedWorkflow.appColor }}>Ask About This Application</span>

                    {askStatus === 'success' ? (
                      <div className="corp-ask-success">
                        <CheckCircle2 size={18} style={{ color: selectedWorkflow.appColor }} />
                        <span>Enquiry sent! We'll get back to you soon.</span>
                      </div>
                    ) : (
                      <>
                        <div className="corp-ask-field">
                          <div className="corp-ask-field-icon"><User size={13} /></div>
                          <input
                            className="corp-ask-input-field"
                            type="text"
                            placeholder="Your Name *"
                            value={askName}
                            onChange={e => setAskName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="corp-ask-field">
                          <div className="corp-ask-field-icon"><Mail size={13} /></div>
                          <input
                            className="corp-ask-input-field"
                            type="email"
                            placeholder="Email Address *"
                            value={askEmail}
                            onChange={e => setAskEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div className="corp-ask-field corp-ask-field--textarea">
                          <div className="corp-ask-field-icon corp-ask-field-icon--top"><MessageSquare size={13} /></div>
                          <textarea
                            className="corp-ask-input-field corp-ask-textarea"
                            placeholder="Describe your requirement or any questions about this application…"
                            value={askMessage}
                            onChange={e => setAskMessage(e.target.value)}
                            rows={3}
                          />
                        </div>

                        {askStatus === 'error' && (
                          <div className="corp-ask-error"><AlertCircle size={13} /> Failed to send. Please try again.</div>
                        )}

                        <button
                          type="submit"
                          className="corp-ask-submit"
                          style={{ background: selectedWorkflow.appColor }}
                          disabled={askStatus === 'sending'}
                        >
                          {askStatus === 'sending'
                            ? <><Loader2 size={13} className="corp-ask-spinner" /> Sending…</>
                            : <><Send size={13} /> Send Enquiry</>}
                        </button>
                      </>
                    )}
                  </form>

                  <a href="tel:+918734013927" className="corp-support-call-btn">
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

export default ApplicationsPage;
