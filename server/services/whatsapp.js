/**
 * WhatsApp deep-link generator.
 * Phone numbers and message templates live here — frontend only receives a validated wa.me URL.
 */

/** Strip +, -, spaces from env value — wa.me only accepts digits. */
function getPhone() {
  return (process.env.WHATSAPP_PHONE || '').replace(/[\s+\-]/g, '');
}

/** Strip HTML-like characters and cap length to prevent injection. */
function sanitize(val, maxLen = 500) {
  return String(val || '').replace(/[<>]/g, '').trim().slice(0, maxLen);
}

function buildUrl(text) {
  return `https://wa.me/${getPhone()}?text=${encodeURIComponent(text)}`;
}

// ── Message builders ──────────────────────────────────────────────────────────

function generateContactLink({ name, email, subject, message }) {
  const lines = [
    '*Inventa Systems — Contact Enquiry*',
    '--------------------------------',
    '',
    `*Name:* ${sanitize(name, 100)}`,
    `*Email:* ${sanitize(email, 254)}`,
    subject ? `*Subject:* ${sanitize(subject, 200)}` : null,
    '',
    '*Message:*',
    sanitize(message, 2000),
    '',
    '--------------------------------',
    '_Sent via inventasystems.in_',
  ].filter(l => l !== null);

  return buildUrl(lines.join('\n'));
}

function generateQuoteLink({ name, phone, company, cart }) {
  const totalUnits = cart.reduce((s, i) => s + i.quantity, 0);

  const itemsList = cart.map((item, idx) => {
    const category = item.categoryTitle || item.category || 'General Product';
    const tier = item.tier ? ` [${item.tier}]` : '';
    return `  ${idx + 1}. ${sanitize(item.name, 200)} (${sanitize(category, 100)}${tier}) x ${item.quantity}`;
  }).join('\n');

  const lines = [
    '*Inventa Systems — Quote Request*',
    '--------------------------------',
    '',
    `*Name:* ${sanitize(name, 100)}`,
    `*Phone:* ${sanitize(phone, 20)}`,
    company ? `*Company:* ${sanitize(company, 200)}` : null,
    '',
    `*Products Requested (${cart.length} item${cart.length !== 1 ? 's' : ''}):*`,
    itemsList,
    '',
    `*Total Units:* ${totalUnits}`,
    '',
    '--------------------------------',
    '_Sent via inventasystems.in_',
  ].filter(l => l !== null);

  return buildUrl(lines.join('\n'));
}

function generateEnquiryLink({ name, email, context, message }) {
  const lines = [
    '*Inventa Systems — Product Enquiry*',
    '--------------------------------',
    '',
    `*Name:* ${sanitize(name, 100)}`,
    `*Email:* ${sanitize(email, 254)}`,
    `*Product / Application:* ${sanitize(context, 300)}`,
    message ? '' : null,
    message ? '*Message:*' : null,
    message ? sanitize(message, 2000) : null,
    '',
    '--------------------------------',
    '_Sent via inventasystems.in_',
  ].filter(l => l !== null);

  return buildUrl(lines.join('\n'));
}

function generateServiceLink({ name, phone, email, equipment, issue }) {
  const lines = [
    '*Inventa Systems — Service Booking*',
    '--------------------------------',
    '',
    `*Name:* ${sanitize(name, 100)}`,
    `*Phone:* ${sanitize(phone, 20)}`,
    email ? `*Email:* ${sanitize(email, 254)}` : null,
    `*Equipment:* ${sanitize(equipment || 'Not specified', 200)}`,
    '',
    '*Issue / Service Required:*',
    sanitize(issue || 'Not specified', 2000),
    '',
    '--------------------------------',
    '_Sent via inventasystems.in_',
  ].filter(l => l !== null);

  return buildUrl(lines.join('\n'));
}

module.exports = { generateContactLink, generateQuoteLink, generateEnquiryLink, generateServiceLink };
