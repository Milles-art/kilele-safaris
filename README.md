# Kilele Safaris — React recreation

A faithful React + Vite recreation of the Kilele Safaris multi-page site from
`https://animated-wildlife-tours-305046.onhercules.app/`.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Pages

- `/` — Home: parallax hero, animated cloud layers, scrolling place marquee,
  horizontal-scroll wildlife gallery, scroll-expanding summit section,
  game-drive slider, signature journeys, animated counters, contact CTA.
- `/safaris` — Six trip cards with category filters (`?type=Safari|Trek|Beach|Combo`).
- `/safaris/:slug` — Detail pages for all six trips: facts, highlights,
  day-by-day itinerary, included/excluded, sticky booking card, related trips.
- `/destinations` — Eight destinations with sticky month filter (`?month=0..11`),
  season calendars, wildlife tags and related trips.
- `/about` — Story, timeline, promises, impact stats, guides, CTA.
- `/contact` — Enquiry form (trip, dates, guests, details) and contact cards.

## Implementation

- Original compiled Tailwind v4 stylesheet (`src/original.css`) for exact
  colors, typography and utilities.
- All original image assets in `public/images/` (same CDN renditions).
- Fonts: Fraunces (serif), Outfit (sans), Geist Mono.
- A small history-based router in `src/router.jsx` handles client-side
  navigation, query params, and the browser back button.
- Framer Motion recreates all reveals, hovers and scroll-linked parallax.
  Scroll-linked values are computed directly from scroll progress in JS for
  pixel accuracy independent of Motion's WAAPI keyframe generation.
- Responsive layout with a mobile menu on all pages.

## Backend (Django)

The enquiry form is backed by a Django REST Framework API in `backend/`.

- `backend/kilele_api/kilele_api/` — Django project (settings, urls)
- `backend/kilele_api/enquiries/` — app with model, serializer, view, admin

**API:** `POST /api/enquiries` — validates, saves to SQLite, then sends two emails
(console backend in development): a notification to the team and a confirmation
to the traveller. Browse submissions at `/admin`.

The contact form has client-side validation, field-level error display from DRF,
a loading state, a thank-you confirmation with a reference number, and a reset
button.

**Run the backend tests:**
```bash
cd backend
.venv/bin/python kilele_api/manage.py test enquiries
```

### Production-grade backend features

- **Environment config:** all secrets/settings come from `backend/.env` (copy
  `.env.example` and fill in real values — never commit `.env`).
- **Security:** no hardcoded secret key, `DEBUG` from env, `ALLOWED_HOSTS`,
  trusted CSRF origins, and automatic HTTPS/HSTS/secure-cookie hardening when
  `DEBUG=False`.
- **Real email delivery:** set `EMAIL_HOST` etc. in `.env` for SMTP; if left
  empty, emails print to the console for local testing.
- **Spam protection:** per-IP rate limiting (default 5/hour, file-based cache
  shared across gunicorn workers) + a hidden honeypot field that silently
  discards bot submissions.
- **Logging:** rotating file log at `backend/kilele_api/logs/kilele.log` plus
  console output; errors and security events are logged.
- **Hardening:** the public API disables session auth/CSRF (it's a stateless
  public endpoint protected by rate limiting + honeypot), stores visitor IPs,
  and a failed email never loses a saved enquiry.
- **Health check:** `GET /api/health`.
- **Dependencies pinned** in `backend/requirements.txt`; `gunicorn` included
  for running the app with multiple workers.
- **HTML email templates** with inline CSS (Gmail/Outlook compatible) plus plain-text
  alternatives: `templates/emails/new_enquiry.html` and `enquiry_confirmation.html`.
- **Automated backups:** `python manage.py backup_db --keep 30` uses SQLite's online
  backup API (consistent even with active connections) and prunes old copies.
  `backend/scripts/backup.sh` is a cron-ready wrapper — add to crontab for daily backups.
- **15 automated tests**, all passing (`python manage.py test enquiries`).

### Cron example (daily backup at 2am)
```
0 2 * * * /path/to/kilele-safaris/backend/scripts/backup.sh >> /var/log/kilele-backup.log 2>&1
```

**Important:** the frontend calls the **relative** URL `/api/enquiries`.
`vite.config.js` proxies `/api` → `http://localhost:8000`, so the same code works
locally and through the public ngrok link (which only tunnels port 5173). No CORS
issues because the browser sees a same-origin request.

### Run the full stack locally

Terminal 1 (Django):
```bash
cd backend
source .venv/bin/activate
python kilele_api/manage.py runserver
```

Terminal 2 (Vite):
```bash
npm run dev
```

Then open http://localhost:5173/contact and submit the form.

### Public share link

An ngrok tunnel exposes the Vite server (port 5173) at:
**https://multiply-impart-pastrami.ngrok-free.dev**

Because Vite proxies `/api` to Django, the form works for anyone using that link
as long as both local servers are running. The link lasts only while the
tunnel/dev servers are up; regenerate with `ngrok http 5173` if it expires.
