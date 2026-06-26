const express = require('express');
const { sendQuoteEmail } = require('../services/email');
const { generateQuoteLink } = require('../services/whatsapp');
const { logMessage } = require('../db/logger');
const { enrichCart } = require('../db/products');
const { log, logError } = require('../middleware/requestLogger');
const { validateQuote } = require('../middleware/validate');
const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// POST /api/quote — send quote request via email
router.post('/', formLimiter, validateQuote, async (req, res) => {
  const { name, phone, company, cart } = req.validated;

  const enrichedCart = enrichCart(cart);
  const verified = enrichedCart.filter(i => i.verified).length;
  const unverified = enrichedCart.length - verified;
  log('Quote', `Cart enriched — ${verified} verified, ${unverified} unverified`);

  try {
    await sendQuoteEmail({ name, phone, company, enrichedCart });
    logMessage({ type: 'quote', channel: 'email', senderName: name, senderPhone: phone, status: 'sent' });
    return res.json({ success: true, message: 'Quote request submitted. We will contact you within 24 hours.' });
  } catch (err) {
    logError('Quote', 'Email failed:', err.message);
    logMessage({ type: 'quote', channel: 'email', senderName: name, senderPhone: phone, status: 'failed', errorDetail: err.message });
    return res.status(500).json({ success: false, message: 'Failed to submit quote. Please try again or contact us directly.' });
  }
});

// POST /api/quote/whatsapp — validate input and return a safe WhatsApp deep link
router.post('/whatsapp', formLimiter, validateQuote, (req, res) => {
  const { name, phone, company, cart } = req.validated;
  const enrichedCart = enrichCart(cart);
  const url = generateQuoteLink({ name, phone, company, cart: enrichedCart });
  logMessage({ type: 'quote', channel: 'whatsapp', senderName: name, senderPhone: phone, status: 'link_generated' });
  return res.json({ success: true, url });
});

module.exports = router;
