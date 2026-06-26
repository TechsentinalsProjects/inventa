import React from 'react';
import { motion } from 'framer-motion';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const phoneNumber = '918734013927';
  const message = 'Hello Inventa Systems! I would like to know more about your products and services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      aria-label="Chat with us on WhatsApp"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp" 
        className="whatsapp-icon-img"
      />
    </motion.a>
  );
};

export default WhatsAppButton;
