#!/usr/bin/env bash
# ══════════════════════════════════════════════════════════════════════════════
#  INVENTA SYSTEMS — Zero-downtime update script
#  Usage  : sudo bash /var/www/inventa/deploy/update.sh
#  Run from: anywhere (uses fixed APP_DIR path)
# ══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'
BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'
ok()      { printf "${GREEN}  [✔] %s${NC}\n" "$*"; }
warn()    { printf "${YELLOW}  [⚠] %s${NC}\n" "$*"; }
die()     { printf "${RED}  [✖] %s${NC}\n"  "$*"; exit 1; }
section() { printf "\n${BLUE}${BOLD}  ── %s ──${NC}\n" "$*"; }

[[ $EUID -eq 0 ]] || die "Run as root: sudo bash deploy/update.sh"

APP_NAME="inventa"
APP_DIR="/var/www/${APP_NAME}"
SERVER_DIR="${APP_DIR}/server"
DIST_DIR="${APP_DIR}/dist"
LOG_DIR="/var/log/${APP_NAME}"

[[ -d "${APP_DIR}" ]] || die "${APP_DIR} not found. Run setup.sh first."

# Detect where to sync from (where the script is located)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

printf "\n${BLUE}${BOLD}  ── Inventa Systems — Site Update ──${NC}\n\n"

# ── 1. Sync code ──────────────────────────────────────────────────────────────
section "1/5 — Syncing updated files"
rsync -a --delete \
  --exclude='.git/' \
  --exclude='node_modules/' \
  --exclude='server/node_modules/' \
  --exclude='dist/' \
  --exclude='server/data/' \
  --exclude='server/.env' \
  --exclude='.env' \
  --exclude='*.log' \
  --exclude='.DS_Store' \
  --exclude='ecosystem.config.cjs' \
  "${SOURCE_ROOT}/" "${APP_DIR}/"
ok "Files synced."

# ── 2. Dependencies ───────────────────────────────────────────────────────────
section "2/5 — Dependencies"
cd "${APP_DIR}"
npm install --no-audit --no-fund
ok "Frontend deps up to date."

cd "${SERVER_DIR}"
npm install --no-audit --no-fund --omit=dev
ok "Backend deps up to date."

# ── 3. Rebuild frontend ───────────────────────────────────────────────────────
section "3/5 — Rebuild frontend"
cd "${APP_DIR}"
npm run build 2>&1 | tail -5
[[ -f "${DIST_DIR}/index.html" ]] || die "Build failed."
chown -R www-data:www-data "${DIST_DIR}"
ok "Frontend rebuilt and permissions reset."

# ── 4. Restart backend ────────────────────────────────────────────────────────
section "4/5 — Restart backend"
pm2 restart "${APP_NAME}-api" --update-env 2>/dev/null || \
  pm2 start "${APP_DIR}/ecosystem.config.cjs" 2>/dev/null
pm2 save
ok "Backend restarted."

# ── 5. Reload Nginx ───────────────────────────────────────────────────────────
section "5/5 — Reload Nginx"
nginx -t || die "Nginx config invalid — not reloading."
systemctl reload nginx
ok "Nginx reloaded."

# ── Health check ──────────────────────────────────────────────────────────────
sleep 3
if curl -sf http://127.0.0.1:3001/api/health | grep -q '"ok"'; then
  ok "API health: PASSING"
else
  warn "API not responding — check: pm2 logs ${APP_NAME}-api"
fi

printf "\n${GREEN}${BOLD}  Update complete!${NC}  $(date '+%Y-%m-%d %H:%M:%S IST')\n\n"
