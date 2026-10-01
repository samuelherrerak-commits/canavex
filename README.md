# CANAVEX Auto Keys · Identidad visual y contenido de octubre 2026

Sitio estático (HTML, CSS y JS sin framework) con:

- **`index.html`**: manual de marca. Logo rediseñado, color, tipografía, pictogramas, movimiento y voz bilingüe.
- **`octubre.html`**: calendario de octubre con **7 reels, 7 carruseles e historias de lunes a viernes**, en español e inglés. Al tocar un día se ven las piezas, el texto para copiar y los archivos para descargar.
- **`exports/`**: todo listo para subir:
  - `reels/reel-01-es.mp4`: 1080×1920, 30 fps, H.264, sin audio, con su portada `.jpg`.
  - `carruseles/carrusel-01-es/01.png`…: 1080×1350.
  - `historias/2026-10-01-es-1.png`: 1080×1920, 2 pantallas por día.
- **`assets/logo/`**: logo en SVG, con la tipografía convertida a trazos (vertical, horizontal, solo palabra, símbolo y avatar; en versión color, sobre tinta, sobre verde y una tinta).

## Ver el sitio

Puedes abrir `index.html` directo en el navegador. Para publicarlo, sube la carpeta tal cual a cualquier hosting estático (Netlify, Vercel, GitHub Pages o Cloudflare Pages). Para probarlo en local:

```bash
npm run serve   # http://localhost:4321
```

## Cambiar teléfono, usuario o zona

1. Edita `assets/js/brand.js`. **El número `(555) 000-0000` y `@canavexautokeys` son de ejemplo.**
2. Vuelve a generar los archivos:

```bash
npm install          # instala Playwright (una sola vez)
npm run export       # todo; o export:reels / export:carruseles / export:historias
```

Para los reels hace falta `ffmpeg` instalado. Los textos de todo el mes están en `assets/js/content.js`.

## Cómo está hecho el movimiento

Los reels se arman en el navegador (`assets/js/frames.js`) con una línea de tiempo determinista: `reel.seek(ms)` deja exactamente ese cuadro. El exportador recorre los cuadros uno por uno y se los pasa a ffmpeg, así que el MP4 se ve igual que la vista previa. Puedes ver cualquier reel en vivo con `render.html?type=reel&id=3&lang=en&play`.

Guion de cada reel (≈14 s): gancho → problema con pictograma animado → **transición de ojo de cerradura** (la firma) → solución en verde → cierre con logo y contacto.

Curvas y tiempos según los principios de animación de Emil Kowalski: ease-out fuerte para entrar, ease-in-out fuerte para mover, nada empieza desde `scale(0)`, solo `transform`, `opacity`, `clip-path` y máscara, y una versión para `prefers-reduced-motion` en el sitio. El diseño sigue las reglas de Impeccable: una sola familia tipográfica, sin degradados de texto ni efectos de vidrio de adorno, controles nativos del navegador con estilo propio y contraste AA o mejor.

## Datos que conviene confirmar con el cliente

El contenido supone cosas que no venían en el brief:

- **Servicio móvil** ("vamos a donde estás"). Aparece en varios textos.
- **Servicios**: aperturas, llaves nuevas sin la original, programación de controles y smart keys, extracción de llaves partidas, reparación de switch y copias.
- **"Abrimos sin dañar"**: es lo habitual en el rubro, pero lo dice el negocio, no nosotros.
- No se prometen tiempos de llegada, precios ni horario 24/7. Si el negocio los ofrece, se pueden agregar en `content.js`.

## Tipografía

Archivo (Google Fonts, licencia SIL OFL), servida desde `assets/fonts/`. Para titulares: ancho 125 y peso 900. Para texto: ancho 100 y peso 500.

## Regenerar el logo

```bash
pip install fonttools brotli
npm run logo
```
