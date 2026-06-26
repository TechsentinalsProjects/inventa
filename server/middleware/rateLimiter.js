const rateLimit = require('express-rate-limit');

const defaults = {
  standardHeaders: true,
  legacyHeaders:   false,
  // With app.set('trust proxy', 1), this correctly extracts the real client IP
  // even when running behind Nginx
  keyGenerator: (req) => req.ip,
};

/** All API routes — broad flood protection */
const generalLimiter = rateLimit({
  ...defaults,
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

/** Form endpoints (contact, quote, enquiry, service, callback) — anti-spam */
const formLimiter = rateLimit({
  ...defaults,
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many submissions. Please try again in 15 minutes.' },
});

/** Career / file-upload endpoint — extra strict (3 per hour per IP) */
const uploadLimiter = rateLimit({
  ...defaults,
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: { success: false, message: 'Too many application submissions. Please try again in an hour.' },
});

/** Health check endpoint — light, but still bounded */
const healthLimiter = rateLimit({
  ...defaults,
  windowMs: 60 * 1000, // 1 min
  max: 30,
  message: { success: false, message: 'Too many health check requests.' },
});

module.exports = { generalLimiter, formLimiter, uploadLimiter, healthLimiter };
