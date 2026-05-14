// ─── THEME ────────────────────────────────────────────
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        icon.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        icon.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const saved = localStorage.getItem('theme');
    const icon  = document.getElementById('themeIcon');
    if (saved === 'dark') {
        document.body.classList.remove('light-mode');
        icon.textContent = '🌙';
    } else {
        document.body.classList.add('light-mode');
        icon.textContent = '☀️';
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

// ─── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('navLinks').classList.remove('open');
            document.getElementById('menuBtn').classList.remove('open');
        });
    });
});
