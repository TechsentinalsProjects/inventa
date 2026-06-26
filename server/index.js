require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { generalLimiter, healthLimiter } = require('./middleware/rateLimiter');
const { requestLogger, log, logError } = require('./middleware/requestLogger');
const contactRoutes = require('./routes/contact');
const quoteRoutes = require('./routes/quote');
const enquiryRoutes = require('./routes/enquiry');
const serviceRoutes = require('./routes/service');
const careersRoutes  = require('./routes/careers');
const callbackRoutes = require('./routes/callback');

// Initialise DB (seeds product catalog on first run)
require('./db/products');

const app = express();
const PORT = process.env.PORT || 3001;

// Trust the first proxy (Nginx) so express-rate-limit reads the real client IP
// from X-Forwarded-For instead of 127.0.0.1
app.set('trust proxy', 1);

// Colored request log — must be first middleware
app.use(requestLogger);

// Security headers — tuned for a pure JSON API served behind Nginx
app.use(helmet({
  // API returns JSON; CSP is not meaningful here (HTML is served by Nginx)
  contentSecurityPolicy: false,
  // Prevents COEP issues when the API is called cross-origin from the SPA
  crossOriginEmbedderPolicy: false,
  // HSTS is enforced by Nginx for the full site; keep it on here for direct API access too
  strictTransportSecurity: {
    maxAge: 31536000,
    includeSubDomains: true,
  },
  // Hide "X-Powered-By: Express"
  hidePoweredBy: true,
  // Prevent MIME sniffing on API responses
  noSniff: true,
  // Disallow embedding this API in iframes
  frameguard: { action: 'deny' },
  // Disable legacy XSS filter (modern browsers ignore it, old ones may misuse it)
  xssFilter: false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

// CORS — only allow configured frontend origins
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5000')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('CORS: origin not allowed'));
  },
  methods: ['GET', 'POST'],
  credentials: false,
}));

// Body parsing — cap at 50 KB to prevent payload attacks
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: false, limit: '50kb' }));

// General rate limiting applied to all routes
app.use(generalLimiter);

// Health check
app.get('/api/health', healthLimiter, (_req, res) => res.json({ status: 'ok' }));

// API routes
app.use('/api/contact', contactRoutes);
app.use('/api/quote', quoteRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/careers',  careersRoutes);
app.use('/api/callback', callbackRoutes);

// 404
app.use((_req, res) => res.status(404).json({ success: false, message: 'Not found' }));

// Global error handler — never expose internal details
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  logError('Server', err.message);
  res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
});

app.listen(PORT, () => {
  log('Server', `Listening on port ${PORT}  (${process.env.NODE_ENV || 'development'})`);
  log('Routes', '/api/contact  /api/quote  /api/enquiry  /api/service  /api/careers  /api/callback');
  log('CORS', allowedOrigins.join(', '));
});
