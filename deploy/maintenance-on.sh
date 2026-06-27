#!/usr/bin/env bash
# Enable maintenance mode — visitors see maintenance.html immediately
set -euo pipefail
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

APP_DIR="/var/www/inventa"
FLAG="${APP_DIR}/.maintenance"
NGINX_CONF="/etc/nginx/sites-available/inventa"

[[ $EUID -eq 0 ]] || { echo "Run as root: sudo bash deploy/maintenance-on.sh"; exit 1; }
[[ -f "${NGINX_CONF}" ]] || { echo "Nginx config not found at ${NGINX_CONF}"; exit 1; }

# Write flag file
touch "${FLAG}"
echo -e "${YELLOW}  [⚠] Maintenance flag set: ${FLAG}${NC}"

# Reload Nginx so the maintenance block activates
nginx -t && systemctl reload nginx
echo -e "${GREEN}  [✔] Maintenance mode ON — visitors now see maintenance.html${NC}"
echo -e "      To disable: sudo bash ${APP_DIR}/deploy/maintenance-off.sh"
