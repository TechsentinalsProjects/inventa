const express = require('express');
const { sendContactEmail } = require('../services/email');
const { generateContactLink } = require('../services/whatsapp');
const { logMessage } = require('../db/logger');
const { validateContact } = require('../middleware/validate');
const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// POST /api/contact — send contact form via email
router.post('/', formLimiter, validateContact, async (req, res) => {
  const { name, email, subject, message } = req.validated;

  try {
    await sendContactEmail({ name, email, subject, message });
    logMessage({ type: 'contact', channel: 'email', senderName: name, senderEmail: email, status: 'sent' });
    return res.json({ success: true, message: 'Your message has been sent. We will respond within 24 hours.' });
  } catch (err) {
    console.error('[Contact] Email failed:', err.message);
    logMessage({ type: 'contact', channel: 'email', senderName: name, senderEmail: email, status: 'failed', errorDetail: err.message });
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again or contact us directly.' });
  }
});

// POST /api/contact/whatsapp — validate input and return a safe WhatsApp deep link
router.post('/whatsapp', formLimiter, validateContact, (req, res) => {
  const { name, email, subject, message } = req.validated;
  const url = generateContactLink({ name, email, subject, message });
  logMessage({ type: 'contact', channel: 'whatsapp', senderName: name, senderEmail: email, status: 'link_generated' });
  return res.json({ success: true, url });
});

module.exports = router;
