const express = require('express');
const multer = require('multer');
const { sendCareerEmail } = require('../services/email');
const { logMessage } = require('../db/logger');
const { validateCareer } = require('../middleware/validate');
const { uploadLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Memory storage: file stays in RAM, attached to email, never written to disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter(_req, file, cb) {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Only PDF or Word documents are accepted.'));
  },
});

// POST /api/careers — career application with resume attachment
router.post('/', uploadLimiter, upload.single('resume'), validateCareer, async (req, res) => {
  const { name, email, phone, position, message } = req.validated;
  const { buffer, originalname, mimetype } = req.file;

  try {
    await sendCareerEmail({
      name, email, phone, position, message,
      resumeBuffer: buffer,
      resumeFilename: originalname,
      resumeMime: mimetype,
    });
    logMessage({ type: 'career', channel: 'email', senderName: name, senderEmail: email, status: 'sent' });
    return res.json({ success: true, message: 'Application received! We will review your resume and be in touch soon.' });
  } catch (err) {
    console.error('[Careers] Email failed:', err.message);
    logMessage({ type: 'career', channel: 'email', senderName: name, senderEmail: email, status: 'failed', errorDetail: err.message });
    return res.status(500).json({ success: false, message: `Failed to submit application. Please email your resume to ${process.env.BUSINESS_EMAIL || 'our careers team'}` });
  }
});

module.exports = router;
