import React, { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ApplicationsPage from './pages/ApplicationsPage';
import ApplicationDetailPage from './pages/ApplicationDetailPage';
import ProductsPage from './pages/ProductsPage';
import ProductCategoryPage from './pages/ProductCategoryPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import KeyClients from './pages/KeyClients';
import NotFoundPage from './pages/NotFoundPage';
import ChatBot from './components/ChatBot';
import { CartProvider } from './context/CartContext';
import GlobalQuoteCart from './components/GlobalQuoteCart';
import WhatsAppButton from './components/WhatsAppButton';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const BackToTopBtn = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      className="back-to-top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <HelmetProvider>
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
      <div style={{ position: 'relative', width: '100%', overflowX: 'clip' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applications/:id" element={<ApplicationDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:categoryId" element={<ProductCategoryPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/key-clients" element={<KeyClients />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <ChatBot />
        <GlobalQuoteCart />
        <WhatsAppButton />
        <BackToTopBtn />
      </div>
    </BrowserRouter>
    </CartProvider>
    </HelmetProvider>
  );
}

export default App;
