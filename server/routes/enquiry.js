const express = require('express');
const { sendEnquiryEmail } = require('../services/email');
const { generateEnquiryLink } = require('../services/whatsapp');
const { logMessage } = require('../db/logger');
const { log, logError } = require('../middleware/requestLogger');
const { validateEnquiry } = require('../middleware/validate');
const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// POST /api/enquiry — product or application enquiry via email
router.post('/', formLimiter, validateEnquiry, async (req, res) => {
  const { name, email, context, message } = req.validated;

  try {
    await sendEnquiryEmail({ name, email, context, message });
    logMessage({ type: 'enquiry', channel: 'email', senderName: name, senderEmail: email, status: 'sent' });
    return res.json({ success: true, message: 'Your enquiry has been sent. We will respond within 24 hours.' });
  } catch (err) {
    logError('Enquiry', 'Email failed:', err.message);
    logMessage({ type: 'enquiry', channel: 'email', senderName: name, senderEmail: email, status: 'failed', errorDetail: err.message });
    return res.status(500).json({ success: false, message: 'Failed to send your enquiry. Please try again or contact us directly.' });
  }
});

// POST /api/enquiry/whatsapp — return a validated WhatsApp deep link
router.post('/whatsapp', formLimiter, validateEnquiry, (req, res) => {
  const { name, email, context, message } = req.validated;
  const url = generateEnquiryLink({ name, email, context, message });
  log('Enquiry', `WhatsApp link generated for ${name}`);
  logMessage({ type: 'enquiry', channel: 'whatsapp', senderName: name, senderEmail: email, status: 'link_generated' });
  return res.json({ success: true, url });
});

module.exports = router;
