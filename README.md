# Wong Chuan Sern — Personal Portfolio

Personal portfolio site for **Wong Chuan Sern**, Pre-Sales Solution Architect specialising in network observability, AIOps, and enterprise cloud solutions.

🔗 **Live site:** https://chuan77.github.io/ict6001c_lab10/

---

## Overview

Plain HTML/CSS/JS — no frameworks, no build step. Push to `main` and GitHub Actions publishes to GitHub Pages automatically.

## Structure

```
public/
├── index.html   # All sections and markup
├── style.css    # Design tokens, layout, dark & light themes
└── main.js      # Nav behaviour, scroll-reveal, GitHub API repo fetch, theme toggle
.github/
└── workflows/
    └── deploy.yml   # GitHub Pages deploy on push to main
```

## Sections

| ID | Content |
|----|---------|
| `#hero` | Name, title, tagline, LinkedIn / GitHub / Contact links |
| `#about` | Bio and key stats |
| `#skills` | Six skill-group cards across networking, cloud, AIOps, pre-sales, and leadership |
| `#projects` | Six curated project highlight cards |
| `#repos` | Public GitHub repositories fetched live from the GitHub API |
| `#contact` | Email, GitHub, and LinkedIn cards |

## Features

- **Dark / light mode toggle** — sun/moon button in the nav; choice persisted for the session via `sessionStorage`
- **Scroll-reveal animations** — `IntersectionObserver`-driven fade-in on every card and section heading
- **Live GitHub repos** — fetched client-side from `api.github.com/users/chuan77/repos`; fails gracefully if the API is unavailable
- **Fully responsive** — no horizontal scroll at 375 px

## Local development

```bash
# Python (no install required)
python3 -m http.server 3131 --directory public
# then open http://localhost:3131
```

## Deployment

Merging to `main` triggers `.github/workflows/deploy.yml`, which publishes `public/` to GitHub Pages via OIDC (no PAT needed).

**One-time setup:** go to *Settings → Pages → Source* and select **GitHub Actions**.
