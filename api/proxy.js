// Vercel Serverless Function — descarga canciones desde el servidor,
// evitando depender de proxies CORS públicos (inestables/rate-limited).
// Usado por el Conversor de Acordes (conversor/index.html) para importar
// desde lacuerda.net y Cifra Club.

// Los planes gratuitos de Vercel limitan las funciones a 10s de ejecución.
// maxDuration lo deja explícito (y es inofensivo si el plan permite más);
// el timeout interno se queda por debajo para poder responder con un
// error controlado antes de que la plataforma mate la función en seco.
module.exports.config = { maxDuration: 10 };

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
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const upstream = await fetch(parsed.toString(), {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.6',
      },
    });

    if (!upstream.ok) {
      res.status(502).json({ error: `El sitio de origen respondió ${upstream.status}` });
      return;
    }

    const html = await upstream.text();
    if (html.length < 100) {
      res.status(502).json({ error: 'El sitio de origen devolvió una respuesta vacía' });
      return;
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(html);
  } catch (err) {
    const msg = err.name === 'AbortError' ? 'El sitio de origen tardó demasiado en responder' : (err.message || 'Error desconocido');
    res.status(502).json({ error: msg });
  } finally {
    clearTimeout(timer);
  }
};
