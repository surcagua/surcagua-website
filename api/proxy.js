// Vercel Serverless Function — descarga canciones desde el servidor,
// evitando depender de proxies CORS públicos (inestables/rate-limited).
// Usado por el Conversor de Acordes (conversor/index.html) para importar
// desde lacuerda.net y Cifra Club.

const ALLOWED_HOSTS = [/(^|\.)lacuerda\.net$/i, /(^|\.)cifraclub\.com$/i];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  const target = req.query.url;
  if (!target || typeof target !== 'string') {
    res.status(400).json({ error: 'Falta el parámetro url' });
    return;
  }

  let parsed;
  try {
    parsed = new URL(target);
  } catch {
    res.status(400).json({ error: 'URL inválida' });
    return;
  }

  const hostOk = /^https?:$/.test(parsed.protocol) && ALLOWED_HOSTS.some(re => re.test(parsed.hostname));
  if (!hostOk) {
    res.status(400).json({ error: 'Solo se permiten enlaces de lacuerda.net o Cifra Club' });
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);

  try {
    const upstream = await fetch(parsed.toString(), {
      signal: controller.signal,
      headers: {
        'User-Agent': UA,
        'Accept-Language': 'es-ES,es;q=0.9',
      },
    });

    if (!upstream.ok) {
      res.status(502).json({ error: `El sitio respondió ${upstream.status}` });
      return;
    }

    const html = await upstream.text();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(html);
  } catch (err) {
    const msg = err.name === 'AbortError' ? 'Tiempo de espera agotado' : (err.message || 'Error desconocido');
    res.status(502).json({ error: msg });
  } finally {
    clearTimeout(timer);
  }
};
