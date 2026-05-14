// ─── BASE PATH (set via data-base attribute on <script> tag) ──
const BASE = (document.currentScript && document.currentScript.getAttribute('data-base')) || '';

// ─── APP DATA ─────────────────────────────────────────
const apps = [
    {
        id: 'budgely',
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
        name: 'Soundforia',
        category: 'Música y Creatividad',
        logo: BASE + 'assets/soundforia/soundforia.png',
        iconBg: 'linear-gradient(135deg, #ec4899, #db2777)',
        screenshots: [
            BASE + 'assets/soundforia/capturas/0x0ss.png',
            BASE + 'assets/soundforia/capturas/1x0ss.png',
            BASE + 'assets/soundforia/capturas/2x0ss.png',
            BASE + 'assets/soundforia/capturas/3x0ss.png'
        ],
        rating: 0.00, downloads: '∞+', version: '1.0.0', size: '∞ MB',
        platforms: ['iOS'],
        shortDesc: 'Suite completa para compositores y bandas: crea canciones con acordes, letras y metrónomo profesional.',
        description: 'Soundforia es la aplicación perfecta para músicos, compositores y bandas que quieren organizar sus canciones de forma profesional.',
        features: [
            'Editor de letras con posicionamiento de acordes',
            'Biblioteca de acordes de guitarra y piano',
            'Metrónomo profesional con subdivisiones',
            'Transposición automática de tonalidades',
            'Organización por setlists y categorías',
            'Compartir canciones con la banda',
            'Modo presentación pantalla completa'
        ],
        techInfo: 'Desarrollada con Flutter. Compatible con iOS 13+. Sincronización opcional en la nube para trabajo colaborativo.'
    },
    {
        id: 'tuyyo',
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
    return `
        <div class="app-card" onclick="openModal('${app.id}')">
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
                <div class="app-rating">★ ${app.rating}</div>
                <div class="app-platform">${badges}</div>
            </div>
        </div>`;
}

// ─── INIT APPS ────────────────────────────────────────
function initApps() {
    const homeGrid  = document.getElementById('homeAppsGrid');
    const allGrid   = document.getElementById('allAppsGrid');
    const appSelect = document.getElementById('app');

    if (homeGrid) homeGrid.innerHTML  = apps.map(renderAppCard).join('');
    if (allGrid)  allGrid.innerHTML   = apps.map(renderAppCard).join('');

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
        <div class="modal-stat"><div class="val">★ ${app.rating}</div><div class="lbl">Calificación</div></div>
        <div class="modal-stat"><div class="val">${app.downloads}</div><div class="lbl">Descargas</div></div>
        <div class="modal-stat"><div class="val">v${app.version}</div><div class="lbl">Versión</div></div>`;

    const screenshotsSection = document.getElementById('screenshotsSection');
    if (app.screenshots && app.screenshots.length > 0) {
        window.currentAppScreenshots = app.screenshots;
        window.currentAppName        = app.name;
        screenshotsSection.innerHTML = `
            <h3>🖼️ Vista previa</h3>
            <div class="modal-screenshots" id="modalScreenshots">
                <button class="screenshot-nav prev" onclick="scrollScreenshots('prev')" aria-label="Anterior">‹</button>
                <button class="screenshot-nav next" onclick="scrollScreenshots('next')" aria-label="Siguiente">›</button>
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
            <h3>🖼️ Vista previa</h3>
            <div class="modal-screenshots">
                <div class="screenshots-container">
                    <div class="screenshot-placeholder">📸 Próximamente</div>
                </div>
            </div>`;
    }

    document.getElementById('modalFeatures').innerHTML =
        app.features.map(f => `<li>${f}</li>`).join('');
    document.getElementById('modalTechInfo').textContent = app.techInfo;

    const storeLinks = app.platforms.map(p =>
        p === 'iOS'
            ? `<a href="#" class="btn btn-primary" onclick="event.preventDefault()"><span>🍎</span> App Store</a>`
            : `<a href="#" class="btn btn-secondary" onclick="event.preventDefault()"><span>🤖</span> Google Play</a>`
    ).join('');
    document.getElementById('modalActions').innerHTML = storeLinks +
        `<a href="${BASE}soporte/index.html" class="btn btn-ghost">💬 Soporte</a>`;

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

    const lb      = document.getElementById('lightboxOverlay');
    const img     = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');

    img.src           = screenshots[index];
    img.alt           = `${window.currentAppName} ${index + 1}`;
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
    img.src           = screenshots[currentLightboxIndex];
    img.alt           = `${window.currentAppName} ${currentLightboxIndex + 1}`;
    counter.textContent = `${currentLightboxIndex + 1} / ${screenshots.length}`;
}

// ─── KEYBOARD ─────────────────────────────────────────
document.addEventListener('keydown', e => {
    const lb    = document.getElementById('lightboxOverlay');
    const modal = document.getElementById('modalOverlay');
    if (lb && lb.classList.contains('active')) {
        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowLeft')   navigateLightbox(-1);
        if (e.key === 'ArrowRight')  navigateLightbox(1);
    } else if (modal && modal.classList.contains('active')) {
        if (e.key === 'Escape') closeModal();
    }
});

// ─── AUTO-INIT ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initApps);
