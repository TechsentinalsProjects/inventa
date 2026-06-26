const express = require('express');
const { sendCallbackEmail } = require('../services/email');
const { logMessage } = require('../db/logger');
const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/', formLimiter, async (req, res) => {
  const name  = String(req.body.name  || '').replace(/[<>]/g, '').trim().slice(0, 100);
  const phone = String(req.body.phone || '').replace(/[<>]/g, '').trim().slice(0, 30);

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone are required.' });
  }

  try {
    await sendCallbackEmail({ name, phone });
    logMessage({ type: 'callback', channel: 'email', senderName: name, senderEmail: phone, status: 'sent' });
    return res.json({ success: true, message: 'Callback request received.' });
  } catch (err) {
    console.error('[Callback] Email failed:', err.message);
    logMessage({ type: 'callback', channel: 'email', senderName: name, senderEmail: phone, status: 'failed', errorDetail: err.message });
    return res.status(500).json({ success: false, message: 'Failed to submit request.' });
  }
});

module.exports = router;
