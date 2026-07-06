import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Package, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import './NotFoundPage.css';

const NotFoundPage = () => (
  <main className="nf-page">
    <SEO
      title="404 — Page Not Found | Inventa Systems"
      description="The page you're looking for doesn't exist. Browse Inventa Systems' product catalogue or contact our team."
      canonical="/404"
      noindex
    />

    <div className="nf-glow nf-glow--top" />
    <div className="nf-glow nf-glow--bottom" />

    <div className="nf-inner">
      <div className="nf-code-wrap">
        <span className="nf-code">404</span>
      </div>

      <div className="nf-dots">
        <span className="nf-dot" />
        <span className="nf-dot" />
        <span className="nf-dot" />
      </div>

      <h1 className="nf-title">Page Not Found</h1>
      <p className="nf-desc">
        The page you're looking for has moved, been removed, or never existed.
        Head back to a known location below.
      </p>

      <div className="nf-actions">
        <Link to="/" className="nf-btn nf-btn--primary">
          <Home size={15} />
          Go Home
        </Link>
        <Link to="/products" className="nf-btn nf-btn--secondary">
          <Package size={15} />
          Browse Products
        </Link>
        <Link to="/contact" className="nf-btn nf-btn--ghost">
          <Phone size={15} />
          Contact Us
        </Link>
      </div>

      <button
        className="nf-back-link"
        onClick={() => window.history.back()}
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <ArrowLeft size={13} />
        Go back to previous page
      </button>
    </div>
  </main>
);

export default NotFoundPage;
