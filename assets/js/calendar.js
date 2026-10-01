/* Calendario de octubre: arma la grilla, las filas por tipo y el panel de detalle */
(function () {
  const { reels, carousels, stories, STORY_THEMES, TAGS, MONTH } = CX;
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const DOW = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const fmt = (iso) => CX.parseDate(iso).toLocaleDateString("es-US", { weekday: "long", day: "numeric", month: "long" });

  let lang = "es";
  try { lang = localStorage.getItem("cx-lang") || "es"; } catch {}

  const files = {
    reel: (r) => ({ mp4: `exports/reels/reel-${pad(r.id)}-${lang}.mp4`, poster: `exports/reels/reel-${pad(r.id)}-${lang}.jpg` }),
    car: (c, i) => `exports/carruseles/carrusel-${pad(c.id)}-${lang}/${pad(i + 1)}.png`,
    story: (s, f) => `exports/historias/${s.id}-${lang}-${f + 1}.png`,
  };

  const byDate = {};
  const push = (date, e) => (byDate[date] = byDate[date] || []).push(e);
  reels.forEach((r) => push(r.date, { type: "reel", item: r }));
  carousels.forEach((c) => push(c.date, { type: "car", item: c }));
  stories.forEach((s) => push(s.date, { type: "story", item: s }));
  const order = { reel: 0, car: 1, story: 2 };
  Object.values(byDate).forEach((l) => l.sort((a, b) => order[a.type] - order[b.type]));

  /* ── Grilla ── */
  function renderCal() {
    const cal = document.getElementById("cal");
    const first = new Date(MONTH.year, MONTH.month, 1);
    const days = new Date(MONTH.year, MONTH.month + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7; // lunes primero
    let html = DOW.map((d) => `<div class="dow" aria-hidden="true">${d.slice(0, 3)}</div>`).join("");
    for (let i = 0; i < lead; i++) html += `<div class="day empty" aria-hidden="true"></div>`;
    for (let d = 1; d <= days; d++) {
      const iso = `${MONTH.year}-${pad(MONTH.month + 1)}-${pad(d)}`;
      const wd = (new Date(MONTH.year, MONTH.month, d).getDay() + 6) % 7;
      const list = byDate[iso] || [];
      if (!list.length) {
        html += `<div class="day weekend" aria-hidden="true"><span class="n">${d}</span></div>`;
        continue;
      }
      const tags = list
        .map(({ type, item }) => {
          const label = type === "story" ? CX.t(item.label, "es") : `${type === "reel" ? "Reel" : "Carrusel"} · ${CX.t(item.title, "es")}`;
          return `<span class="tag ${type}">${esc(label)}</span>`;
        })
        .join("");
      html += `<button class="day" type="button" data-date="${iso}" aria-label="${esc(fmt(iso))}: ${list.length} piezas"><span class="n" data-dow="${DOW[wd]}">${d}</span>${tags}</button>`;
    }
    cal.innerHTML = html;
  }

  /* ── Filas ── */
  function renderRails() {
    document.getElementById("reels").innerHTML = reels
      .map((r) => {
        const f = files.reel(r);
        return `<button class="post" type="button" data-date="${r.date}"><div class="media"><img src="${f.poster}" alt="${esc(CX.t(r.title, lang))}" loading="lazy"></div><span class="when">${esc(fmt(r.date))}</span><span class="ttl">${esc(CX.t(r.title, lang))}</span></button>`;
      })
      .join("");
    document.getElementById("cars").innerHTML = carousels
      .map((c) => `<button class="post" type="button" data-date="${c.date}"><div class="media r45"><img src="${files.car(c, 0)}" alt="${esc(CX.t(c.title, lang))}" loading="lazy"></div><span class="when">${esc(fmt(c.date))} · ${c.slides.length} láminas</span><span class="ttl">${esc(CX.t(c.title, lang))}</span></button>`)
      .join("");
    document.getElementById("stories").innerHTML = stories
      .map((s) => `<button class="post" type="button" data-date="${s.date}"><div class="media"><img src="${files.story(s, 0)}" alt="${esc(CX.t(s.label, lang))}" loading="lazy"></div><span class="when">${esc(fmt(s.date))}</span><span class="ttl">${esc(CX.t(s.label, lang))}</span></button>`)
      .join("");
    const desc = {
      1: "Un consejo práctico para cuidar tus llaves.",
      2: "Encuesta con sticker: genera respuestas y DMs.",
      3: "Una duda real, respondida en dos pantallas.",
      4: "Quiz con sticker y la respuesta en la siguiente.",
      5: "Recordatorio para guardar el número antes del finde.",
    };
    document.getElementById("themes").innerHTML = Object.entries(STORY_THEMES)
      .map(([wd, th]) => `<div><b>${DOW[wd - 1]}</b><span>${esc(th.label.es)} — ${desc[wd]}</span></div>`)
      .join("");
  }

  /* ── Panel ── */
  const sheet = document.getElementById("sheet");
  const body = document.getElementById("sheetBody");

  function captionBlock(text, tags) {
    const full = `${text}\n\n${tags}`;
    return `<div class="caption"><p>${esc(text)}</p><p class="tags">${esc(tags)}</p>
      <div class="actions"><button class="btn green" type="button" data-copytext="${esc(full)}">Copiar texto</button></div></div>`;
  }

  function entryHTML({ type, item }) {
    if (type === "reel") {
      const f = files.reel(item);
      return `<article class="entry">
        <h3>${esc(CX.t(item.title, lang))}</h3>
        <p class="kind">Reel ${item.id} de 7 · 9:16 · ${lang.toUpperCase()}</p>
        <video src="${f.mp4}" poster="${f.poster}" controls playsinline loop muted preload="metadata"></video>
        <dl class="meta-list">
          <dt>Gancho</dt><dd>${esc(CX.t(item.hook, lang).join(" "))}</dd>
          <dt>Audio</dt><dd>${esc(CX.t(item.audio, "es"))}</dd>
        </dl>
        ${captionBlock(CX.t(item.caption, lang), TAGS[lang])}
        <div class="actions"><a class="btn" href="${f.mp4}" download>Descargar MP4</a><a class="btn ghost" href="${f.poster}" download>Portada JPG</a><a class="btn ghost" href="render.html?type=reel&id=${item.id}&lang=${lang}&play" target="_blank" rel="noopener">Ver en vivo</a></div>
      </article>`;
    }
    if (type === "car") {
      const imgs = item.slides.map((_, i) => `<a href="${files.car(item, i)}" download><img src="${files.car(item, i)}" alt="Lámina ${i + 1}" loading="lazy"></a>`).join("");
      return `<article class="entry">
        <h3>${esc(CX.t(item.title, lang))}</h3>
        <p class="kind">Carrusel ${item.id} de 7 · ${item.slides.length} láminas · 4:5 · ${lang.toUpperCase()}</p>
        <div class="slides">${imgs}</div>
        ${captionBlock(CX.t(item.caption, lang), TAGS[lang])}
        <p class="small muted" style="margin:12px 0 0">Toca una lámina para descargarla.</p>
      </article>`;
    }
    const s = item;
    const imgs = [0, 1].map((f) => `<a href="${files.story(s, f)}" download><img src="${files.story(s, f)}" alt="Historia, pantalla ${f + 1}" loading="lazy"></a>`).join("");
    const howto = {
      tip: "Sube las dos pantallas seguidas. En la segunda, agrega el sticker de enlace a WhatsApp o DM.",
      poll: s.kind === "poll" ? `En la pantalla 1 agrega el sticker de encuesta: “${CX.t(s.data.opts, lang).join(" / ")}”. La pantalla 2 va unas horas después, con el resultado.` : "",
      faq: "En la pantalla 1 agrega el sticker de preguntas. La pantalla 2 responde.",
      myth: "En la pantalla 1 agrega el sticker de quiz (Mito / Realidad). La pantalla 2 da la respuesta.",
      weekend: "Sube las dos seguidas. Fija la segunda en Destacadas → “Contacto”.",
    }[s.kind];
    return `<article class="entry">
      <h3>${esc(CX.t(s.label, lang))}</h3>
      <p class="kind">Historia · 2 pantallas · 9:16 · ${lang.toUpperCase()}</p>
      <div class="slides stories">${imgs}</div>
      <dl class="meta-list"><dt>Cómo subirla</dt><dd>${esc(howto)}</dd></dl>
    </article>`;
  }

  let current = null;
  function openDay(iso, opener) {
    const list = byDate[iso];
    if (!list) return;
    current = iso;
    document.getElementById("sheetDate").textContent = fmt(iso);
    body.innerHTML = list.map(entryHTML).join("");
    if (!sheet.open) {
      sheet._opener = opener;
      sheet.showModal();
    }
    sheet.querySelector(".sheet-in").scrollTop = 0;
    history.replaceState(null, "", `#${iso}`);
  }
  function close() {
    sheet.close();
  }
  sheet.addEventListener("close", () => {
    current = null;
    body.querySelectorAll("video").forEach((v) => v.pause());
    history.replaceState(null, "", location.pathname);
    sheet._opener && sheet._opener.focus();
  });
  document.getElementById("sheetClose").addEventListener("click", close);
  sheet.addEventListener("click", (e) => { if (e.target === sheet) close(); });
  body.addEventListener("click", (e) => {
    const b = e.target.closest("[data-copytext]");
    if (b) CX.copy(b.dataset.copytext, b, "Copiado");
  });
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-date]");
    if (t && !sheet.contains(t)) openDay(t.dataset.date, t);
  });

  /* ── Controles ── */
  CX.segmented(document.getElementById("lang"), lang, (v) => {
    lang = v;
    try { localStorage.setItem("cx-lang", v); } catch {}
    renderRails();
    if (current) openDay(current);
  });
  CX.segmented(document.getElementById("filter"), "all", (v) => (document.getElementById("cal").dataset.filter = v));

  renderCal();
  renderRails();
  if (/^#2026-10-\d\d$/.test(location.hash)) openDay(location.hash.slice(1));
})();
