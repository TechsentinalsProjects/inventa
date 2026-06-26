#!/usr/bin/env bash
# ══════════════════════════════════════════════════════════════════════════════
#  INVENTA SYSTEMS — Enable SSL (Let's Encrypt)
#  Run AFTER DNS A-records are pointed at this server and propagated.
#  Usage: sudo bash /var/www/inventa/deploy/enable-ssl.sh
# ══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
IFS=$'\n\t'

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'
ok()   { printf "${GREEN}  [✔] %s${NC}\n"  "$*"; }
die()  { printf "${RED}  [✖] %s${NC}\n"    "$*"; exit 1; }
info() { printf "${BLUE}  [i] %s${NC}\n"   "$*"; }

[[ $EUID -eq 0 ]] || die "Run as root: sudo bash enable-ssl.sh"
command -v certbot &>/dev/null || die "Certbot not found. Run setup.sh first."

APP_NAME="inventa"
NGINX_CONF="/etc/nginx/sites-available/${APP_NAME}"

echo ""
echo -e "${BLUE}${BOLD}  ── Enable SSL for Inventa Systems ──${NC}"
echo ""
read -rp "  Domain (e.g. www.inventasystems.in): " DOMAIN
[[ -n "${DOMAIN}" ]] || die "Domain cannot be empty."
DOMAIN_NAKED="${DOMAIN#www.}"

# ── Verify DNS resolves to this server ────────────────────────────────────────
SERVER_IP=$(curl -sf https://api.ipify.org 2>/dev/null || hostname -I | awk '{print $1}')
DOMAIN_IP=$(getent hosts "${DOMAIN}" | awk '{print $1}' || true)
if [[ "${DOMAIN_IP}" != "${SERVER_IP}" ]]; then
  echo ""
  echo -e "  ${YELLOW}${BOLD}DNS check warning:${NC}"
  echo "    ${DOMAIN} resolves to: ${DOMAIN_IP:-'(not found)'}"
  echo "    This server IP      : ${SERVER_IP}"
  echo ""
  read -rp "  DNS doesn't match. Continue anyway? [y/N]: " FORCE
  [[ "${FORCE,,}" == "y" ]] || die "Aborted. Update DNS and try again."
fi

read -rp "  Email for cert expiry notices: " CERT_EMAIL
[[ -n "${CERT_EMAIL}" ]] || die "Email is required for Let's Encrypt."

# ── Update Nginx config for HTTPS ─────────────────────────────────────────────
[[ -f "${NGINX_CONF}" ]] || die "Nginx config not found at ${NGINX_CONF}. Run setup.sh first."

info "Obtaining SSL certificate from Let's Encrypt..."
certbot certonly --nginx \
  -d "${DOMAIN}" \
  -d "${DOMAIN_NAKED}" \
  --non-interactive \
  --agree-tos \
  --email "${CERT_EMAIL}" \
  --redirect \
  2>&1 | tail -10 || die "Certbot failed. Check DNS and try again."

# ── Write HTTPS nginx config ──────────────────────────────────────────────────
DIST_DIR="/var/www/${APP_NAME}/dist"

cat > "${NGINX_CONF}" <<NGINXEOF
# ── Rate limiting zones ───────────────────────────────────────────────────────
limit_req_zone \$binary_remote_addr zone=inventa_api:10m    rate=10r/s;
limit_req_zone \$binary_remote_addr zone=inventa_site:10m   rate=60r/s;

# ── HTTP → HTTPS redirect ─────────────────────────────────────────────────────
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} ${DOMAIN_NAKED};
    return 301 https://${DOMAIN}\$request_uri;
}

# ── Bare domain → www redirect (HTTPS) ───────────────────────────────────────
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name ${DOMAIN_NAKED};

    ssl_certificate     /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://${DOMAIN}\$request_uri;
}

# ── Main HTTPS server ─────────────────────────────────────────────────────────
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name ${DOMAIN};

    ssl_certificate     /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    server_tokens off;
    root          ${DIST_DIR};
    index         index.html;
    charset       utf-8;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_types text/plain text/css text/xml application/json
               application/javascript application/xml
               application/rss+xml image/svg+xml;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options          "SAMEORIGIN"                       always;
    add_header X-Content-Type-Options   "nosniff"                          always;
    add_header X-XSS-Protection         "1; mode=block"                    always;
    add_header Referrer-Policy          "strict-origin-when-cross-origin"  always;
    add_header Permissions-Policy       "camera=(), microphone=(), geolocation=()" always;

    location ~ /\.(env|git|htaccess|npmrc|DS_Store) {
        deny all; return 404;
    }
    location ~* /(package(-lock)?\.json|ecosystem\.config\.) {
        deny all; return 404;
    }

    location ~* ^/(robots\.txt|sitemap\.xml)$ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
        access_log off;
    }

    location ~* \.(js|css|woff2?|ttf|eot|otf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ~* \.(ico|png|jpg|jpeg|gif|svg|webp|mp4|webm)$ {
        expires 6M;
        add_header Cache-Control "public";
        access_log off;
    }

    location /api/ {
        limit_req zone=inventa_api burst=30 nodelay;
        proxy_pass            http://127.0.0.1:3001;
        proxy_http_version    1.1;
        proxy_set_header      Host               \$host;
        proxy_set_header      X-Real-IP          \$remote_addr;
        proxy_set_header      X-Forwarded-For    \$proxy_add_x_forwarded_for;
        proxy_set_header      X-Forwarded-Proto  \$scheme;
        proxy_read_timeout    60s;
        proxy_connect_timeout 10s;
        proxy_buffering       on;
        client_max_body_size  5M;
        proxy_hide_header     X-Powered-By;
        proxy_hide_header     Server;
    }

    location / {
        limit_req zone=inventa_site burst=100 nodelay;
        try_files \$uri \$uri/ /index.html;
    }
}
NGINXEOF

nginx -t || die "Nginx config invalid after SSL update."
systemctl reload nginx

# ── Update CORS in .env ────────────────────────────────────────────────────────
ENV_FILE="/var/www/${APP_NAME}/server/.env"
if [[ -f "${ENV_FILE}" ]]; then
  sed -i "s|^CORS_ORIGIN=.*|CORS_ORIGIN=https://${DOMAIN},https://${DOMAIN_NAKED}|" "${ENV_FILE}"
  pm2 restart "${APP_NAME}-api" 2>/dev/null || true
  ok "CORS updated to HTTPS origins."
fi

# ── Auto-renewal cron ──────────────────────────────────────────────────────────
systemctl enable certbot.timer 2>/dev/null && systemctl start certbot.timer 2>/dev/null || \
  (crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'") | crontab -
ok "SSL auto-renewal scheduled."

echo ""
ok "HTTPS is live at: https://${DOMAIN}"
echo ""
echo -e "  ${BOLD}Test your SSL:${NC} https://www.ssllabs.com/ssltest/analyze.html?d=${DOMAIN}"
echo -e "  ${BOLD}Update sitemap${NC}: edit public/sitemap.xml — change http:// → https://"
echo ""
