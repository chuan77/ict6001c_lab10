/* ── Theme toggle (dark ↔ light, persisted in sessionStorage) ────────────── */
(function () {
  const saved = sessionStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('themeToggle');
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    if (next === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      sessionStorage.removeItem('theme');
    } else {
      document.documentElement.setAttribute('data-theme', next);
      sessionStorage.setItem('theme', next);
    }
  });
});

/* ── Nav: scroll shadow + mobile toggle ──────────────────────────────────── */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Scroll-reveal ───────────────────────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.section__title, .section__sub, .about__text, .stat, ' +
  '.skill-group, .project-card, .repo-card, .contact-card, .hero__eyebrow, ' +
  '.hero__name, .hero__tagline, .hero__links'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = `${(i % 6) * 60}ms`;
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ── GitHub Repos ────────────────────────────────────────────────────────── */
const LANG_COLORS = {
  Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#2b7489',
  HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051',
  Go: '#00ADD8', Rust: '#dea584', Java: '#b07219',
};

function repoCard(repo) {
  const lang = repo.language || '';
  const dot = lang
    ? `<span class="lang-dot" style="background:${LANG_COLORS[lang] || '#8899b4'}"></span>${lang}`
    : '';
  const stars = repo.stargazers_count > 0
    ? `<span class="repo-card__stars">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.517 1.48-8.279L0 9.306l8.332-1.151z"/></svg>
        ${repo.stargazers_count}
      </span>`
    : '';

  const a = document.createElement('a');
  a.className = 'repo-card reveal';
  a.href = repo.html_url;
  a.target = '_blank';
  a.rel = 'noopener';
  a.dataset.lang = lang;
  a.innerHTML = `
    <div class="repo-card__name">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
      ${repo.name}
    </div>
    <p class="repo-card__desc">${repo.description || '<em style="opacity:.5">No description</em>'}</p>
    <div class="repo-card__meta">
      ${lang ? `<span class="repo-card__lang">${dot}</span>` : ''}
      ${stars}
    </div>
  `;
  return a;
}

async function loadRepos() {
  const grid = document.getElementById('reposGrid');
  try {
    const res = await fetch('https://api.github.com/users/chuan77/repos?sort=updated&per_page=12');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const repos = await res.json();

    grid.innerHTML = '';

    if (!repos.length) {
      grid.innerHTML = '<p class="repos__empty">No public repositories found.</p>';
      return;
    }

    repos.forEach(repo => {
      const card = repoCard(repo);
      grid.appendChild(card);
      observer.observe(card);
    });
  } catch (err) {
    grid.innerHTML = `
      <div class="repos__empty">
        <p>Could not load repositories right now.</p>
        <p style="margin-top:8px;font-size:.85rem;">
          <a href="https://github.com/chuan77" target="_blank" rel="noopener"
             style="color:#3b82f6;text-decoration:underline">
            View on GitHub →
          </a>
        </p>
      </div>`;
  }
}

loadRepos();
