const nodemailer = require('nodemailer');

let _transporter = null;
function getTransporter() {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      tls: { rejectUnauthorized: false },
    });
  }
  return _transporter;
}

function esc(v) {
  return String(v || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// Formats a digits-only phone (e.g. "919313840714") as "+91 93138 40714" for display.
// Falls back to a plain "+<digits>" for numbers that don't match the 91 + 10-digit pattern.
function formatPhoneDisplay(digits) {
  const clean = String(digits || '').replace(/\D/g, '');
  const match = clean.match(/^91(\d{5})(\d{5})$/);
  return match ? `+91 ${match[1]} ${match[2]}` : `+${clean}`;
}

function formatIST() {
  const now = new Date();
  const date = now.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'long', year: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });
  return `${date} · ${time} IST`;
}

// ── Brand palette (matches site: #5DAE7B green, #0A0A0A dark) ─────────────────
const LOGO     = 'https://www.inventasystems.in/image.png';
const GREEN    = '#5DAE7B';
const GREEN_D  = '#4A9A68';
const GREEN_DD = '#3D8A5A';
const DARK     = '#0A0A0A';
const DARK2    = '#141414';
const BODY_BG  = '#F4F6F4';
const WHITE    = '#FFFFFF';
const TEXT     = '#1A1A1A';
const TEXT_2   = '#555555';
const TEXT_3   = '#888888';
const BORDER   = '#E8EDE8';

const TIER_COLORS = { Premium: '#9333EA', Advanced: '#2563EB', Standard: '#5DAE7B' };

function tierBadge(tier) {
  if (!tier) return '';
  const bg = TIER_COLORS[tier] || '#666';
  return `<span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.8px;color:#fff;background:${bg};text-transform:uppercase;vertical-align:middle;">${esc(tier)}</span>`;
}

// ── Shared layout ─────────────────────────────────────────────────────────────
function emailHeader(label, title) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${DARK};">
    <tr>
      <td style="padding:28px 36px 0;">
        <img src="${LOGO}" alt="Inventa Systems" height="38"
             style="display:block;max-height:38px;width:auto;"
             onerror="this.style.display='none'">
      </td>
    </tr>
    <tr>
      <td style="padding:18px 36px 0;">
        <div style="display:inline-block;padding:4px 14px;background:rgba(93,174,123,.15);border:1px solid rgba(93,174,123,.35);border-radius:20px;">
          <span style="font-size:11px;font-weight:600;letter-spacing:1.5px;color:${GREEN};text-transform:uppercase;">${esc(label)}</span>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 36px 30px;">
        <h1 style="margin:0;font-size:23px;font-weight:700;color:#FFFFFF;line-height:1.3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">${esc(title)}</h1>
      </td>
    </tr>
    <tr>
      <td style="height:3px;background:linear-gradient(90deg,${GREEN} 0%,${GREEN_D} 50%,${GREEN_DD} 100%);padding:0;font-size:0;line-height:0;">&#8203;</td>
    </tr>
  </table>`;
}

function emailFooter() {
  const yr = new Date().getFullYear();
  const contactEmail = process.env.BUSINESS_EMAIL;
  const contactPhoneDigits = process.env.WHATSAPP_PHONE;
  const contactPhoneDisplay = formatPhoneDisplay(contactPhoneDigits);
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${DARK2};">
    <tr>
      <td style="padding:26px 36px 10px;text-align:center;">
        <img src="${LOGO}" alt="Inventa Systems" height="30"
             style="display:block;margin:0 auto 14px;height:30px;width:auto;opacity:.7;"
             onerror="this.style.display='none'">
        <p style="margin:0 0 3px;font-size:13px;font-weight:600;color:#CCCCCC;font-family:Arial,sans-serif;">Inventa Systems</p>
        <p style="margin:0 0 3px;font-size:11px;color:#555;font-family:Arial,sans-serif;">907, The Empire, Sarkhej - Gandhinagar Hwy, beside Audi Showroom, near Gujarat High court, Vishwas City 1, Sola, Ahmedabad, Gujarat 380061</p>
        <p style="margin:0 0 0;font-size:11px;font-family:Arial,sans-serif;">
          <a href="mailto:${contactEmail}" style="color:${GREEN};text-decoration:none;">${contactEmail}</a>
          <span style="color:#333;">&nbsp;·&nbsp;</span>
          <a href="tel:+${contactPhoneDigits}" style="color:${GREEN};text-decoration:none;">${contactPhoneDisplay}</a>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 36px 20px;text-align:center;border-top:1px solid #1C1C1C;">
        <p style="margin:0 0 5px;font-size:10px;color:#3A3A3A;font-family:Arial,sans-serif;">© ${yr} Inventa Systems. All Rights Reserved.</p>
        <p style="margin:0;font-size:10px;font-family:Arial,sans-serif;">
          <span style="color:#2E2E2E;">Developed by&nbsp;</span><a href="https://techsentinals.in/" style="color:#555;text-decoration:underline;text-underline-offset:2px;">Techsentinals LLP</a>
        </p>
      </td>
    </tr>
  </table>`;
}

function emailWrapper(headerHtml, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Inventa Systems</title>
</head>
<body style="margin:0;padding:0;background:${BODY_BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BODY_BG};padding:32px 16px;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.13);">
        <tr><td style="border-radius:12px 12px 0 0;overflow:hidden;">${headerHtml}</td></tr>
        <tr><td style="background:${WHITE};padding:32px 36px;">${bodyHtml}</td></tr>
        <tr><td style="border-radius:0 0 12px 12px;overflow:hidden;">${emailFooter()}</td></tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function infoRow(label, value) {
  return `<tr>
    <td style="padding:11px 16px 11px 0;color:${TEXT_3};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;width:120px;vertical-align:top;white-space:nowrap;border-bottom:1px solid ${BORDER};">${esc(label)}</td>
    <td style="padding:11px 0;font-size:14px;color:${TEXT};border-bottom:1px solid ${BORDER};">${value}</td>
  </tr>`;
}
function infoTable(rows) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:26px;border-top:1px solid ${BORDER};">${rows.join('')}</table>`;
}

function sectionLabel(text) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px;">
    <tr>
      <td style="width:3px;background:${GREEN};border-radius:2px;vertical-align:middle;">&nbsp;</td>
      <td style="padding-left:10px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${GREEN};">${esc(text)}</td>
    </tr>
  </table>`;
}

function messageBubble(text) {
  return `<div style="padding:18px 20px;background:${BODY_BG};border-radius:8px;border-left:3px solid ${GREEN};margin-bottom:4px;">
    <p style="margin:0;font-size:14px;color:${TEXT};line-height:1.85;">${esc(text).replace(/\n/g,'<br>')}</p>
  </div>`;
}

// ── Product card ──────────────────────────────────────────────────────────────
function productCard(item, idx) {
  const features = (item.keyFeatures || []).slice(0, 3);
  const specs    = Object.entries(item.keySpecs || {}).slice(0, 3);

  const featureRows = features.map(f =>
    `<tr><td style="padding:3px 0;font-size:12px;color:${TEXT_2};">
      <span style="color:${GREEN};font-weight:800;margin-right:7px;">✓</span>${esc(f)}
    </td></tr>`
  ).join('');

  const specRows = specs.map(([k, v]) =>
    `<tr>
      <td style="font-size:11px;color:${TEXT_3};padding:2px 12px 2px 0;width:40%;font-weight:600;">${esc(k)}</td>
      <td style="font-size:11px;color:${TEXT};">${esc(v)}</td>
    </tr>`
  ).join('');

  const unverified = !item.verified
    ? `<span style="font-size:10px;color:#D97706;font-weight:700;margin-left:10px;">⚠ Not in catalogue</span>`
    : '';

  return `
  <tr>
    <td style="padding-bottom:10px;">
      <table width="100%" cellpadding="0" cellspacing="0"
             style="background:${BODY_BG};border-radius:10px;border:1px solid ${BORDER};overflow:hidden;">
        <!-- Header row -->
        <tr style="background:${WHITE};">
          <td style="padding:13px 16px;border-bottom:1px solid ${BORDER};">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;">
                  <span style="display:inline-block;width:24px;height:24px;background:${GREEN};border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:800;color:#fff;margin-right:10px;vertical-align:middle;">${idx+1}</span>
                  <strong style="font-size:15px;color:${TEXT};vertical-align:middle;">${esc(item.name)}</strong>
                  ${unverified}
                </td>
                <td style="text-align:right;vertical-align:middle;padding-left:12px;white-space:nowrap;">
                  <div style="display:inline-block;background:${GREEN};color:#fff;border-radius:8px;padding:7px 14px;text-align:center;">
                    <div style="font-size:18px;font-weight:900;line-height:1;">${item.quantity}</div>
                    <div style="font-size:9px;opacity:.8;letter-spacing:.5px;margin-top:1px;">UNIT${item.quantity>1?'S':''}</div>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Details row -->
        <tr>
          <td style="padding:12px 16px 14px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:12px;color:${TEXT_3};padding-bottom:${features.length?'10px':'0'};">
                  ${esc(item.categoryTitle||'General Product')}
                  ${item.tier ? `&nbsp;&nbsp;${tierBadge(item.tier)}` : ''}
                  ${item.tagline ? `<br><em style="font-size:11px;color:${TEXT_3};font-style:italic;">${esc(item.tagline)}</em>` : ''}
                </td>
              </tr>
              ${featureRows ? `<tr><td><table width="100%" cellpadding="0" cellspacing="0">${featureRows}</table></td></tr>` : ''}
              ${specRows ? `<tr><td style="padding-top:10px;border-top:1px solid ${BORDER};margin-top:8px;"><table width="100%" cellpadding="0" cellspacing="0">${specRows}</table></td></tr>` : ''}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Public send functions
// ─────────────────────────────────────────────────────────────────────────────

async function sendContactEmail({ name, email, subject, message }) {
  const body = `
    ${sectionLabel('Contact Details')}
    ${infoTable([
      infoRow('Name',    esc(name)),
      infoRow('Email',   `<a href="mailto:${esc(email)}" style="color:${GREEN};text-decoration:none;">${esc(email)}</a>`),
      infoRow('Subject', esc(subject || 'General Inquiry')),
    ])}
    ${sectionLabel('Message')}
    ${messageBubble(message)}`;

  await getTransporter().sendMail({
    from:    process.env.SMTP_FROM,
    to:      process.env.BUSINESS_EMAIL,
    subject: `[Contact] ${subject || 'General Inquiry'} — ${name}`,
    html:    emailWrapper(emailHeader('Contact Enquiry', subject || 'New Contact Form Submission'), body),
    text:    `From: ${name} <${email}>\nSubject: ${subject || 'General Inquiry'}\n\n${message}`,
  });
}

async function sendQuoteEmail({ name, phone, company, enrichedCart }) {
  const totalUnits = enrichedCart.reduce((s, i) => s + i.quantity, 0);

  const statBar = `
  <table width="100%" cellpadding="0" cellspacing="0"
         style="margin-bottom:20px;background:${BODY_BG};border-radius:10px;border:1px solid ${BORDER};">
    <tr>
      <td style="padding:16px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="text-align:center;padding-right:16px;border-right:1px solid ${BORDER};">
              <div style="font-size:26px;font-weight:900;color:${GREEN};line-height:1;">${enrichedCart.length}</div>
              <div style="font-size:10px;color:${TEXT_3};font-weight:600;letter-spacing:.5px;text-transform:uppercase;margin-top:2px;">Products</div>
            </td>
            <td style="text-align:center;padding:0 16px;border-right:1px solid ${BORDER};">
              <div style="font-size:26px;font-weight:900;color:${TEXT};line-height:1;">${totalUnits}</div>
              <div style="font-size:10px;color:${TEXT_3};font-weight:600;letter-spacing:.5px;text-transform:uppercase;margin-top:2px;">Total Units</div>
            </td>
            ${company ? `<td style="text-align:center;padding-left:16px;">
              <div style="font-size:16px;font-weight:700;color:${TEXT};line-height:1;">${esc(company)}</div>
              <div style="font-size:10px;color:${TEXT_3};font-weight:600;letter-spacing:.5px;text-transform:uppercase;margin-top:2px;">Company</div>
            </td>` : ''}
          </tr>
        </table>
      </td>
    </tr>
  </table>`;

  const body = `
    ${sectionLabel('Client Details')}
    ${infoTable([
      infoRow('Name',  esc(name)),
      infoRow('Phone', esc(phone)),
      ...(company ? [infoRow('Company', esc(company))] : []),
    ])}
    ${sectionLabel(`Products Requested — ${enrichedCart.length} item${enrichedCart.length>1?'s':''}`)}
    ${statBar}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${enrichedCart.map((item, i) => productCard(item, i)).join('')}
    </table>`;

  const textItems = enrichedCart.map((item, i) =>
    `${i+1}. ${item.name} (${item.categoryTitle||'General'}) × ${item.quantity}`
  ).join('\n');

  await getTransporter().sendMail({
    from:    process.env.SMTP_FROM,
    to:      process.env.BUSINESS_EMAIL,
    subject: `[Quote Request] ${name} — ${enrichedCart.length} product(s), ${totalUnits} unit(s)`,
    html:    emailWrapper(emailHeader('Quote Request', `Quote from ${name}`), body),
    text:    `Quote Request\nClient: ${name}\nPhone: ${phone}\nCompany: ${company||'N/A'}\n\nProducts:\n${textItems}\n\nTotal: ${totalUnits} units`,
  });
}

async function sendEnquiryEmail({ name, email, context, message }) {
  const body = `
    ${sectionLabel('Enquiry Details')}
    ${infoTable([
      infoRow('Name',    esc(name)),
      infoRow('Email',   `<a href="mailto:${esc(email)}" style="color:${GREEN};text-decoration:none;">${esc(email)}</a>`),
      infoRow('Product', `<strong style="color:${GREEN};">${esc(context)}</strong>`),
    ])}
    ${message ? `${sectionLabel('Message')}${messageBubble(message)}` : ''}`;

  await getTransporter().sendMail({
    from:    process.env.SMTP_FROM,
    to:      process.env.BUSINESS_EMAIL,
    subject: `[Enquiry] ${context} — ${name}`,
    html:    emailWrapper(emailHeader('Product Enquiry', context), body),
    text:    `Enquiry\nFrom: ${name} <${email}>\nProduct/Application: ${context}\n\n${message||''}`,
  });
}

async function sendServiceEmail({ name, phone, email, equipment, issue }) {
  const body = `
    ${sectionLabel('Customer Details')}
    ${infoTable([
      infoRow('Name',      esc(name)),
      infoRow('Phone',     esc(phone)),
      ...(email ? [infoRow('Email', `<a href="mailto:${esc(email)}" style="color:${GREEN};text-decoration:none;">${esc(email)}</a>`)] : []),
      infoRow('Equipment', esc(equipment||'Not specified')),
      infoRow('Issue',     `<span style="white-space:pre-line;">${esc(issue||'Not specified')}</span>`),
    ])}
    <table width="100%" cellpadding="0" cellspacing="0"
           style="background:#FFFBEB;border-radius:8px;border:1px solid #FDE68A;">
      <tr>
        <td style="padding:14px 18px;font-size:13px;color:#92400E;font-family:Arial,sans-serif;">
          <strong>⚡ Action required:</strong>&nbsp;Call this customer within 24 hours to schedule a service visit.
        </td>
      </tr>
    </table>`;

  await getTransporter().sendMail({
    from:    process.env.SMTP_FROM,
    to:      process.env.BUSINESS_EMAIL,
    subject: `[Service Booking] ${equipment||'Lab Equipment'} — ${name}`,
    html:    emailWrapper(emailHeader('Service Request', `Service Booking: ${equipment||'Equipment'}`), body),
    text:    `Service Booking\nCustomer: ${name}\nPhone: ${phone}\nEmail: ${email||'N/A'}\nEquipment: ${equipment||'N/A'}\nIssue: ${issue||'N/A'}`,
  });
}

async function sendCareerEmail({ name, email, phone, position, message, resumeBuffer, resumeFilename, resumeMime }) {
  const body = `
    ${sectionLabel('Applicant Details')}
    ${infoTable([
      infoRow('Name',     esc(name)),
      infoRow('Email',    `<a href="mailto:${esc(email)}" style="color:${GREEN};text-decoration:none;">${esc(email)}</a>`),
      infoRow('Phone',    esc(phone||'Not provided')),
      infoRow('Position', esc(position||'Open Application')),
    ])}
    ${message ? `${sectionLabel('Cover Letter')}${messageBubble(message)}` : ''}
    <table width="100%" cellpadding="0" cellspacing="0"
           style="background:#F0FDF4;border-radius:8px;border:1px solid #BBF7D0;margin-top:20px;">
      <tr>
        <td style="padding:14px 18px;font-size:13px;color:#14532D;font-family:Arial,sans-serif;">
          <strong>📎 Resume attached:</strong>&nbsp;${esc(resumeFilename)}
        </td>
      </tr>
    </table>`;

  await getTransporter().sendMail({
    from:        process.env.SMTP_FROM,
    to:          process.env.BUSINESS_EMAIL,
    subject:     `[Career Application] ${position||'Open Application'} — ${name}`,
    html:        emailWrapper(emailHeader('Career Application', `${position||'Open Application'} — ${name}`), body),
    text:        `Career Application\nName: ${name}\nEmail: ${email}\nPhone: ${phone||'N/A'}\nPosition: ${position||'Open Application'}\n\nCover Letter:\n${message||'N/A'}\n\nResume: ${resumeFilename} (attached)`,
    attachments: [{ filename: resumeFilename, content: resumeBuffer, contentType: resumeMime }],
  });
}

async function sendCallbackEmail({ name, phone }) {
  const body = `
    ${sectionLabel('Callback Request')}
    ${infoTable([
      infoRow('Name',  esc(name)),
      infoRow('Phone', `<a href="tel:${esc(phone.replace(/\s/g,''))}" style="color:${GREEN};text-decoration:none;font-size:18px;font-weight:700;">${esc(phone)}</a>`),
      infoRow('Time',  formatIST()),
      infoRow('Source','Inventa Assistant (Chatbot)'),
    ])}
    <table width="100%" cellpadding="0" cellspacing="0"
           style="background:#FFFBEB;border-radius:8px;border:1px solid #FDE68A;margin-top:8px;">
      <tr>
        <td style="padding:14px 18px;font-size:13px;color:#92400E;font-family:Arial,sans-serif;">
          <strong>⚡ Action required:</strong>&nbsp;Call this customer at <strong>${esc(phone)}</strong> during working hours (Mon–Sat, 11 AM – 7 PM IST).
        </td>
      </tr>
    </table>`;

  await getTransporter().sendMail({
    from:    process.env.SMTP_FROM,
    to:      process.env.BUSINESS_EMAIL,
    subject: `[Callback Request] ${name} — ${phone}`,
    html:    emailWrapper(emailHeader('Callback Request', `Call back: ${name}`), body),
    text:    `Callback Request via Chatbot\nName: ${name}\nPhone: ${phone}\nTime: ${formatIST()}\n\nPlease call this customer during business hours.`,
  });
}

module.exports = { sendContactEmail, sendQuoteEmail, sendEnquiryEmail, sendServiceEmail, sendCareerEmail, sendCallbackEmail };
