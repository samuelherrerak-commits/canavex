/* Utilidades compartidas del sitio */
(function () {
  const CX = (window.CX = window.CX || {});
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");

  /** Escala un frame nativo (1080 px) al ancho de su contenedor .fscale */
  CX.scaleFrame = function (box) {
    const inner = box.querySelector(".inner");
    const fit = () => (inner.style.transform = `scale(${box.clientWidth / 1080})`);
    fit();
    new ResizeObserver(fit).observe(box);
  };

  /** Copia texto y confirma en el mismo botón */
  CX.copy = async function (text, btn, done = "Copiado") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = Object.assign(document.createElement("textarea"), { value: text });
      document.body.append(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    if (!btn) return;
    const label = btn.dataset.label || btn.textContent;
    btn.dataset.label = label;
    btn.textContent = done;
    clearTimeout(btn._t);
    btn._t = setTimeout(() => (btn.textContent = label), 1400);
  };

  /** Monta un reel en vivo con play/pausa y línea de tiempo. Se pausa fuera de pantalla. */
  CX.mountReel = async function (box, reel, lang, { play, scrub, autoplay = false } = {}) {
    CX.scaleFrame(box);
    const inner = box.querySelector(".inner");
    if (box._reel) box._reel.destroy();
    const r = await new CX.Reel(inner, reel, lang).build();
    box._reel = r;
    r.seek(1300);
    const sync = () => {
      if (scrub) scrub.value = Math.round((r.t / r.duration) * 1000);
      if (play) {
        play.textContent = r.playing ? "Pausa" : "Reproducir";
        play.setAttribute("aria-pressed", String(r.playing));
      }
    };
    r.onTick = sync;
    if (play && !play._wired) {
      play._wired = true;
      play.addEventListener("click", () => {
        const cur = box._reel;
        cur.playing ? cur.pause() : cur.play();
        sync();
      });
    }
    if (scrub && !scrub._wired) {
      scrub._wired = true;
      scrub.addEventListener("input", () => {
        const cur = box._reel;
        cur.pause();
        cur.seek((scrub.value / 1000) * cur.duration);
        sync();
      });
    }
    new IntersectionObserver(([e]) => {
      if (!e.isIntersecting && box._reel.playing) {
        box._reel.pause();
        sync();
      }
    }).observe(box);
    if (autoplay && !reduce.matches) r.play();
    sync();
    return r;
  };

  /** Control segmentado (ES/EN). La pastilla se mueve con transform, no con left/width. */
  CX.segmented = function (el, value, onChange) {
    const btns = [...el.querySelectorAll("button")];
    let thumb = el.querySelector(".thumb");
    if (!thumb) {
      thumb = document.createElement("span");
      thumb.className = "thumb";
      el.prepend(thumb);
    }
    const set = (v, emit) => {
      btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.value === v)));
      const b = btns.find((x) => x.dataset.value === v);
      thumb.style.width = b.offsetWidth + "px";
      thumb.style.transform = `translateX(${b.offsetLeft}px)`;
      if (emit) onChange(v);
    };
    btns.forEach((b) => b.addEventListener("click", () => set(b.dataset.value, true)));
    requestAnimationFrame(() => set(value, false));
    return set;
  };

  // Íconos dibujados en lugar de glifos: <span data-i="check"></span>
  document.querySelectorAll("[data-i]").forEach((s) => (s.innerHTML = CX.icon(s.dataset.i, { size: s.dataset.size || 22, stroke: 12 })));
})();
