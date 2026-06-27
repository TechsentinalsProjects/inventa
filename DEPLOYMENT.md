# Inventa Systems — Deployment & Operations Guide

Complete reference for anyone deploying, updating, or maintaining the Inventa Systems production server.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Server & Hosting Details](#2-server--hosting-details)
3. [Directory Structure](#3-directory-structure)
4. [Tech Stack](#4-tech-stack)
5. [Environment Variables](#5-environment-variables)
6. [API Routes Reference](#6-api-routes-reference)
7. [Email System](#7-email-system)
8. [WhatsApp Integration](#8-whatsapp-integration)
9. [Database](#9-database)
10. [Security Layers](#10-security-layers)
11. [First-Time Deployment](#11-first-time-deployment)
12. [Updating the Site (Day-to-Day)](#12-updating-the-site-day-to-day)
13. [SSL Certificate Setup](#13-ssl-certificate-setup)
14. [Backups](#14-backups)
15. [Common Server Commands](#15-common-server-commands)
16. [Logs](#16-logs)
17. [Troubleshooting](#17-troubleshooting)

---

## 1. Architecture Overview

```
Browser
  │
  ▼
Nginx (port 80 / 443)
  ├── /             → serves /var/www/inventa/dist/  (React SPA, static files)
  └── /api/*        → proxies to localhost:3001       (Node.js Express API)
                                  │
                          PM2 process manager
                                  │
                          server/index.js (Express)
                          ├── /api/contact    → email + WhatsApp link
                          ├── /api/quote      → email + WhatsApp link
                          ├── /api/enquiry    → email + WhatsApp link
                          ├── /api/service    → email + WhatsApp link
                          ├── /api/careers    → email with resume attachment
                          ├── /api/callback   → email (chatbot callback)
                          └── /api/health     → { status: "ok" }
                                  │
                          server/data/inventa.db  (SQLite — submission logs)
```

**Key design decisions:**
- Nginx handles all HTTPS, static file serving, gzip, caching headers, and rate limiting. Node.js never sees raw internet traffic.
- The Node.js process runs on `localhost:3001` only — never exposed to the internet directly.
- All form submissions go out via SMTP (Hostinger domain email). The frontend never holds API keys or email credentials.
- SQLite logs every submission attempt (sent/failed) for audit purposes.

---

## 2. Server & Hosting Details

| Item | Value |
|---|---|
| Provider | Hostinger VPS (KVM2) |
| Server IP | `147.79.68.232` |
| OS | Ubuntu 22.04 / 24.04 LTS |
| SSH | `ssh root@147.79.68.232` |
| Domain | `www.inventasystems.in` |
| GitHub | `https://github.com/TechsentinalsProjects/inventa` |
| API health check | `https://www.inventasystems.in/api/health` |

---

## 3. Directory Structure

```
/var/www/inventa/                  ← Application root (APP_DIR)
├── src/                           ← React source (not used at runtime)
├── public/                        ← Static assets bundled into dist/
├── dist/                          ← Built frontend — Nginx serves this
│   ├── index.html
│   ├── assets/                    ← Hashed JS/CSS bundles (cache-busted)
│   └── *.png / *.webp             ← Images copied from public/
├── server/                        ← Node.js Express backend
│   ├── index.js                   ← Entry point (Express app)
│   ├── .env                       ← Secrets (chmod 600, never in git)
│   ├── data/
│   │   └── inventa.db             ← SQLite database (submission logs)
│   ├── routes/
│   │   ├── contact.js
│   │   ├── quote.js
│   │   ├── enquiry.js
│   │   ├── service.js
│   │   ├── careers.js
│   │   └── callback.js
│   ├── services/
│   │   ├── email.js               ← All email templates (Nodemailer)
│   │   └── whatsapp.js            ← WhatsApp deep-link builders
│   ├── middleware/
│   │   ├── rateLimiter.js         ← Per-route rate limits
│   │   ├── validate.js            ← Input validation (validator.js)
│   │   └── requestLogger.js       ← Coloured request logs
│   ├── db/
│   │   ├── logger.js              ← SQLite write helper
│   │   └── products.js            ← Product catalog seed/queries
│   └── node_modules/              ← Backend deps (production only)
├── deploy/
│   ├── setup.sh                   ← One-time server setup script
│   ├── update.sh                  ← Re-deploy after code changes
│   ├── enable-ssl.sh              ← Enable HTTPS (run after DNS is set)
│   └── backup.sh                  ← SQLite database backup
├── ecosystem.config.cjs           ← PM2 process config (auto-generated)
├── package.json                   ← Frontend deps + Vite build config
└── node_modules/                  ← Frontend/build deps (not in git)

/var/log/inventa/                  ← PM2 log output
├── combined.log
├── out.log
└── error.log

/var/backups/inventa/              ← Database backups (backup.sh)
└── inventa_YYYYMMDD_HHMMSS.db.gz

/etc/nginx/sites-available/inventa ← Nginx virtual host config
```

---

## 4. Tech Stack

### Frontend
| Tech | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool / dev server |
| React Router | 7 | Client-side routing (SPA) |
| Framer Motion | 12 | Animations |
| Lucide React | latest | Icons |
| Three.js / R3F | 0.18 / 10 | 3D elements |
| Geist Sans/Mono | — | Fonts |

### Backend
| Tech | Version | Purpose |
|---|---|---|
| Node.js | 22 LTS | Runtime |
| Express | 4 | HTTP framework |
| Nodemailer | — | SMTP email sending |
| Helmet | — | Security headers |
| CORS | — | Cross-origin policy |
| express-rate-limit | — | Rate limiting |
| validator.js | — | Input sanitisation |
| SQLite (node:sqlite) | built-in (Node 22+) | Submission logging |
| dotenv | — | Environment variables |
| Multer | — | Resume file uploads (careers) |

### Infrastructure
| Component | Tool |
|---|---|
| Process manager | PM2 |
| Reverse proxy | Nginx |
| Firewall | UFW |
| Brute-force protection | Fail2ban |
| SSL | Let's Encrypt (Certbot) |
| Log rotation | logrotate (14-day) |

---

## 5. Environment Variables

File location on server: `/var/www/inventa/server/.env`
Permissions: `600` (root-only read/write — never world-readable)

```env
# ── SMTP (Hostinger domain email) ─────────────────────────────────────────────
SMTP_HOST=mail.inventasystems.in
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=inventasite@inventasystems.in
SMTP_PASS=<password>
SMTP_FROM=Inventa Systems <inventasite@inventasystems.in>

# ── Business ───────────────────────────────────────────────────────────────────
BUSINESS_EMAIL=inquiry@inventasystems.in   # ← All form emails go HERE
WHATSAPP_PHONE=918734013927               # ← Digits only, no + or spaces

# ── Server ─────────────────────────────────────────────────────────────────────
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://www.inventasystems.in,https://inventasystems.in
```

### Changing the recipient email

To change which address receives all contact/quote/service/career emails:

```bash
nano /var/www/inventa/server/.env
# Edit: BUSINESS_EMAIL=new@yourdomain.com
# Save: Ctrl+O → Enter → Ctrl+X

pm2 restart inventa-api --update-env
```

### Changing the WhatsApp number

```bash
nano /var/www/inventa/server/.env
# Edit: WHATSAPP_PHONE=919876543210  (digits only, with country code)

pm2 restart inventa-api --update-env
```

---

## 6. API Routes Reference

Base URL: `https://www.inventasystems.in/api/`

| Method | Route | Form | Rate Limit | What it does |
|---|---|---|---|---|
| GET | `/api/health` | — | 30/min | Returns `{"status":"ok"}` — use to verify backend is alive |
| POST | `/api/contact` | Contact page form | 10/15min | Sends contact email to BUSINESS_EMAIL |
| POST | `/api/contact/whatsapp` | Contact page WhatsApp btn | 10/15min | Returns a `wa.me` deep-link URL |
| POST | `/api/quote` | Product cart quote | 10/15min | Sends quote request email with product list |
| POST | `/api/quote/whatsapp` | Cart WhatsApp btn | 10/15min | Returns WhatsApp link with cart details |
| POST | `/api/enquiry` | Product/application enquiry | 10/15min | Sends product enquiry email |
| POST | `/api/enquiry/whatsapp` | Enquiry WhatsApp btn | 10/15min | Returns WhatsApp link |
| POST | `/api/service` | Services booking form | 10/15min | Sends service booking email |
| POST | `/api/service/whatsapp` | Service WhatsApp btn | 10/15min | Returns WhatsApp link |
| POST | `/api/careers` | Careers application form | 3/hour | Sends application email with resume PDF attached |
| POST | `/api/callback` | Chatbot callback request | 10/15min | Sends callback request email |

**All POST routes:**
- Validate and sanitise every field (validator.js) — malformed input returns `400`
- Log the attempt to SQLite (`server/data/inventa.db`) regardless of success/failure
- Return `{ success: true, message: "..." }` on success or `{ success: false, message: "..." }` on failure

---

## 7. Email System

File: `server/services/email.js`

All emails are sent via **Nodemailer** using the Hostinger SMTP server. There are 6 email functions:

| Function | Triggered by | Subject format |
|---|---|---|
| `sendContactEmail` | Contact form | `[Contact] {subject} — {name}` |
| `sendQuoteEmail` | Product cart | `[Quote Request] {name} — N products` |
| `sendEnquiryEmail` | Product/app enquiry | `[Enquiry] {product} — {name}` |
| `sendServiceEmail` | Service booking | `[Service Booking] {equipment} — {name}` |
| `sendCareerEmail` | Careers form | `[Career Application] {position} — {name}` |
| `sendCallbackEmail` | Chatbot callback | `[Callback Request] {name} — {phone}` |

All emails:
- Are sent **from** `SMTP_FROM` (Hostinger mailbox)
- Are sent **to** `BUSINESS_EMAIL`
- Have no `replyTo` header — to reply to a sender, copy their email from the email body
- Use a branded HTML template (dark header, green gradient, Inventa logo)
- Include a plain-text fallback

**Logo in emails:** `https://www.inventasystems.in/image.png`

---

## 8. WhatsApp Integration

File: `server/services/whatsapp.js`

WhatsApp buttons on the frontend call `/api/*/whatsapp` endpoints. The server:
1. Validates the input
2. Builds a formatted WhatsApp message
3. Returns a `wa.me/{WHATSAPP_PHONE}?text=...` URL

The frontend then opens this URL in a new tab — the user's WhatsApp opens pre-filled with the message. **No WhatsApp API account or payment is required** — this uses the free `wa.me` deep-link approach.

---

## 9. Database

File: `server/data/inventa.db` (SQLite)

The database is used **only for logging** — it records every form submission attempt. It does not store any secrets or payment data.

**Table: `message_logs`**
```sql
id           INTEGER PRIMARY KEY AUTOINCREMENT
type         TEXT     -- 'contact' | 'quote' | 'enquiry' | 'service' | 'career' | 'callback'
channel      TEXT     -- 'email' | 'whatsapp'
sender_name  TEXT
sender_email TEXT
sender_phone TEXT
status       TEXT     -- 'sent' | 'failed' | 'link_generated'
error_detail TEXT     -- null on success, error message on failure
created_at   DATETIME -- UTC
```

**Viewing logs on the server:**
```bash
sqlite3 /var/www/inventa/server/data/inventa.db
.headers on
.mode column
SELECT * FROM message_logs ORDER BY created_at DESC LIMIT 20;
.quit
```

**Important:** The `.env` and `data/` directory are excluded from both git and the rsync in `update.sh` — they are never overwritten by deployments.

---

## 10. Security Layers

| Layer | Tool | Config |
|---|---|---|
| Firewall | UFW | Allow SSH (22), HTTP (80), HTTPS (443) only. Everything else blocked. |
| Brute-force | Fail2ban | SSH: 5 attempts → 1hr ban. Nginx bot scanning: 2 attempts → ban. |
| Rate limiting (Nginx) | `limit_req_zone` | API: 10 req/s. Site: 60 req/s. |
| Rate limiting (Node) | express-rate-limit | General: 100/15min. Forms: 10/15min. Careers: 3/hr. |
| Security headers | Helmet + Nginx | HSTS, X-Frame-Options, X-Content-Type, Referrer-Policy, etc. |
| Input validation | validator.js | All form fields validated and sanitised server-side. |
| CORS | express cors | Only `CORS_ORIGIN` values from `.env` are allowed. |
| Secrets | `.env` chmod 600 | SMTP password and business email never exposed to frontend or git. |
| Sensitive file blocking | Nginx | `.env`, `.git`, `package.json`, `ecosystem.config.*` return 404. |
| Body size limit | Express | JSON and URL-encoded bodies capped at 50 KB. Multipart (careers): 5 MB. |

---

## 11. First-Time Deployment

> **Only needed when setting up a brand new server. Skip this if the server is already running.**

### Prerequisites
- Fresh Ubuntu 22.04/24.04 VPS (Hostinger KVM2 or similar)
- Root SSH access
- GitHub repo cloned on your local machine
- Domain DNS A-record pointed at the server IP (or skip for IP-only access)

### Steps

**1. SSH into the server**
```bash
ssh root@147.79.68.232
```

**2. Clone the repository**
```bash
git clone https://github.com/TechsentinalsProjects/inventa.git /tmp/inventa-setup
cd /tmp/inventa-setup
```

**3. Run the setup script**
```bash
sudo bash deploy/setup.sh
```

The script will interactively ask for:
- Domain name (default: `www.inventasystems.in`)
- SMTP host, port, username, password
- Business email (where form submissions go)
- WhatsApp number

It then automatically (17 steps):
- Installs Node.js 22, Nginx, PM2, Certbot, Fail2ban
- Copies the project to `/var/www/inventa/`
- Writes the `.env` file
- Runs `npm install` (frontend + backend)
- Runs `vite build` to produce `dist/`
- Creates the PM2 ecosystem config and starts the backend
- Configures Nginx with security headers, gzip, caching, API proxy
- Enables UFW firewall (SSH + HTTP + HTTPS only)
- Sets up Fail2ban for SSH and Nginx
- Configures log rotation (14-day)
- Runs 10 health checks and prints a summary

**4. Enable HTTPS** (run after DNS has propagated — usually 15–60 min)
```bash
sudo bash /var/www/inventa/deploy/enable-ssl.sh
```

**5. Initialize git on the server** (so future `git pull` works)
```bash
cd /var/www/inventa
git init
git remote add origin https://github.com/TechsentinalsProjects/inventa.git
git fetch origin main
git reset --hard origin/main
```

> Note: `git reset --hard` will overwrite files with the GitHub version. The `.env` is excluded from git so it's safe. Confirm your `.env` is still intact: `cat /var/www/inventa/server/.env`

---

## 12. Updating the Site (Day-to-Day)

This is the workflow every time you make code changes locally and want them live on the server.

### On your local machine

```bash
# 1. Make your code changes
# 2. Test locally with: npm run dev

# 3. Commit and push to GitHub
git add -A
git commit -m "describe what you changed"
git push origin main
```

### On the server

```bash
ssh root@147.79.68.232

cd /var/www/inventa

# Sync latest code from GitHub (safe — never overwrites .env or database)
git fetch origin && git reset --hard origin/main

# Rebuild and restart everything
sudo bash deploy/update.sh
```

### What `update.sh` does (5 steps)
1. **Sync files** — rsync from source to `/var/www/inventa/` (skips `.env`, `data/`, `node_modules/`, `dist/`)
2. **Dependencies** — `npm install` for frontend, `npm install --omit=dev` for backend
3. **Rebuild** — `npm run build` (Vite), then sets `dist/` ownership to `www-data`
4. **Restart backend** — `pm2 restart inventa-api --update-env` (picks up `.env` changes)
5. **Reload Nginx** — `nginx -t && systemctl reload nginx`

Then runs a health check against `http://127.0.0.1:3001/api/health`.

### If only the backend changed (no frontend rebuild needed)
```bash
cd /var/www/inventa
git fetch origin && git reset --hard origin/main
cd server && npm install --omit=dev && cd ..
pm2 restart inventa-api --update-env
```

### If only the `.env` changed (no code update)
```bash
nano /var/www/inventa/server/.env
# Make changes, save
pm2 restart inventa-api --update-env
```

### Full update with maintenance mode (recommended for large changes)

```bash
# 1. Enable maintenance page (visitors see it instantly)
sudo bash /var/www/inventa/deploy/maintenance-on.sh

# 2. Do the update
cd /var/www/inventa
git fetch origin && git reset --hard origin/main
sudo bash deploy/update.sh

# 3. Disable maintenance page (site goes live again)
sudo bash /var/www/inventa/deploy/maintenance-off.sh
```

---

## 12a. Maintenance Mode

File served: `/var/www/inventa/public/maintenance.html`
Nginx reads a flag file at `/var/www/inventa/.maintenance` to decide whether to show it.

### Enable maintenance mode
```bash
sudo bash /var/www/inventa/deploy/maintenance-on.sh
```
Visitors immediately see the branded maintenance page. The `/api/health` endpoint stays live.

### Disable maintenance mode
```bash
sudo bash /var/www/inventa/deploy/maintenance-off.sh
```
Site goes back to normal instantly — no Nginx restart needed.

### Manual toggle (if scripts not available)
```bash
# Enable
touch /var/www/inventa/.maintenance
nginx -t && systemctl reload nginx

# Disable
rm -f /var/www/inventa/.maintenance
nginx -t && systemctl reload nginx
```

---

## 13. SSL Certificate Setup

> Run this once, after DNS A-records are pointed at the server.

```bash
sudo bash /var/www/inventa/deploy/enable-ssl.sh
```

The script:
1. Verifies DNS resolves to this server's IP
2. Runs Certbot (`certbot certonly --nginx`)
3. Rewrites the Nginx config for HTTPS (443) with SSL certs, HSTS header
4. Updates `CORS_ORIGIN` in `.env` to use `https://`
5. Restarts PM2 with the new CORS setting
6. Sets up automatic renewal via `certbot.timer`

**Certificates are stored at:** `/etc/letsencrypt/live/www.inventasystems.in/`
**Auto-renewal:** Certbot renews automatically via systemd timer. Nginx reloads on renewal.

**Check renewal status:**
```bash
certbot renew --dry-run
```

---

## 14. Backups

The SQLite database (submission logs) is the only stateful data on the server. Back it up with:

```bash
sudo bash /var/www/inventa/deploy/backup.sh
```

Backups are stored in `/var/backups/inventa/` as gzip-compressed `.db.gz` files.
Old backups (>30 days) are automatically deleted.

**Set up automatic nightly backup (2 AM):**
```bash
(crontab -l 2>/dev/null; echo "0 2 * * * sudo bash /var/www/inventa/deploy/backup.sh") | crontab -
```

**Restore from backup:**
```bash
# Stop PM2 first to prevent writes during restore
pm2 stop inventa-api

gunzip -c /var/backups/inventa/inventa_YYYYMMDD_HHMMSS.db.gz > /var/www/inventa/server/data/inventa.db

pm2 start inventa-api
```

---

## 15. Common Server Commands

### PM2 — Process Manager

```bash
pm2 status                          # Show all running processes + status
pm2 logs inventa-api                # Stream live logs
pm2 logs inventa-api --lines 100    # Last 100 log lines
pm2 restart inventa-api             # Restart (code reload, env unchanged)
pm2 restart inventa-api --update-env # Restart + reload .env
pm2 stop inventa-api                # Stop (Nginx will 502 during this)
pm2 start ecosystem.config.cjs      # Start fresh from config file
pm2 save                            # Save process list for auto-start on reboot
pm2 resurrect                       # Restore saved process list after reboot
```

### Nginx

```bash
nginx -t                            # Test config syntax (always run before reload)
systemctl reload nginx              # Reload config (zero-downtime)
systemctl restart nginx             # Full restart (brief downtime)
systemctl status nginx              # Check if running
cat /etc/nginx/sites-available/inventa  # View current Nginx config
```

### Git

```bash
cd /var/www/inventa
git status                          # See what's different from repo
git log --oneline -10               # Recent commits
git pull origin main                # Pull latest code
```

### Firewall (UFW)

```bash
ufw status verbose                  # Show active rules
ufw allow 443/tcp                   # Open HTTPS if needed
ufw deny 3001                       # Block direct Node.js port (should always be denied)
```

### Fail2ban

```bash
fail2ban-client status              # Show active jails
fail2ban-client status sshd         # Show SSH jail details (banned IPs)
fail2ban-client set sshd unbanip <IP>  # Unban an IP
```

---

## 16. Logs

| Log file | What it contains |
|---|---|
| `/var/log/inventa/out.log` | `console.log` output from Node.js |
| `/var/log/inventa/error.log` | `console.error` output from Node.js |
| `/var/log/inventa/combined.log` | Combined out + error |
| `/var/log/nginx/access.log` | All HTTP requests |
| `/var/log/nginx/error.log` | Nginx errors (also used by Fail2ban) |
| `/var/log/auth.log` | SSH login attempts (monitored by Fail2ban) |

All PM2 logs are rotated by logrotate (daily, 14-day retention, compressed).

**Tail live logs:**
```bash
pm2 logs inventa-api               # Node.js logs (live stream)
tail -f /var/log/nginx/access.log  # Nginx access (live stream)
tail -f /var/log/nginx/error.log   # Nginx errors (live stream)
```

---

## 17. Troubleshooting

### Site is down / Nginx 502 Bad Gateway
The backend process has crashed or stopped.
```bash
pm2 status               # Is inventa-api "online" or "errored"?
pm2 logs inventa-api     # What error caused the crash?
pm2 restart inventa-api  # Attempt restart
```

### Emails not sending
```bash
pm2 logs inventa-api | grep -i "email\|smtp\|failed"
```
Common causes:
- Wrong SMTP password in `.env` → update it and `pm2 restart inventa-api --update-env`
- Hostinger SMTP is down → check Hostinger status page
- `BUSINESS_EMAIL` is incorrect → fix in `.env` and restart

### `vite: Permission denied` during build
```bash
chmod +x /var/www/inventa/node_modules/.bin/vite
npm run build
```

### `git pull` fails with "not a git repository"
The server was set up before git was initialized. Run once:
```bash
cd /var/www/inventa
git init
git remote add origin https://github.com/TechsentinalsProjects/inventa.git
git fetch origin main
git reset --hard origin/main
```

### Changes pushed to GitHub but not live on server
A plain `git pull` may fail if the server has local diffs. Always use:
```bash
cd /var/www/inventa
git fetch origin && git reset --hard origin/main
sudo bash deploy/update.sh
```

### API health check failing
```bash
curl http://127.0.0.1:3001/api/health
pm2 logs inventa-api --lines 50
```

### CORS errors in browser
The frontend origin doesn't match `CORS_ORIGIN` in `.env`.
```bash
cat /var/www/inventa/server/.env | grep CORS
# Should be: CORS_ORIGIN=https://www.inventasystems.in,https://inventasystems.in
nano /var/www/inventa/server/.env  # Fix if wrong
pm2 restart inventa-api --update-env
```

### SSL certificate expired
Certbot should auto-renew, but if it fails:
```bash
certbot renew --force-renewal
systemctl reload nginx
```

### Disk space issues
```bash
df -h                          # Check overall disk usage
du -sh /var/www/inventa/node_modules    # Frontend node_modules (usually ~500MB)
du -sh /var/www/inventa/server/node_modules  # Backend node_modules
du -sh /var/log/inventa/       # Application logs
du -sh /var/backups/inventa/   # DB backups
```

---

## Quick Reference Card

```
DEPLOY FIRST TIME  →  sudo bash deploy/setup.sh
ENABLE SSL         →  sudo bash /var/www/inventa/deploy/enable-ssl.sh
UPDATE SITE        →  git fetch origin && git reset --hard origin/main && sudo bash deploy/update.sh
BACKUP DB          →  sudo bash /var/www/inventa/deploy/backup.sh

LIVE LOGS          →  pm2 logs inventa-api
PM2 STATUS         →  pm2 status
NGINX RELOAD       →  nginx -t && systemctl reload nginx
HEALTH CHECK       →  curl https://www.inventasystems.in/api/health

CHANGE RECIPIENT   →  nano /var/www/inventa/server/.env  (edit BUSINESS_EMAIL)
                       pm2 restart inventa-api --update-env

CHANGE WHATSAPP    →  nano /var/www/inventa/server/.env  (edit WHATSAPP_PHONE)
                       pm2 restart inventa-api --update-env
```

---

*Developed by Techsentinals LLP. Last updated June 2026.*
