// Vercel Serverless Function — reseñas reales de App Store.
//
// Apple no ofrece una API pública con clave para esto, pero sí expone un
// feed RSS/JSON de reseñas por app (sin autenticación): lo consumimos
// desde el servidor para evitar CORS y para poder cachear la respuesta.
//
// Detalle importante: las reseñas viven en el storefront (país) donde el
// usuario que las escribió tiene su cuenta de Apple — no existe un feed
// "global". Por eso se consultan varios países en paralelo y se combinan.
module.exports.config = { maxDuration: 10 };

// Storefronts donde es más probable encontrar reseñas de estas apps
// (Honduras primero, resto de Latinoamérica + los grandes globales).
const DEFAULT_COUNTRIES = ['hn', 'mx', 'us', 'es', 'gt', 'sv', 'co', 'ar'];

const MAX_REVIEWS   = 20;
const CACHE_TTL_MS  = 30 * 60 * 1000;       // 30 min en memoria del proceso
const FETCH_TIMEOUT = 7000;                  // por país, deja margen bajo maxDuration

// Caché de proceso: mientras la función siga "caliente" entre invocaciones
// evita volver a golpear a Apple por cada visitante.
const cache = new Map();

module.exports = async (req, res) => {
  const id = String(req.query.id || '').trim();
  if (!/^\d+$/.test(id)) {
    res.status(400).json({ error: 'Falta o es inválido el parámetro id (App Store track id numérico)', reviews: [] });
    return;
  }

  const requested = String(req.query.countries || '')
    .split(',').map(c => c.trim().toLowerCase()).filter(Boolean);
  const targets = requested.length ? requested : DEFAULT_COUNTRIES;

  const cacheKey = `${id}:${targets.join(',')}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
    res.setHeader('X-Cache', 'HIT');
    res.status(200).json({ reviews: cached.data });
    return;
  }

  try {
    const perCountry = await Promise.allSettled(targets.map(cc => fetchCountryReviews(id, cc)));

    const merged = new Map();
    for (const result of perCountry) {
      if (result.status !== 'fulfilled') continue;
      for (const review of result.value) merged.set(review.id, review);
    }

    const reviews = [...merged.values()]
      .sort((a, b) => new Date(b.updated) - new Date(a.updated))
      .slice(0, MAX_REVIEWS);

    cache.set(cacheKey, { ts: Date.now(), data: reviews });

    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
    res.setHeader('X-Cache', 'MISS');
    res.status(200).json({ reviews });
  } catch (err) {
    // Degradación controlada: el frontend siempre recibe JSON válido con
    // reviews: [] en vez de un 500 que rompa el render de la sección.
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ reviews: [], error: err.message || 'Error desconocido' });
  }
};

async function fetchCountryReviews(id, country) {
  const url = `https://itunes.apple.com/${encodeURIComponent(country)}/rss/customerreviews/id=${id}/sortBy=mostRecent/page=1/json`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const upstream = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
    if (!upstream.ok) return [];

    const json = await upstream.json();
    const entries = normalizeEntries(json && json.feed && json.feed.entry);

    return entries
      // La primera entrada del feed suele ser metadata de la app, no una
      // reseña: se distingue porque no trae im:rating ni content.
      .filter(e => e['im:rating'] && e.content && e.content.label && e.content.label.trim())
      .map(e => ({
        id:       `${country}-${label(e.id) || Math.random().toString(36).slice(2)}`,
        author:   (e.author && label(e.author.name)) || 'Usuario de App Store',
        rating:   parseInt(label(e['im:rating']), 10) || 0,
        title:    (label(e.title) || '').trim(),
        content:  (label(e.content) || '').trim(),
        version:  label(e['im:version']) || '',
        votes:    parseInt(label(e['im:voteSum']), 10) || 0,
        updated:  label(e.updated) || new Date().toISOString(),
        country,
      }));
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

function normalizeEntries(entry) {
  if (!entry) return [];
  return Array.isArray(entry) ? entry : [entry];
}

function label(field) {
  return field && typeof field.label === 'string' ? field.label : null;
}
