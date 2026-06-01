// ─── BASE PATH (set via data-base attribute on <script> tag) ──
const BASE = (document.currentScript && document.currentScript.getAttribute('data-base')) || '';

// ─── ICON SVGs ────────────────────────────────────────
const CHEVRON_LEFT  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
const CHEVRON_RIGHT = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
const STAR_SVG      = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="display:inline;vertical-align:middle;margin-right:3px;margin-top:-2px"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

// ─── APP DATA ─────────────────────────────────────────
const apps = [
    {
        id: 'budgely',
        available: false,
        name: 'Budgely',
        category: 'Finanzas Personales',
        logo: BASE + 'assets/budgely/budgely.png',
        iconBg: 'linear-gradient(135deg, #14b8a6, #0d9488)',
        screenshots: [
            BASE + 'assets/budgely/capturas/0x0ss.png',
            BASE + 'assets/budgely/capturas/1x0ss.png',
            BASE + 'assets/budgely/capturas/2x0ss.png',
            BASE + 'assets/budgely/capturas/3x0ss.png'
        ],
        rating: 0.00, downloads: '∞+', version: '1.0.0', size: '∞ MB',
        platforms: ['iOS'],
        shortDesc: 'Control de presupuesto personal con análisis diario, mensual y anual mediante gráficos intuitivos.',
        description: 'Budgely es tu asistente financiero personal que te ayuda a tomar control de tus gastos e ingresos. Registra transacciones de forma rápida, establece presupuestos personalizados por categoría, y visualiza tu salud financiera con gráficos de barras y circulares.',
        features: [
            'Registro rápido de ingresos y gastos',
            'Presupuestos personalizados por categoría',
            'Gráficos circulares y de barras interactivos',
            'Análisis diario, mensual y anual',
            'Categorías personalizables y etiquetas',
            'Dashboard con resumen financiero'
        ],
        techInfo: 'Desarrollada con Flutter. Compatible con iOS 13+. Todos los datos se almacenan localmente en tu dispositivo para máxima privacidad.'
    },
    {
        id: 'silentvault',
        available: false,
        name: 'SilentVault',
        category: 'Privacidad y Seguridad',
        logo: BASE + 'assets/silentvault/silentvault.png',
        iconBg: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        screenshots: [],
        rating: 0.00, downloads: '∞', version: '1.0.0', size: '∞ MB',
        platforms: ['iOS'],
        shortDesc: 'Bóveda privada para ocultar y proteger fotos y videos almacenados localmente.',
        description: 'SilentVault es la solución definitiva para mantener tus fotos y videos privados completamente seguros. Almacenamiento 100% local, tus archivos multimedia nunca salen de tu dispositivo.',
        features: [
            'Almacenamiento 100% local sin nube',
            'Protección con PIN, patrón, huella o Face ID',
            'Importación masiva de fotos y videos',
            'Álbumes organizados por carpetas',
            'Reproductor de video integrado',
            'Papelera de reciclaje con recuperación'
        ],
        techInfo: 'Desarrollada con Flutter nativo para iOS. Compatible con iOS 13+. Sin acceso a internet requerido, funcionamiento 100% offline.'
    },
    {
        id: 'soundforia',
        available: true,
        storeUrl: 'https://apps.apple.com/hn/app/soundforia/id6761750547',
        name: 'Soundforia',
        category: 'Música y Creatividad',
        logo: BASE + 'assets/soundforia/logo.png',
        iconBg: 'linear-gradient(135deg, #ec4899, #db2777)',
        screenshots: [
            BASE + 'assets/soundforia/capturas/1.1.png',
            BASE + 'assets/soundforia/capturas/1.2.png',
            BASE + 'assets/soundforia/capturas/1.3.png',
            BASE + 'assets/soundforia/capturas/1.4.png',
            BASE + 'assets/soundforia/capturas/1.5.png',
            BASE + 'assets/soundforia/capturas/1.6.png',
            BASE + 'assets/soundforia/capturas/1.7.png',
            BASE + 'assets/soundforia/capturas/1.8.png',
            BASE + 'assets/soundforia/capturas/1.9.png',
            BASE + 'assets/soundforia/capturas/1.10.png'
        ],
        rating: 0, version: '1.0.0', size: '120.7 MB', ageRating: '4+',
        developer: 'Jean Carlo Flores',
        releaseDate: 'Mayo 2026',
        compatibility: 'iPhone · iPad · Mac (M1+) · Apple Vision',
        minOS: 'iOS 13.0+',
        platforms: ['iOS'],
        inAppPurchases: [
            'Plan Estándar — $4.99 / mes',
            'Plan Estándar Anual — $49.99 / año',
            'Plan Premium — $9.99 / mes',
            'Plan Premium Anual — $109.99 / año'
        ],
        shortDesc: 'Suite completa para compositores y bandas: crea canciones con acordes, letras y metrónomo profesional.',
        description: 'Soundforia transforma la manera en que los músicos practican y organizan su música. Diseñada para músicos, bandas y grupos que necesitan gestionar su repertorio, Soundforia permite crear listas de canciones, agregar letras y acordes, y practicar con un metrónomo integrado. Con la colaboración en equipo, puedes compartir tu repertorio con hasta 5 miembros de forma gratuita.',
        features: [
            'Editor de letras con posicionamiento de acordes',
            'Biblioteca de acordes de guitarra y piano',
            'Metrónomo profesional con subdivisiones',
            'Transposición automática de tonalidades',
            'Organización por setlists y categorías',
            'Compartir repertorio con la banda (hasta 5 miembros gratis)',
            'Modo presentación pantalla completa'
        ],
        techInfo: 'Desarrollada con Flutter. Compatible con iOS 13+, iPadOS 13+, macOS 11+ (chip M1) y visionOS 1.0+. Requiere conexión a internet para sincronización en la nube.'
    },
    {
        id: 'tuyyo',
        available: false,
        name: 'Tuyyo',
        category: 'Relaciones y Parejas',
        logo: BASE + 'assets/tuyyo/tuyyo.png',
        iconBg: 'linear-gradient(135deg, #f43f5e, #e11d48)',
        screenshots: [
            BASE + 'assets/tuyyo/capturas/0x0ss.png',
            BASE + 'assets/tuyyo/capturas/1x0ss.png',
            BASE + 'assets/tuyyo/capturas/2x0ss.png',
            BASE + 'assets/tuyyo/capturas/3x0ss.png',
            BASE + 'assets/tuyyo/capturas/4x0ss.png',
            BASE + 'assets/tuyyo/capturas/5x0ss.png',
            BASE + 'assets/tuyyo/capturas/6x0ss.png',
            BASE + 'assets/tuyyo/capturas/7x0ss.png',
            BASE + 'assets/tuyyo/capturas/8x0ss.png',
            BASE + 'assets/tuyyo/capturas/9x0ss.png'
        ],
        rating: 0.0, downloads: '∞+', version: '2.5.1', size: '∞ MB',
        platforms: ['iOS'],
        shortDesc: 'La app definitiva para parejas: chat privado, álbum compartido, aniversario, mapas, juegos y más.',
        description: 'Tuyyo es el espacio digital perfecto para fortalecer tu relación. Comparte momentos especiales en tu álbum privado, mantén conversaciones íntimas en el chat cifrado y más.',
        features: [
            'Chat privado',
            'Álbum de fotos compartido',
            'Contador de aniversario y días juntos',
            'Mapa de recuerdos con lugares especiales',
            'Calendario compartido de eventos',
            'Notas y listas compartidas',
            'Mini-juegos para parejas',
            'Línea de tiempo de la relación',
            'Recordatorios de fechas especiales',
            'Tema personalizable con fotos de pareja'
        ],
        techInfo: 'Desarrollada con Flutter y Firebase. Compatible con iOS 13+. Sincronización en tiempo real entre dispositivos con encriptación de datos.'
    }
];

// ─── RENDER CARD ──────────────────────────────────────
function renderAppCard(app) {
    const badges = app.platforms.map(p =>
        `<span class="platform-badge ${p === 'Android' ? 'android' : ''}">${p}</span>`
    ).join('');
    const ratingDisplay = app.rating > 0 ? `${STAR_SVG}${app.rating}` : `${STAR_SVG}Nuevo`;
    const clickAttr = app.available ? `onclick="openModal('${app.id}')"` : '';
    const cardClass = app.available ? 'app-card' : 'app-card coming-soon';
    const soonOverlay = !app.available
        ? `<div class="app-card-soon"><span class="app-card-soon-label">Próximamente</span></div>`
        : '';
    return `
        <div class="${cardClass}" ${clickAttr}>
            ${soonOverlay}
            <div class="app-card-header">
                <div class="app-icon" style="background:${app.iconBg};">
                    <img src="${app.logo}" alt="${app.name}" style="width:100%;height:100%;border-radius:16px;object-fit:cover;">
                </div>
                <div class="app-card-info">
                    <h3>${app.name}</h3>
                    <span class="app-category">${app.category}</span>
                </div>
            </div>
            <div class="app-card-body"><p>${app.shortDesc}</p></div>
            <div class="app-card-footer">
                <div class="app-rating">${ratingDisplay}</div>
                <div class="app-platform">${badges}</div>
            </div>
        </div>`;
}

// ─── INIT APPS ────────────────────────────────────────
function initApps() {
    const homeGrid  = document.getElementById('homeAppsGrid');
    const allGrid   = document.getElementById('allAppsGrid');
    const appSelect = document.getElementById('app');
    const heroBento = document.getElementById('heroBento');

    if (homeGrid) homeGrid.innerHTML = apps.map(renderAppCard).join('');
    if (allGrid)  allGrid.innerHTML  = apps.map(renderAppCard).join('');

    if (heroBento) {
        const availableApps = apps.filter(a => a.available);
        heroBento.innerHTML = `
            <div class="hero-carousel-track">
                ${availableApps.map((app, i) => `
                    <div class="hero-carousel-item${i === 0 ? ' active' : ''}" onclick="openModal('${app.id}')" title="${app.name}">
                        <img src="${app.logo}" alt="${app.name}">
                    </div>`).join('')}
            </div>`;

        let current = 0;
        const items = heroBento.querySelectorAll('.hero-carousel-item');

        function goTo(next) {
            if (next === current) return;
            const prev = current;
            items[prev].classList.remove('active');
            items[prev].classList.add('leaving');
            current = next;
            items[current].classList.add('active');
            setTimeout(() => items[prev].classList.remove('leaving'), 450);
        }

        function advance() { goTo((current + 1) % availableApps.length); }
        if (availableApps.length > 1) setInterval(advance, 2800);
    }

    if (appSelect) {
        apps.forEach(app => {
            const opt = document.createElement('option');
            opt.value = app.id;
            opt.textContent = app.name;
            appSelect.appendChild(opt);
        });
        const other = document.createElement('option');
        other.value = 'other';
        other.textContent = 'Otra / General';
        appSelect.appendChild(other);
    }

    initSpotlightCards();
}

// ─── MODAL ────────────────────────────────────────────
function openModal(appId) {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    document.getElementById('modalIcon').style.background = app.iconBg;
    document.getElementById('modalIcon').innerHTML =
        `<img src="${app.logo}" alt="${app.name}" style="width:100%;height:100%;border-radius:20px;object-fit:cover;">`;
    document.getElementById('modalTitle').textContent    = app.name;
    document.getElementById('modalCategory').textContent = app.category;
    document.getElementById('modalDescription').textContent = app.description;

    document.getElementById('modalStats').innerHTML = `
        <div class="modal-stat"><div class="val">${app.size || '—'}</div><div class="lbl">Tamaño</div></div>
        <div class="modal-stat"><div class="val">v${app.version}</div><div class="lbl">Versión</div></div>
        <div class="modal-stat"><div class="val">${app.ageRating || '4+'}</div><div class="lbl">Edad</div></div>`;

    const screenshotsSection = document.getElementById('screenshotsSection');
    if (app.screenshots && app.screenshots.length > 0) {
        window.currentAppScreenshots = app.screenshots;
        window.currentAppName        = app.name;
        screenshotsSection.innerHTML = `
            <h3>Vista previa</h3>
            <div class="modal-screenshots" id="modalScreenshots">
                <button class="screenshot-nav prev" onclick="scrollScreenshots('prev')" aria-label="Anterior">${CHEVRON_LEFT}</button>
                <button class="screenshot-nav next" onclick="scrollScreenshots('next')" aria-label="Siguiente">${CHEVRON_RIGHT}</button>
                <div class="screenshots-container" id="screenshotsContainer">
                    ${app.screenshots.map((src, i) =>
                        `<div class="screenshot-wrapper">
                            <img src="${src}" alt="${app.name} ${i+1}" class="screenshot-image" onclick="openLightbox(${i})">
                        </div>`
                    ).join('')}
                </div>
                <div class="screenshot-counter"><span id="screenshotCounter">1</span> / ${app.screenshots.length}</div>
            </div>`;
        setTimeout(() => {
            const c = document.getElementById('screenshotsContainer');
            if (c) c.addEventListener('scroll', updateScreenshotCounter);
        }, 100);
    } else {
        screenshotsSection.innerHTML = `
            <h3>Vista previa</h3>
            <div class="modal-screenshots">
                <div class="screenshots-container">
                    <div class="screenshot-placeholder">Próximamente</div>
                </div>
            </div>`;
    }

    document.getElementById('modalFeatures').innerHTML =
        app.features.map(f => `<li>${f}</li>`).join('');

    document.getElementById('modalTechInfo').innerHTML = [
        app.techInfo,
        app.compatibility ? `<br><br><strong>Compatibilidad:</strong> ${app.compatibility}` : '',
        app.minOS        ? ` — ${app.minOS}` : '',
        app.developer    ? `<br><strong>Desarrollador:</strong> ${app.developer}` : '',
        app.releaseDate  ? `<br><strong>Publicada:</strong> ${app.releaseDate}` : ''
    ].join('');

    const inAppEl = document.getElementById('modalInAppPurchases');
    if (inAppEl) {
        if (app.inAppPurchases && app.inAppPurchases.length > 0) {
            inAppEl.style.display = '';
            inAppEl.querySelector('ul').innerHTML =
                app.inAppPurchases.map(p => `<li>${p}</li>`).join('');
        } else {
            inAppEl.style.display = 'none';
        }
    }

    const headerActionEl = document.getElementById('modalHeaderAction');
    if (headerActionEl) {
        if (app.available && app.storeUrl) {
            headerActionEl.innerHTML =
                `<a href="${app.storeUrl}" class="btn btn-primary btn-store-header" target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    App Store
                </a>`;
        } else {
            headerActionEl.innerHTML = '';
        }
    }
    document.getElementById('modalActions').innerHTML =
        `<a href="${BASE}soporte/index.html" class="btn btn-ghost">Soporte</a>`;

    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function closeModalOutside(e) {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
}

// ─── SCREENSHOTS ──────────────────────────────────────
function scrollScreenshots(dir) {
    const c = document.getElementById('screenshotsContainer');
    if (c) c.scrollBy({ left: dir === 'prev' ? -196 : 196, behavior: 'smooth' });
}

function updateScreenshotCounter() {
    const c       = document.getElementById('screenshotsContainer');
    const counter = document.getElementById('screenshotCounter');
    if (c && counter) counter.textContent = Math.round(c.scrollLeft / 196) + 1;
}

// ─── LIGHTBOX ─────────────────────────────────────────
let currentLightboxIndex = 0;

function openLightbox(index) {
    const screenshots = window.currentAppScreenshots;
    if (!screenshots || !screenshots.length) return;
    currentLightboxIndex = index;

    // Preload all screenshots so navigation is instant
    screenshots.forEach(src => { const p = new Image(); p.src = src; });

    const lb      = document.getElementById('lightboxOverlay');
    const img     = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');

    img.src             = screenshots[index];
    img.alt             = `${window.currentAppName} ${index + 1}`;
    counter.textContent = `${index + 1} / ${screenshots.length}`;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
    if (e && e.target !== document.getElementById('lightboxOverlay') && e.type === 'click') return;
    document.getElementById('lightboxOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(dir) {
    const screenshots = window.currentAppScreenshots;
    if (!screenshots) return;
    currentLightboxIndex = (currentLightboxIndex + dir + screenshots.length) % screenshots.length;
    const img     = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');
    img.src             = screenshots[currentLightboxIndex];
    img.alt             = `${window.currentAppName} ${currentLightboxIndex + 1}`;
    counter.textContent = `${currentLightboxIndex + 1} / ${screenshots.length}`;
}

// ─── KEYBOARD ─────────────────────────────────────────
document.addEventListener('keydown', e => {
    const lb    = document.getElementById('lightboxOverlay');
    const modal = document.getElementById('modalOverlay');
    if (lb && lb.classList.contains('active')) {
        if (e.key === 'Escape')     closeLightbox();
        if (e.key === 'ArrowLeft')  navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    } else if (modal && modal.classList.contains('active')) {
        if (e.key === 'Escape') closeModal();
    }
});

// ─── AUTO-INIT ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initApps);
