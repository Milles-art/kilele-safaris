"""Create a timestamped backup of the SQLite database.

Usage: python manage.py backup_db
       python manage.py backup_db --keep 30     (delete backups older than 30 days)
"""

import shutil
from datetime import timedelta
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone


class Command(BaseCommand):
    help = 'Back up the SQLite database to BACKUP_DIR (default: BASE_DIR/backups).'

    def add_arguments(self, parser):
        parser.add_argument('--keep', type=int, default=30, help='Days of backups to retain.')

    def handle(self, *args, **options):
        db_path = settings.DATABASES['default']['NAME']
        if isinstance(db_path, str):
            db_path = Path(db_path)
        if not db_path.exists():
            self.stderr.write(self.style.ERROR(f'Database not found: {db_path}'))
            return

        backup_dir = Path(getattr(settings, 'BACKUP_DIR', settings.BASE_DIR / 'backups'))
        backup_dir.mkdir(parents=True, exist_ok=True)

        stamp = timezone.now().strftime('%Y%m%d_%H%M%S')
        destination = backup_dir / f'kilele_{stamp}.sqlite3'

        # SQLite backup API keeps the copy consistent even with active connections.
        import sqlite3
        source = sqlite3.connect(str(db_path))
        target = sqlite3.connect(str(destination))
        with target:
            source.backup(target)
        target.close()
        source.close()

        self.stdout.write(self.style.SUCCESS(f'Backup created: {destination}'))

        keep = options['keep']
        cutoff = timezone.now() - timedelta(days=keep)
        removed = 0
        for old in backup_dir.glob('kilele_*.sqlite3'):
            if old.stat().st_mtime < cutoff.timestamp():
                old.unlink()
                removed += 1
        if removed:
            self.stdout.write(f'Removed {removed} old backup(s).')
