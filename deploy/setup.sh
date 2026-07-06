#!/usr/bin/env bash
# ══════════════════════════════════════════════════════════════════════════════
#  INVENTA SYSTEMS — One-Command Production Setup
#  Target : Hostinger KVM2, Ubuntu 22.04 / 24.04
#  Usage  : sudo bash deploy/setup.sh
#  Notes  : Safe to re-run. Domain/SSL optional — run enable-ssl.sh later.
# ══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
IFS=$'\n\t'
export DEBIAN_FRONTEND=noninteractive

# ── Colours ───────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'
ok()      { printf "${GREEN}  [✔] %s${NC}\n"      "$*"; }
warn()    { printf "${YELLOW}  [⚠] %s${NC}\n"     "$*"; }
die()     { printf "${RED}  [✖] FATAL: %s${NC}\n" "$*"; exit 1; }
section() { printf "\n${BLUE}${BOLD}  ── %s ──${NC}\n" "$*"; }

# ── Resolve project root ──────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# ── Fixed paths ───────────────────────────────────────────────────────────────
APP_NAME="inventa"
APP_DIR="/var/www/${APP_NAME}"
SERVER_DIR="${APP_DIR}/server"
DIST_DIR="${APP_DIR}/dist"
DATA_DIR="${SERVER_DIR}/data"
LOG_DIR="/var/log/${APP_NAME}"
NODE_MIN=22

# ══════════════════════════════════════════════════════════════════════════════
printf "\n${BLUE}${BOLD}"
printf "    ██╗███╗  ██╗██╗   ██╗███████╗███╗  ██╗████████╗ █████╗ \n"
printf "    ██║████╗ ██║██║   ██║██╔════╝████╗ ██║╚══██╔══╝██╔══██╗\n"
printf "    ██║██╔██╗██║██║   ██║█████╗  ██╔██╗██║   ██║   ███████║\n"
printf "    ██║██║╚████║╚██╗ ██╔╝██╔══╝  ██║╚████║   ██║   ██╔══██║\n"
printf "    ██║██║ ╚███║ ╚████╔╝ ███████╗██║ ╚███║   ██║   ██║  ██║\n"
printf "    ╚═╝╚═╝  ╚══╝  ╚═══╝  ╚══════╝╚═╝  ╚══╝   ╚═╝   ╚═╝  ╚═╝\n"
printf "${NC}\n"
printf "       ${BOLD}Production Deployment — Hostinger KVM2${NC}\n\n"

# ── Guards ────────────────────────────────────────────────────────────────────
[[ $EUID -eq 0 ]]                         || die "Run as root: sudo bash deploy/setup.sh"
[[ -f "${PROJECT_ROOT}/package.json" ]]    || die "Cannot find project root (no package.json)."
command -v curl &>/dev/null               || apt-get install -y -qq curl

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 1 / 17 — Production configuration"
# ══════════════════════════════════════════════════════════════════════════════
echo ""
echo -e "  ${YELLOW}Press Enter to accept the default shown in [brackets]:${NC}"
echo ""

ask()      { local v; read -rp  "  ${BOLD}$1${NC}${2:+ [$2]}: " v; echo "${v:-${2:-}}"; }
ask_pass() { local v; read -rsp "  ${BOLD}$1${NC}: " v; printf '\n'; printf '%s' "$v"; }

# ── Domain ────────────────────────────────────────────────────────────────────
DOMAIN=$(ask "Domain (leave blank to use server IP only)" "www.inventasystems.in")
if [[ -z "${DOMAIN}" ]]; then
  SERVER_IP=$(curl -sf https://api.ipify.org || hostname -I | awk '{print $1}')
  DOMAIN="${SERVER_IP}"
  DOMAIN_NAKED="${SERVER_IP}"
  USE_IP_ONLY=true
else
  DOMAIN_NAKED="${DOMAIN#www.}"
  USE_IP_ONLY=false
fi

# ── Email — defaults use Hostinger domain email ───────────────────────────────
echo ""
echo -e "  ${BOLD}Email (SMTP) — Hostinger domain email:${NC}"
SMTP_HOST=$(ask   "SMTP Host"       "mail.inventasystems.in")
SMTP_PORT=$(ask   "SMTP Port"       "587")
SMTP_USER=$(ask   "SMTP Username"   "inventasite@inventasystems.in")
SMTP_PASS=$(ask_pass "SMTP Password (won't echo)")
SMTP_FROM=$(ask   "SMTP From"       "Inventa Systems <inventasite@inventasystems.in>")

echo ""
echo -e "  ${BOLD}Business settings:${NC}"
BUSINESS_EMAIL=$(ask "Business email (receives all form submissions)" "dharapanchal@inventasystems.in")
WA_PHONE=$(ask       "WhatsApp number (digits only)"                  "919313840714")

echo ""
echo -e "  ${BOLD}━━━━ Summary ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "  Site           : http://${DOMAIN}"
echo "  API backend    : http://127.0.0.1:3001  (internal)"
echo "  SMTP           : ${SMTP_HOST}:${SMTP_PORT}  user: ${SMTP_USER}"
echo "  Business email : ${BUSINESS_EMAIL}"
echo "  WhatsApp       : ${WA_PHONE}"
if [[ "${USE_IP_ONLY}" == "false" ]]; then
  echo "  SSL later via  : sudo bash ${APP_DIR}/deploy/enable-ssl.sh"
fi
echo ""
read -rp "  Confirm and deploy? [y/N]: " CONFIRM
[[ "${CONFIRM,,}" == "y" ]] || die "Aborted."

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 2 / 17 — System update & base packages"
# ══════════════════════════════════════════════════════════════════════════════
apt-get update -qq
apt-get install -y -qq \
    curl wget gnupg2 ca-certificates lsb-release \
    software-properties-common build-essential \
    git rsync ufw fail2ban logrotate unzip 2>/dev/null
ok "Base packages ready."

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 3 / 17 — Node.js ${NODE_MIN} LTS"
# ══════════════════════════════════════════════════════════════════════════════
need_node() {
  command -v node &>/dev/null || return 1
  local major; major=$(node -e "console.log(parseInt(process.version.slice(1)))" 2>/dev/null || echo 0)
  [[ "${major}" -ge "${NODE_MIN}" ]]
}
if need_node; then
  ok "Node.js $(node -v) already installed."
else
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MIN}.x" | bash - 2>/dev/null
  apt-get install -y -qq nodejs
  ok "Node.js $(node -v) installed."
fi

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 4 / 17 — Nginx"
# ══════════════════════════════════════════════════════════════════════════════
if ! command -v nginx &>/dev/null; then
  apt-get install -y -qq nginx
fi
systemctl enable nginx --now 2>/dev/null
ok "Nginx $(nginx -v 2>&1 | grep -oP '[\d.]+' | head -1) active."

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 5 / 17 — PM2 process manager"
# ══════════════════════════════════════════════════════════════════════════════
npm install -g pm2 --prefer-offline --silent 2>/dev/null || npm install -g pm2 --silent 2>/dev/null
ok "PM2 $(pm2 -v) installed."

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 6 / 17 — Deploy application files"
# ══════════════════════════════════════════════════════════════════════════════
mkdir -p "${APP_DIR}" "${DATA_DIR}" "${LOG_DIR}"

rsync -a --delete \
  --exclude='.git/' \
  --exclude='node_modules/' \
  --exclude='server/node_modules/' \
  --exclude='dist/' \
  --exclude='server/data/' \
  --exclude='.env' \
  --exclude='server/.env' \
  --exclude='*.log' \
  --exclude='.DS_Store' \
  --exclude='Thumbs.db' \
  --exclude='zipFile.zip' \
  --exclude='attached_assets/' \
  --exclude='scraped_data.json' \
  --exclude='extract_urls.py' \
  "${PROJECT_ROOT}/" "${APP_DIR}/"
ok "Project files synced → ${APP_DIR}"

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 7 / 17 — Production .env"
# ══════════════════════════════════════════════════════════════════════════════
if [[ "${USE_IP_ONLY}" == "true" ]]; then
  CORS_VALUE="http://${DOMAIN}"
else
  CORS_VALUE="https://${DOMAIN},https://${DOMAIN_NAKED}"
fi

cat > "${SERVER_DIR}/.env" <<ENVEOF
# ─── SMTP (Hostinger domain email) ───────────────────────────────────────────
SMTP_HOST=${SMTP_HOST}
SMTP_PORT=${SMTP_PORT}
SMTP_SECURE=false
SMTP_USER=${SMTP_USER}
SMTP_PASS=${SMTP_PASS}
SMTP_FROM=${SMTP_FROM}

# ─── Business ─────────────────────────────────────────────────────────────────
BUSINESS_EMAIL=${BUSINESS_EMAIL}
WHATSAPP_PHONE=${WA_PHONE}

# ─── Server ───────────────────────────────────────────────────────────────────
PORT=3001
NODE_ENV=production
CORS_ORIGIN=${CORS_VALUE}
ENVEOF

chmod 600 "${SERVER_DIR}/.env"
ok ".env written with permissions 600 (root-only)."

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 8 / 17 — Install npm dependencies"
# ══════════════════════════════════════════════════════════════════════════════
cd "${APP_DIR}"
npm install --no-audit --no-fund
ok "Frontend deps installed."

cd "${SERVER_DIR}"
npm install --no-audit --no-fund --omit=dev
ok "Backend deps installed (production only)."

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 9 / 17 — Build frontend (Vite)"
# ══════════════════════════════════════════════════════════════════════════════
cd "${APP_DIR}"
npm run build 2>&1 | tail -5
[[ -f "${DIST_DIR}/index.html" ]] || die "Build failed — dist/index.html not found."
ok "Frontend built → ${DIST_DIR}"

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 10 / 17 — PM2 ecosystem & startup"
# ══════════════════════════════════════════════════════════════════════════════
cat > "${APP_DIR}/ecosystem.config.cjs" <<ECOEOF
module.exports = {
  apps: [{
    name:               '${APP_NAME}-api',
    script:             'index.js',
    cwd:                '${SERVER_DIR}',
    instances:          1,
    exec_mode:          'fork',
    node_args:          '--no-warnings',
    watch:              false,
    log_file:           '${LOG_DIR}/combined.log',
    out_file:           '${LOG_DIR}/out.log',
    error_file:         '${LOG_DIR}/error.log',
    log_date_format:    'YYYY-MM-DD HH:mm:ss',
    merge_logs:         true,
    max_memory_restart: '256M',
    restart_delay:      3000,
    max_restarts:       10,
    min_uptime:         '10s',
  }],
};
ECOEOF

pm2 delete "${APP_NAME}-api" 2>/dev/null || true
pm2 start "${APP_DIR}/ecosystem.config.cjs"
pm2 save

# Register PM2 in systemd so it survives reboots
STARTUP_LINE=$(pm2 startup systemd 2>&1 | grep "sudo env PATH" || true)
[[ -n "${STARTUP_LINE}" ]] && eval "${STARTUP_LINE}" 2>/dev/null || \
  pm2 startup systemd -u root --hp /root 2>/dev/null || true
pm2 save
ok "PM2 started — auto-restarts on reboot."

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 11 / 17 — Nginx site configuration"
# ══════════════════════════════════════════════════════════════════════════════
rm -f /etc/nginx/sites-enabled/default
NGINX_CONF="/etc/nginx/sites-available/${APP_NAME}"

cat > "${NGINX_CONF}" <<'NGINXEOF'
# ── Rate limiting zones (inside http{} via sites-available include) ───────────
limit_req_zone $binary_remote_addr zone=inventa_api:10m    rate=10r/s;
limit_req_zone $binary_remote_addr zone=inventa_site:10m   rate=60r/s;

# ── Redirect bare domain → www (skipped for IP-only mode) ────────────────────
server {
    listen 80;
    listen [::]:80;
    server_name __DOMAIN_NAKED__;
    # Only active when domain != IP
    return 301 http://__DOMAIN__$request_uri;
}

# ── Main server block ─────────────────────────────────────────────────────────
server {
    listen 80;
    listen [::]:80;
    server_name __DOMAIN__ __SERVER_IP__;

    server_tokens   off;
    root            __DIST_DIR__;
    index           index.html;
    charset         utf-8;

    # ── Gzip ──────────────────────────────────────────────────────────────────
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_types text/plain text/css text/xml application/json
               application/javascript application/xml
               application/rss+xml image/svg+xml;

    # ── Security headers ──────────────────────────────────────────────────────
    add_header X-Frame-Options          "SAMEORIGIN"                       always;
    add_header X-Content-Type-Options   "nosniff"                          always;
    add_header X-XSS-Protection         "1; mode=block"                   always;
    add_header Referrer-Policy          "strict-origin-when-cross-origin"  always;
    add_header Permissions-Policy       "camera=(), microphone=(), geolocation=()" always;

    # ── Block hidden / sensitive files ────────────────────────────────────────
    location ~ /\.(env|git|htaccess|npmrc|DS_Store) {
        deny all; return 404;
    }
    location ~* /(package(-lock)?\.json|ecosystem\.config\.) {
        deny all; return 404;
    }

    # ── SEO files — never cache ───────────────────────────────────────────────
    location ~* ^/(robots\.txt|sitemap\.xml)$ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
        access_log off;
    }

    # ── Immutable JS / CSS / fonts ────────────────────────────────────────────
    location ~* \.(js|css|woff2?|ttf|eot|otf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # ── Images & media ────────────────────────────────────────────────────────
    location ~* \.(ico|png|jpg|jpeg|gif|svg|webp|mp4|webm)$ {
        expires 6M;
        add_header Cache-Control "public";
        access_log off;
    }

    # ── API proxy → Node.js :3001 ─────────────────────────────────────────────
    location /api/ {
        limit_req zone=inventa_api burst=30 nodelay;

        proxy_pass            http://127.0.0.1:3001;
        proxy_http_version    1.1;
        proxy_set_header      Host               $host;
        proxy_set_header      X-Real-IP          $remote_addr;
        proxy_set_header      X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header      X-Forwarded-Proto  $scheme;
        proxy_read_timeout    60s;
        proxy_connect_timeout 10s;
        proxy_buffering       on;
        client_max_body_size  5M;
        proxy_hide_header     X-Powered-By;
        proxy_hide_header     Server;
    }

    # ── SPA fallback ──────────────────────────────────────────────────────────
    location / {
        limit_req zone=inventa_site burst=100 nodelay;
        try_files $uri $uri/ /index.html;
    }
}
NGINXEOF

# Get current server IP for the server_name line
SERVER_IP=$(curl -sf https://api.ipify.org 2>/dev/null || hostname -I | awk '{print $1}')

# Substitute placeholders
sed -i "s|__DOMAIN__|${DOMAIN}|g"               "${NGINX_CONF}"
sed -i "s|__DOMAIN_NAKED__|${DOMAIN_NAKED}|g"   "${NGINX_CONF}"
sed -i "s|__DIST_DIR__|${DIST_DIR}|g"           "${NGINX_CONF}"
sed -i "s|__SERVER_IP__|${SERVER_IP}|g"         "${NGINX_CONF}"

# If IP-only mode, remove the bare-domain redirect block
if [[ "${USE_IP_ONLY}" == "true" ]]; then
  # Remove the first server block (bare domain redirect) since we don't have a domain
  python3 -c "
import re, sys
content = open('${NGINX_CONF}').read()
# Remove first server{} block (the redirect one)
pattern = r'# ── Redirect.*?^}\n'
result = re.sub(pattern, '', content, count=1, flags=re.DOTALL|re.MULTILINE)
open('${NGINX_CONF}', 'w').write(result)
" 2>/dev/null || true
fi

ln -sf "${NGINX_CONF}" /etc/nginx/sites-enabled/"${APP_NAME}"
nginx -t || die "Nginx config invalid. Run: nginx -t"
systemctl reload nginx
ok "Nginx configured."

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 12 / 17 — UFW Firewall"
# ══════════════════════════════════════════════════════════════════════════════
ufw --force reset         >/dev/null 2>&1
ufw default deny incoming >/dev/null 2>&1
ufw default allow outgoing>/dev/null 2>&1
ufw allow OpenSSH         >/dev/null 2>&1
ufw allow 'Nginx Full'    >/dev/null 2>&1
ufw --force enable        >/dev/null 2>&1
ok "Firewall: SSH (22) + HTTP (80) + HTTPS (443). All others blocked."

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 13 / 17 — Fail2ban"
# ══════════════════════════════════════════════════════════════════════════════
cat > /etc/fail2ban/jail.local <<'F2BEOF'
[DEFAULT]
bantime  = 3600
findtime = 600
maxretry = 5

[sshd]
enabled  = true
port     = ssh
filter   = sshd
logpath  = /var/log/auth.log

[nginx-http-auth]
enabled  = true

[nginx-botsearch]
enabled  = true
port     = http,https
filter   = nginx-botsearch
logpath  = /var/log/nginx/error.log
maxretry = 2
F2BEOF

systemctl enable fail2ban --now >/dev/null 2>&1
systemctl restart fail2ban
ok "Fail2ban active — SSH & Nginx bot protection on."

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 14 / 17 — Log rotation"
# ══════════════════════════════════════════════════════════════════════════════
cat > /etc/logrotate.d/${APP_NAME} <<LREOF
${LOG_DIR}/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    copytruncate
    su root root
}
LREOF
ok "Log rotation: 14-day retention, daily compress."

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 15 / 17 — Harden file permissions"
# ══════════════════════════════════════════════════════════════════════════════
chown -R www-data:www-data "${DIST_DIR}"
chmod -R 755 "${DIST_DIR}"
chown -R root:root "${APP_DIR}"
chmod -R 755 "${APP_DIR}"
chmod 600 "${SERVER_DIR}/.env"
chown -R root:root "${DATA_DIR}"
chmod 750 "${DATA_DIR}"
chown -R root:root "${LOG_DIR}"
chmod 755 "${LOG_DIR}"
chmod +x "${APP_DIR}/deploy/"*.sh 2>/dev/null || true
ok "Permissions hardened (.env=600, data=750)."

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 16 / 17 — Certbot installation (SSL later)"
# ══════════════════════════════════════════════════════════════════════════════
if ! command -v certbot &>/dev/null; then
  apt-get install -y -qq certbot python3-certbot-nginx
fi
ok "Certbot installed — run enable-ssl.sh once DNS is pointed at this server."

# ══════════════════════════════════════════════════════════════════════════════
section "STEP 17 / 17 — Health verification"
# ══════════════════════════════════════════════════════════════════════════════
echo ""
sleep 5

PASS=0; FAIL=0
chk() {
  if eval "$2" &>/dev/null; then ok "$1"; ((PASS++)); else warn "$1 — FAILED"; ((FAIL++)); fi
}

chk "Node.js >= ${NODE_MIN}" \
    "node -e 'process.exit(parseInt(process.version.slice(1))>=${NODE_MIN}?0:1)'"
chk "PM2 process online" \
    "pm2 list | grep -qE '${APP_NAME}-api.*online'"
chk "Backend API health" \
    "curl -sf http://127.0.0.1:3001/api/health | grep -q '\"ok\"'"
chk "Nginx running" \
    "systemctl is-active --quiet nginx"
chk "UFW active" \
    "ufw status | grep -q 'Status: active'"
chk "Fail2ban running" \
    "systemctl is-active --quiet fail2ban"
chk "dist/index.html present" \
    "[[ -f '${DIST_DIR}/index.html' ]]"
chk "sitemap.xml present" \
    "[[ -f '${DIST_DIR}/sitemap.xml' ]]"
chk "robots.txt present" \
    "[[ -f '${DIST_DIR}/robots.txt' ]]"
chk ".env permissions = 600" \
    "[[ \$(stat -c %a '${SERVER_DIR}/.env') == '600' ]]"

# ── Final banner ──────────────────────────────────────────────────────────────
echo ""
if [[ $FAIL -eq 0 ]]; then
  printf "${GREEN}${BOLD}"
  printf "  ╔══════════════════════════════════════════════════════╗\n"
  printf "  ║  ALL %d/%d CHECKS PASSED — DEPLOYMENT COMPLETE ✔  ║\n" "${PASS}" "$((PASS+FAIL))"
  printf "  ╚══════════════════════════════════════════════════════╝\n"
  printf "${NC}\n"
else
  printf "${YELLOW}${BOLD}"
  printf "  ╔══════════════════════════════════════════════════════╗\n"
  printf "  ║  DONE — %d passed, %d warning(s). Check output above. ║\n" "${PASS}" "${FAIL}"
  printf "  ╚══════════════════════════════════════════════════════╝\n"
  printf "${NC}\n"
fi

echo -e "  ${BOLD}Site (HTTP) :${NC} http://${DOMAIN}"
echo -e "  ${BOLD}API health  :${NC} http://${DOMAIN}/api/health"
echo ""
echo -e "  ${BOLD}PM2 logs    :${NC} pm2 logs ${APP_NAME}-api"
echo -e "  ${BOLD}PM2 status  :${NC} pm2 status"
echo -e "  ${BOLD}Update site :${NC} sudo bash ${APP_DIR}/deploy/update.sh"
echo -e "  ${BOLD}Backup DB   :${NC} sudo bash ${APP_DIR}/deploy/backup.sh"
echo ""
if [[ "${USE_IP_ONLY}" == "false" ]]; then
  echo -e "  ${YELLOW}${BOLD}When DNS is ready, run:${NC}"
  echo -e "    sudo bash ${APP_DIR}/deploy/enable-ssl.sh"
fi
echo ""
