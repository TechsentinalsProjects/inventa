const validator = require('validator');

function sanitizeStr(value, maxLen) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

/**
 * Validates and sanitizes contact form input.
 * Attaches cleaned data to req.validated on success.
 */
function validateContact(req, res, next) {
  // Reject unknown top-level keys
  const allowed = new Set(['name', 'email', 'subject', 'message']);
  const unknown = Object.keys(req.body).filter(k => !allowed.has(k));
  if (unknown.length > 0) {
    return res.status(400).json({ success: false, message: `Unknown fields: ${unknown.join(', ')}` });
  }

  const errors = [];

  const name = sanitizeStr(req.body.name, 100);
  if (!name) errors.push('Name is required.');

  const email = sanitizeStr(req.body.email, 254);
  if (!email || !validator.isEmail(email)) errors.push('A valid email address is required.');

  const message = sanitizeStr(req.body.message, 5000);
  if (!message || message.length < 10) errors.push('Message must be at least 10 characters.');

  const subject = sanitizeStr(req.body.subject, 200);

  if (errors.length > 0) return res.status(400).json({ success: false, errors });

  req.validated = { name, email, subject, message };
  next();
}

/**
 * Validates and sanitizes quote request input.
 * Attaches cleaned data to req.validated on success.
 */
function validateQuote(req, res, next) {
  // Reject unknown top-level keys
  const allowed = new Set(['name', 'phone', 'company', 'cart']);
  const unknown = Object.keys(req.body).filter(k => !allowed.has(k));
  if (unknown.length > 0) {
    return res.status(400).json({ success: false, message: `Unknown fields: ${unknown.join(', ')}` });
  }

  const errors = [];

  const name = sanitizeStr(req.body.name, 100);
  if (!name) errors.push('Name is required.');

  // Strip non-digits, then validate length
  const phone = sanitizeStr(req.body.phone, 20).replace(/\D/g, '');
  if (!phone || phone.length < 10) errors.push('A valid phone number (min 10 digits) is required.');

  const company = sanitizeStr(req.body.company, 200);

  const { cart } = req.body;
  if (!Array.isArray(cart) || cart.length === 0) {
    errors.push('Cart must be a non-empty array.');
  } else if (cart.length > 50) {
    errors.push('Cart cannot exceed 50 items.');
  } else {
    for (const item of cart) {
      if (typeof item.name !== 'string' || !item.name.trim()) {
        errors.push('Each cart item must have a name.');
        break;
      }
      const qty = parseInt(item.quantity, 10);
      if (!Number.isInteger(qty) || qty < 1 || qty > 999) {
        errors.push('Each cart item quantity must be between 1 and 999.');
        break;
      }
    }
  }

  if (errors.length > 0) return res.status(400).json({ success: false, errors });

  const cleanCart = cart.map(item => ({
    name: sanitizeStr(item.name, 200),
    quantity: parseInt(item.quantity, 10),
  }));

  req.validated = { name, phone, company, cart: cleanCart };
  next();
}

function validateEnquiry(req, res, next) {
  const allowed = new Set(['name', 'email', 'context', 'message']);
  const unknown = Object.keys(req.body).filter(k => !allowed.has(k));
  if (unknown.length > 0) {
    return res.status(400).json({ success: false, message: `Unknown fields: ${unknown.join(', ')}` });
  }

  const errors = [];
  const name = sanitizeStr(req.body.name, 100);
  if (!name) errors.push('Name is required.');

  const email = sanitizeStr(req.body.email, 254);
  if (!email || !validator.isEmail(email)) errors.push('A valid email address is required.');

  const context = sanitizeStr(req.body.context, 300);
  if (!context) errors.push('Context (product or application name) is required.');

  const message = sanitizeStr(req.body.message, 5000);

  if (errors.length > 0) return res.status(400).json({ success: false, errors });
  req.validated = { name, email, context, message };
  next();
}

function validateService(req, res, next) {
  const allowed = new Set(['name', 'phone', 'email', 'equipment', 'issue']);
  const unknown = Object.keys(req.body).filter(k => !allowed.has(k));
  if (unknown.length > 0) {
    return res.status(400).json({ success: false, message: `Unknown fields: ${unknown.join(', ')}` });
  }

  const errors = [];
  const name = sanitizeStr(req.body.name, 100);
  if (!name) errors.push('Name is required.');

  const phone = sanitizeStr(req.body.phone, 20).replace(/\D/g, '');
  if (!phone || phone.length < 10) errors.push('A valid phone number (min 10 digits) is required.');

  const email = sanitizeStr(req.body.email, 254);
  if (email && !validator.isEmail(email)) errors.push('Email address format is invalid.');

  const equipment = sanitizeStr(req.body.equipment, 200);
  const issue = sanitizeStr(req.body.issue, 2000);

  if (errors.length > 0) return res.status(400).json({ success: false, errors });
  req.validated = { name, phone, email, equipment, issue };
  next();
}

function validateCareer(req, res, next) {
  const errors = [];
  const name = sanitizeStr(req.body.name, 100);
  if (!name) errors.push('Name is required.');

  const email = sanitizeStr(req.body.email, 254);
  if (!email || !validator.isEmail(email)) errors.push('A valid email address is required.');

  const phone = sanitizeStr(req.body.phone, 20);
  const position = sanitizeStr(req.body.position, 200);
  const message = sanitizeStr(req.body.message, 5000);

  if (!req.file) {
    errors.push('Resume file is required.');
  } else {
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(req.file.mimetype)) {
      errors.push('Resume must be a PDF or Word document (.pdf, .doc, .docx).');
    }
    if (req.file.size > 5 * 1024 * 1024) {
      errors.push('Resume file must be under 5 MB.');
    }
  }

  if (errors.length > 0) return res.status(400).json({ success: false, errors });
  req.validated = { name, email, phone, position, message };
  next();
}

module.exports = { validateContact, validateQuote, validateEnquiry, validateService, validateCareer };
