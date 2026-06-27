#!/usr/bin/env bash
# Enable maintenance mode — visitors see maintenance.html immediately (no Nginx reload needed)
set -euo pipefail
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

APP_DIR="/var/www/inventa"
FLAG="${APP_DIR}/.maintenance"

[[ $EUID -eq 0 ]] || { echo "Run as root: sudo bash deploy/maintenance-on.sh"; exit 1; }

touch "${FLAG}"
echo -e "${YELLOW}  [⚠] Maintenance mode ON${NC} — visitors now see maintenance.html"
echo -e "      To disable: sudo bash ${APP_DIR}/deploy/maintenance-off.sh"
