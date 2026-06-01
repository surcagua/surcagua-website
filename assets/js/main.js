// ─── ICON SVGs ────────────────────────────────────────
const SUN_SVG  = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const MOON_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

// ─── THEME ────────────────────────────────────────────
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        icon.innerHTML = SUN_SVG;
        localStorage.setItem('theme', 'light');
    } else {
        icon.innerHTML = MOON_SVG;
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const saved = localStorage.getItem('theme');
    const icon  = document.getElementById('themeIcon');
    if (saved === 'dark') {
        document.body.classList.remove('light-mode');
        icon.innerHTML = MOON_SVG;
    } else {
        document.body.classList.add('light-mode');
        icon.innerHTML = SUN_SVG;
    }
}

// ─── MOBILE MENU ──────────────────────────────────────
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
    document.getElementById('menuBtn').classList.toggle('open');
}

// ─── FAQ ──────────────────────────────────────────────
function toggleFaq(btn) {
    const item   = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(fi => {
        fi.classList.remove('open');
        fi.querySelector('.faq-answer').style.maxHeight = '0';
    });

    if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }
}

// ─── SPOTLIGHT CARDS ──────────────────────────────────
function initSpotlightCards() {
    document.querySelectorAll('.app-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', (e.clientX - r.left) + 'px');
            card.style.setProperty('--mouse-y', (e.clientY - r.top) + 'px');
        });
        card.addEventListener('mouseleave', () => {
            card.style.removeProperty('--mouse-x');
            card.style.removeProperty('--mouse-y');
        });
    });
}

// ─── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();

    window.addEventListener('scroll', () => {
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('navLinks').classList.remove('open');
            document.getElementById('menuBtn').classList.remove('open');
        });
    });
});
