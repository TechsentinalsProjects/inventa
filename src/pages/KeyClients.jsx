import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import SEO from '../components/SEO';
import './KeyClients.css';

const TABS = {
  CLIENTS: 'Key Clients',
  BRANDS: 'Our Brands',
};

const tabs = [TABS.CLIENTS, TABS.BRANDS];

const TAB_ICONS = {
  [TABS.CLIENTS]: '✚',
  [TABS.BRANDS]: '✦',
};

const SUB_CATEGORIES = {
  PHARMA: 'Pharma & Biotech',
  HEALTHCARE: 'Healthcare & Diagnostics',
  RESEARCH: 'Research & Academia',
  BRAND: 'Authorized Brand',
};

const SUB_CATEGORY_COLORS = {
  [SUB_CATEGORIES.PHARMA]:     { bg: 'rgba(93, 174, 123, 0.15)', text: '#3d9a5f', border: 'rgba(93, 174, 123, 0.3)',  glow: '0 0 20px rgba(93, 174, 123, 0.25)', icon: '⬡' },
  [SUB_CATEGORIES.HEALTHCARE]: { bg: 'rgba(59, 130, 246, 0.12)', text: '#2563eb', border: 'rgba(59, 130, 246, 0.3)',  glow: '0 0 20px rgba(59, 130, 246, 0.2)',  icon: '✚' },
  [SUB_CATEGORIES.RESEARCH]:   { bg: 'rgba(139, 92, 246, 0.12)', text: '#7c3aed', border: 'rgba(139, 92, 246, 0.3)',  glow: '0 0 20px rgba(139, 92, 246, 0.2)',  icon: '◎' },
  [SUB_CATEGORIES.BRAND]:      { bg: 'rgba(13, 148, 136, 0.12)',  text: '#0d9488', border: 'rgba(13, 148, 136, 0.3)',   glow: '0 0 20px rgba(13, 148, 136, 0.2)',   icon: '✦' },
};

const clientsData = [
  { id: 'zydus',       name: 'Zydus Lifesciences',              image: '/clients/zydus.png',         subcategory: SUB_CATEGORIES.PHARMA },
  { id: 'sun-pharma',  name: 'Sun Pharma',                      image: '/clients/sun-pharma.png',    subcategory: SUB_CATEGORIES.PHARMA },
  { id: 'intas',       name: 'Intas Pharmaceuticals',           image: '/clients/intas.png',         subcategory: SUB_CATEGORIES.PHARMA },
  { id: 'kashiv',      name: 'Kashiv Biosciences',              image: '/clients/kashiv.png',        subcategory: SUB_CATEGORIES.PHARMA },
  { id: 'cadila',      name: 'Cadila Pharmaceuticals',          image: '/clients/cadila.png',        subcategory: SUB_CATEGORIES.PHARMA },
  { id: 'meril',       name: 'Meril Life Sciences',             image: '/clients/meril.png',         subcategory: SUB_CATEGORIES.PHARMA },
  { id: 'neuberg',     name: 'Neuberg Supratech',               image: '/clients/neuberg.png',       subcategory: SUB_CATEGORIES.HEALTHCARE },
  { id: 'lifecell',    name: 'LifeCell',                        image: '/clients/lifecell.png',      subcategory: SUB_CATEGORIES.HEALTHCARE },
  { id: 'unipath',     name: 'Unipath Specialty Laboratory',    image: '/clients/unipath.png',       subcategory: SUB_CATEGORIES.HEALTHCARE },
  { id: 'sn-genelab',  name: 'SN GeneLab',                     image: '/clients/sn-genelab.png',    subcategory: SUB_CATEGORIES.HEALTHCARE },
  { id: 'gcri',        name: 'Gujarat Cancer Research Institute', image: '/clients/gcri.png',        subcategory: SUB_CATEGORIES.HEALTHCARE },
  { id: 'aiims-rajkot', name: 'AIIMS Rajkot',                  image: '/clients/aiims-rajkot.png',  subcategory: SUB_CATEGORIES.HEALTHCARE },
  { id: 'nfsu',        name: 'National Forensic Sciences University', image: '/clients/nfsu.png',   subcategory: SUB_CATEGORIES.RESEARCH },
  { id: 'gbu',         name: 'Gujarat Biotechnology University', image: '/clients/gbu.png',          subcategory: SUB_CATEGORIES.RESEARCH },
  { id: 'govt-emblem', name: 'Government of India',             image: '/clients/govt-emblem.png',  subcategory: SUB_CATEGORIES.RESEARCH },
  { id: 'nddb',        name: 'NDDB',                            image: '/clients/nddb.png',          subcategory: SUB_CATEGORIES.RESEARCH },
  { id: 'gbrc',        name: 'GBRC',                            image: '/clients/gbrc.png',          subcategory: SUB_CATEGORIES.RESEARCH },
  { id: 'reliance',    name: 'Reliance Industries',             image: '/clients/reliance.png',      subcategory: SUB_CATEGORIES.RESEARCH },
  { id: 'adani',       name: 'Adani',                           image: '/clients/adani.png',         subcategory: SUB_CATEGORIES.RESEARCH },
  { id: 'vantara',     name: 'Vantara',                         image: '/clients/vantara.png',       subcategory: SUB_CATEGORIES.RESEARCH },
];

const brandsData = [
  { id: 'thermo-fisher',    name: 'Thermo Fisher',       image: '/brands/thermo-fisher.png',       subcategory: SUB_CATEGORIES.BRAND },
  { id: 'molbio',           name: 'MolBio',              image: '/brands/molbio.png',              subcategory: SUB_CATEGORIES.BRAND },
  { id: 'pierce',           name: 'Pierce Biotechnology', image: '/brands/pierce.png',              subcategory: SUB_CATEGORIES.BRAND },
  { id: 'peprotech',        name: 'Peprotech',           image: '/brands/peprotech.png',           subcategory: SUB_CATEGORIES.BRAND },
  { id: 'fisher-scientific',name: 'Fisher Scientific',   image: '/brands/fisher-scientific.png',   subcategory: SUB_CATEGORIES.BRAND },
  { id: 'labserve',         name: 'Labserve',            image: '/brands/labserve.png',            subcategory: SUB_CATEGORIES.BRAND, darkBg: true },
  { id: 'revvity',          name: 'Revvity',             image: '/brands/revvity.png',             subcategory: SUB_CATEGORIES.BRAND },
  { id: 'gibco',            name: 'Gibco',               image: '/brands/gibco.png',               subcategory: SUB_CATEGORIES.BRAND },
  { id: 'labconco',         name: 'Labconco',            image: '/brands/labconco.png',            subcategory: SUB_CATEGORIES.BRAND },
  { id: 'fisherbrand',      name: 'Fisherbrand',         image: '/brands/fisherbrand.png',         subcategory: SUB_CATEGORIES.BRAND },
  { id: 'invitrogen',       name: 'Invitrogen',          image: '/brands/invitrogen.png',          subcategory: SUB_CATEGORIES.BRAND },
  { id: 'unity-lab',        name: 'Unity Lab Services',  image: '/brands/unity-lab-services.png',  subcategory: SUB_CATEGORIES.BRAND },
  { id: 'olink',            name: 'Olink',               image: '/brands/olink.png',               subcategory: SUB_CATEGORIES.BRAND },
  { id: 'nunc',             name: 'Nunc',                image: '/brands/nunc.png',                subcategory: SUB_CATEGORIES.BRAND },
  { id: 'applied-bio',      name: 'Applied Biosystems',  image: '/brands/applied-biosystems.png',  subcategory: SUB_CATEGORIES.BRAND },
  { id: 'nalgene',          name: 'Nalgene',             image: '/brands/nalgene.png',             subcategory: SUB_CATEGORIES.BRAND },
  { id: 'dgr',              name: 'Decipher Genomics',   image: '/brands/dgr.jpg',                 subcategory: SUB_CATEGORIES.BRAND },
];

const ClientCard = ({ item }) => {
  const color = SUB_CATEGORY_COLORS[item.subcategory] || SUB_CATEGORY_COLORS[SUB_CATEGORIES.BRAND];
  return (
    <motion.div
      layout
      layoutId={item.id}
      className="kc-card"
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hover"
    >
      {/* Glow ring on hover */}
      <motion.div
        className="kc-card-glow"
        style={{ boxShadow: color.glow, borderColor: color.border }}
        variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }}
        initial="initial"
      />

      {/* Logo area */}
      <div className={`kc-card-logo${item.darkBg ? ' kc-card-logo--dark' : ''}`}>
        <motion.img
          src={item.image}
          alt={item.name}
          variants={{ hover: { scale: 1.08 } }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Slide-up info overlay */}
      <motion.div
        className="kc-card-overlay"
        variants={{
          hover: { y: 0, opacity: 1 },
          initial: { y: '100%', opacity: 0 }
        }}
        initial="initial"
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="kc-category-badge"
          style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
        >
          {color.icon} {item.subcategory}
        </span>
        <p className="kc-client-name">{item.name}</p>
      </motion.div>
    </motion.div>
  );
};

const KeyClients = () => {
  const [activeTab, setActiveTab] = useState(TABS.CLIENTS);

  const filtered = activeTab === TABS.CLIENTS ? clientsData : brandsData;

  return (
    <main className="kc-page">
      <SEO
        title="Key Clients & Our Brands — Trusted Partner of India's Leading Laboratories"
        description="Inventa Systems supplies premium lab instruments, chemicals, and critical consumables to leading organizations across research, diagnostics, pharmaceuticals, and academia."
        keywords="laboratory clients India, biotech partners India, pharmaceutical key clients, research institute suppliers, authorized distributor India"
        canonical="/key-clients"
      />

      {/* Decorative background blobs */}
      <div className="kc-bg-blob kc-blob-1" />
      <div className="kc-bg-blob kc-blob-2" />
      <div className="kc-bg-blob kc-blob-3" />

      {/* Hero */}
      <section className="kc-hero">
        <motion.div
          className="kc-hero-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="kc-eyebrow-dot" />
          Trusted Partnerships
          <span className="kc-eyebrow-dot" />
        </motion.div>

        <motion.h1
          className="kc-hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Powering India's
          <br />
          <span className="kc-hero-title-accent">Leading Institutions.</span>
        </motion.h1>

        <motion.p
          className="kc-hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Trusted by leading research institutions, diagnostic laboratories, pharmaceutical companies, and world-renowned life science brands, Inventa Systems delivers innovative technologies and dependable laboratory solutions across India.
        </motion.p>

        {/* Stat strip */}
        <motion.div
          className="kc-stat-strip"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="kc-stat">
            <span className="kc-stat-number">200+</span>
            <span className="kc-stat-label">Key Clients</span>
          </div>
          <div className="kc-stat-divider" />
          <div className="kc-stat">
            <span className="kc-stat-number">20+</span>
            <span className="kc-stat-label">Our Brands</span>
          </div>
          <div className="kc-stat-divider" />
          <div className="kc-stat">
            <span className="kc-stat-number">9+</span>
            <span className="kc-stat-label">Years of Trust</span>
          </div>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="kc-filter-section">
        <motion.div
          className="kc-tabs"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {tabs.map(tab => (
            <button
              key={tab}
              className={`kc-tab ${activeTab === tab ? 'kc-tab-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="kc-tab-icon">{TAB_ICONS[tab]}</span>
              <span>{tab}</span>
              {activeTab === tab && (
                <motion.div
                  layoutId="kc-tab-pill"
                  className="kc-tab-active-bg"
                  transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Cards Grid */}
      <section className="kc-grid-section">
        <LayoutGroup>
          <motion.div className="kc-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <ClientCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </section>
    </main>
  );
};

export default KeyClients;
