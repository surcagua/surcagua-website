# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Official website for **Surcagua Studio**, an indie iOS app studio from Honduras. The site showcases four apps (Budgely, SilentVault, Soundforia, Tuyyo) and handles support contact. It is a **no-build, pure HTML/CSS/JS static site** — there is no package manager, no bundler, and no compilation step.

Deployed to Cloudflare Workers with Static Assets. Every push to `main` auto-deploys to production in 1–2 minutes.

## Development

Since there is no build system, development is just opening files in a browser or running a local HTTP server:

```bash
# Serve locally (Python, available on most systems)
python3 -m http.server 8080
# or
npx serve .
```

Open `http://localhost:8080` in a browser. There are no tests, no linting config, and no CI scripts.

## Architecture

### Page structure

Each page lives in its own directory with an `index.html`:

```
index.html            ← Homepage
apps/index.html       ← All apps listing
acerca-de/index.html  ← About page
soporte/index.html    ← Support + contact form
terminos/index.html   ← Terms of service
privacidad/index.html ← Privacy policy
```

All pages share the same nav/footer markup (copy-pasted per page — there is no templating system). When adding or changing nav links, update every page.

### JavaScript — two shared files

**[assets/js/main.js](assets/js/main.js)** — UI behaviors loaded on every page:
- `toggleTheme()` / `loadTheme()`: dark/light mode via `body.classList.toggle('light-mode')`, persisted in `localStorage`
- `toggleMenu()`: mobile hamburger nav
- `toggleFaq()`: accordion FAQ (used only on soporte)
- Navbar scroll effect (adds `.scrolled` class when `scrollY > 20`)

**[assets/js/apps.js](assets/js/apps.js)** — App catalog and interactive components:
- `apps[]` array: the single source of truth for all app data (name, description, features, screenshots, colors)
- `renderAppCard()` / `initApps()`: renders cards into `#homeAppsGrid` (index) and `#allAppsGrid` (apps page)
- `openModal()` / `closeModal()`: full-screen app detail modal
- `openLightbox()` / `navigateLightbox()` / `closeLightbox()`: screenshot lightbox
- `scrollScreenshots()`: horizontal screenshot carousel inside the modal

### The `data-base` path mechanism

Pages in subdirectories include `apps.js` with a `data-base` attribute pointing back to the root:

```html
<!-- from apps/index.html, acerca-de/index.html, etc. -->
<script data-base="../" src="../assets/js/apps.js"></script>

<!-- from index.html (root) -->
<script data-base="" src="assets/js/apps.js"></script>
```

Inside `apps.js`, `BASE` is read from this attribute and prepended to all asset paths. Always set `data-base` correctly when adding a page at a new directory depth.

### Styling

Single stylesheet: **[assets/css/main.css](assets/css/main.css)**

- All design tokens are CSS custom properties on `:root` (dark mode defaults)
- Light mode overrides a subset of those variables on `body.light-mode`
- 6 responsive breakpoints covering mobile-small through desktop
- Minimum touch target: 44×44px (Apple HIG)

### Routing and redirects

- `vercel.json` — Vercel routing config (rewrites + redirects)
- `_redirects` — Cloudflare Pages / Netlify format (same rules)
- `/privacy` and `/terms` redirect to the Spanish URLs

### Contact form

The support form on `soporte/index.html` POSTs to **FormSubmit.co** (`support@surcaguastudio.com`). The `handleFormSubmit()` function uses `fetch()` with a `FormData` body, and falls back to a native form submit on network error. No backend is required.

## Adding a new app

1. Add an entry to the `apps` array in [assets/js/apps.js](assets/js/apps.js) following the existing schema
2. Add app assets under `assets/<appid>/` (icon PNG + `capturas/` folder for screenshots)
3. The card and modal render automatically — no HTML changes needed

## Hosting and contact

- **Production URL:** surcaguastudio.com
- **Support email:** support@surcaguastudio.com
- **Hosting:** Cloudflare Workers (Static Assets)
- **Email routing:** Cloudflare Email Routing → Gmail
