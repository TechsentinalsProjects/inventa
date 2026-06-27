#!/usr/bin/env bash
# Disable maintenance mode — site goes back to normal instantly (no Nginx reload needed)
set -euo pipefail
GREEN='\033[0;32m'; NC='\033[0m'

APP_DIR="/var/www/inventa"
FLAG="${APP_DIR}/.maintenance"

[[ $EUID -eq 0 ]] || { echo "Run as root: sudo bash deploy/maintenance-off.sh"; exit 1; }

rm -f "${FLAG}"
echo -e "${GREEN}  [✔] Maintenance mode OFF${NC} — site is live again"
