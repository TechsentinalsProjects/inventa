#!/usr/bin/env bash
# Disable maintenance mode — site goes back to normal
set -euo pipefail
GREEN='\033[0;32m'; NC='\033[0m'

APP_DIR="/var/www/inventa"
FLAG="${APP_DIR}/.maintenance"
NGINX_CONF="/etc/nginx/sites-available/inventa"

[[ $EUID -eq 0 ]] || { echo "Run as root: sudo bash deploy/maintenance-off.sh"; exit 1; }
[[ -f "${NGINX_CONF}" ]] || { echo "Nginx config not found at ${NGINX_CONF}"; exit 1; }

# Remove flag file
rm -f "${FLAG}"
echo -e "${GREEN}  [✔] Maintenance flag removed${NC}"

# Reload Nginx so normal serving resumes
nginx -t && systemctl reload nginx
echo -e "${GREEN}  [✔] Maintenance mode OFF — site is live again${NC}"
