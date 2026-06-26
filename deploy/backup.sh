#!/usr/bin/env bash
# ══════════════════════════════════════════════════════════════════════════════
#  INVENTA SYSTEMS — SQLite database backup
#  Usage  : sudo bash /var/www/inventa/deploy/backup.sh
#  Cron   : 0 2 * * * sudo bash /var/www/inventa/deploy/backup.sh
# ══════════════════════════════════════════════════════════════════════════════
set -euo pipefail

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
ok()   { printf "${GREEN}[✔] %s${NC}\n" "$*"; }
warn() { printf "${YELLOW}[⚠] %s${NC}\n" "$*"; }
die()  { printf "${RED}[✖] %s${NC}\n"  "$*"; exit 1; }

[[ $EUID -eq 0 ]] || die "Run as root: sudo bash deploy/backup.sh"

APP_DIR="/var/www/inventa"
DB_SRC="${APP_DIR}/server/data/inventa.db"
BACKUP_DIR="/var/backups/inventa"
KEEP_DAYS=30

[[ -f "${DB_SRC}" ]] || die "Database not found: ${DB_SRC}"

mkdir -p "${BACKUP_DIR}"

TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
BACKUP_FILE="${BACKUP_DIR}/inventa_${TIMESTAMP}.db"

# Copy (SQLite is safe to cp when there's no active write transaction)
cp "${DB_SRC}" "${BACKUP_FILE}"
gzip "${BACKUP_FILE}"
ok "Backup created: ${BACKUP_FILE}.gz ($(du -sh "${BACKUP_FILE}.gz" | cut -f1))"

# Remove backups older than KEEP_DAYS
find "${BACKUP_DIR}" -name "*.db.gz" -mtime +${KEEP_DAYS} -delete 2>/dev/null || true
ok "Old backups cleaned (kept last ${KEEP_DAYS} days)."

TOTAL=$(ls "${BACKUP_DIR}"/*.db.gz 2>/dev/null | wc -l)
ok "Total backups stored: ${TOTAL}"
