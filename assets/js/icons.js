/* Pictogramas CANAVEX: trazo único de 8px en una retícula de 120, puntas redondas.
   Las piezas animables llevan data-part para que el motor de reels las mueva. */
(function () {
  const CX = (window.CX = window.CX || {});

  const P = {
    key: `
      <circle cx="34" cy="60" r="20"/>
      <circle cx="34" cy="60" r="5" class="fill"/>
      <path d="M54 60h52M92 60v14M80 60v10"/>`,
    fob: `
      <rect x="34" y="14" width="52" height="92" rx="20"/>
      <circle data-part="btn" cx="60" cy="42" r="7" class="fill"/>
      <circle data-part="btn" cx="60" cy="64" r="7" class="fill"/>
      <path data-part="btn" d="M52 86h16"/>`,
    car: `
      <path d="M10 78V66c0-6 4-9 10-10l14-2 14-16c4-4 8-6 14-6h18c6 0 10 2 14 6l12 14 6 2c4 1 6 4 6 8v16"/>
      <path d="M10 78h10M44 78h32M100 78h10"/>
      <circle data-part="wheel" cx="32" cy="80" r="10"/>
      <circle data-part="wheel" cx="88" cy="80" r="10"/>`,
    lock: `
      <path data-part="shackle" d="M38 54V38a22 22 0 0 1 44 0v16"/>
      <rect x="24" y="54" width="72" height="54" rx="12"/>
      <path d="M60 74v14"/>`,
    search: `
      <g data-part="lens"><circle cx="52" cy="52" r="30"/><path d="M74 74l26 26"/></g>`,
    broken: `
      <g data-part="left"><circle cx="30" cy="60" r="18"/><path d="M48 60h12l4-6"/></g>
      <g data-part="right"><path d="M70 66l4-6h34M96 60v12M84 60v8"/></g>`,
    ignition: `
      <circle cx="60" cy="60" r="44"/>
      <g data-part="slot"><path d="M60 34v52"/><circle cx="60" cy="60" r="10"/></g>
      <path d="M60 6v6M108 60h6M6 60h6" class="tick"/>`,
    copy: `
      <g data-part="k1"><circle cx="30" cy="44" r="16"/><path d="M46 44h44M80 44v10"/></g>
      <g data-part="k2"><circle cx="30" cy="80" r="16"/><path d="M46 80h44M80 80v10"/></g>`,
    signal: `
      <circle cx="60" cy="88" r="6" class="fill"/>
      <path data-part="arc" d="M44 72a22 22 0 0 1 32 0"/>
      <path data-part="arc" d="M30 58a42 42 0 0 1 60 0"/>
      <path data-part="arc" d="M16 44a62 62 0 0 1 88 0"/>`,
    check: `<path data-part="draw" d="M24 62l24 24 48-52"/>`,
    cross: `<path d="M30 30l60 60M90 30l-60 60"/>`,
    phone: `<path d="M40 14h40a8 8 0 0 1 8 8v76a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8V22a8 8 0 0 1 8-8zM52 94h16"/>`,
    pin: `<path d="M60 108s34-34 34-58a34 34 0 0 0-68 0c0 24 34 58 34 58z"/><circle cx="60" cy="50" r="12"/>`,
    clock: `<circle cx="60" cy="60" r="44"/><path d="M60 32v28l18 12"/>`,
    battery: `<rect x="14" y="36" width="84" height="48" rx="10"/><path d="M106 52v16"/><path data-part="level" d="M30 52v16"/>`,
    moon: `<path d="M84 76A40 40 0 1 1 44 18a32 32 0 0 0 40 58z"/>`,
    arrow: `<path d="M16 60h84M74 34l26 26-26 26"/>`,
    calendar: `<rect x="16" y="24" width="88" height="80" rx="12"/><path d="M16 48h88M40 14v20M80 14v20"/>`,
    shield: `<path d="M60 12l40 14v30c0 26-18 44-40 52-22-8-40-26-40-52V26z"/><path d="M42 60l12 12 24-26"/>`,
  };

  CX.iconNames = Object.keys(P);

  /** Devuelve el SVG del pictograma. opts: {size, stroke, color, className} */
  CX.icon = function (name, opts = {}) {
    const body = P[name];
    if (!body) return "";
    const color = opts.color || "currentColor";
    const sw = opts.stroke || 8;
    return `<svg class="cx-icon ${opts.className || ""}" data-icon="${name}" viewBox="0 0 120 120" width="${opts.size || 120}" height="${opts.size || 120}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><style>.fill{fill:${color};stroke:none}</style>${body}</svg>`;
  };

  /* Símbolo de marca (llave + auto) y Λ, como cadenas reutilizables */
  CX.symbol = function ({ head = "var(--ink)", blade = "var(--green)", hole = "var(--paper)", width = 318 } = {}) {
    return `<svg class="cx-symbol" viewBox="0 0 318 120" width="${width}" height="${(width * 120) / 318}" aria-hidden="true">
      <path style="fill:${head}" d="M28 12h40a28 28 0 0 1 28 28v40a28 28 0 0 1-28 28H28A28 28 0 0 1 0 80V40a28 28 0 0 1 28-28Z"/>
      <path style="fill:${hole}" data-part="hole" d="M48 38a13 13 0 0 0-7 24l-4 22h22l-4-22a13 13 0 0 0-7-24Z"/>
      <rect style="fill:${head}" x="94" y="48" width="22" height="26"/>
      <path style="fill:${blade}" data-part="blade" d="M112 46 L136 44 C152 42 166 22 198 21 C226 20 244 30 262 44 L298 50 C311 52 318 59 318 68 V80 a6 6 0 0 1-6 6 H294 a16 16 0 0 0-32 0 H174 a16 16 0 0 0-32 0 H112 Z"/>
    </svg>`;
  };

  /* Silueta del ojo de cerradura usada por la transición "keyhole" (en coordenadas 0..100) */
  CX.KEYHOLE_SVG =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 18a17 17 0 0 0-9.5 31.1L35 82h30l-5.5-32.9A17 17 0 0 0 50 18Z"/></svg>'
    );
})();
