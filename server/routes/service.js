const express = require('express');
const { sendServiceEmail } = require('../services/email');
const { generateServiceLink } = require('../services/whatsapp');
const { logMessage } = require('../db/logger');
const { log, logError } = require('../middleware/requestLogger');
const { validateService } = require('../middleware/validate');
const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// POST /api/service — service engineer booking via email
router.post('/', formLimiter, validateService, async (req, res) => {
  const { name, phone, email, equipment, issue } = req.validated;

  try {
    await sendServiceEmail({ name, phone, email, equipment, issue });
    logMessage({ type: 'service', channel: 'email', senderName: name, senderPhone: phone, senderEmail: email || null, status: 'sent' });
    return res.json({ success: true, message: 'Booking received. Our service team will call you within 24 hours.' });
  } catch (err) {
    logError('Service', 'Email failed:', err.message);
    logMessage({ type: 'service', channel: 'email', senderName: name, senderPhone: phone, status: 'failed', errorDetail: err.message });
    return res.status(500).json({ success: false, message: 'Failed to submit booking. Please call us directly at +91 87340 13927.' });
  }
});

// POST /api/service/whatsapp — return a validated WhatsApp deep link
router.post('/whatsapp', formLimiter, validateService, (req, res) => {
  const { name, phone, email, equipment, issue } = req.validated;
  const url = generateServiceLink({ name, phone, email, equipment, issue });
  log('Service', `WhatsApp link generated for ${name}`);
  logMessage({ type: 'service', channel: 'whatsapp', senderName: name, senderPhone: phone, status: 'link_generated' });
  return res.json({ success: true, url });
});

module.exports = router;
