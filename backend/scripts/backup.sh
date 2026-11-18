#!/usr/bin/env bash
# Production backup script. Add to crontab with: crontab -e
# Example (daily at 02:00):
#   0 2 * * * /path/to/kilele-safaris/backend/scripts/backup.sh >> /var/log/kilele-backup.log 2>&1
set -euo pipefail

BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$BACKEND_DIR"

PYTHON=".venv/bin/python"
if [ ! -x "$PYTHON" ]; then
  echo "Python not found at $PYTHON" >&2
  exit 1
fi

"$PYTHON" kilele_api/manage.py backup_db --keep 30
