/* Render de reels, carruseles e historias + motor de línea de tiempo para motion graphics.
   Todo se dibuja a tamaño nativo (1080 px) y es determinista: reel.seek(ms) deja el frame exacto,
   que es lo que usa el exportador para generar el MP4 cuadro por cuadro. */
(function () {
  const CX = (window.CX = window.CX || {});
  const t = (v, lang) => CX.t(v, lang);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Curvas (Emil Kowalski): ease-out fuerte para entradas, ease-in-out fuerte para movimiento en pantalla
  const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
  const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)";
  const FRAME_W = 1080;

  const wordmarkFor = (bg) => `assets/logo/wordmark-${bg === "ink" ? "inverse" : bg === "green" ? "green" : "color"}.svg`;
  const symbolFor = (bg, width) =>
    bg === "ink"
      ? CX.symbol({ head: "var(--paper)", blade: "var(--signal)", hole: "var(--ink)", width })
      : bg === "green"
      ? CX.symbol({ head: "var(--paper)", blade: "var(--ink)", hole: "var(--green)", width })
      : CX.symbol({ width });

  /** Bloque display: cada línea se ajusta al ancho disponible (tipografía de póster). */
  function displayBlock(lines, cls = "") {
    return `<h2 class="display ${cls}">${lines
      .map((l) => `<span class="ln"><span class="in">${esc(l).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>')}</span></span>`)
      .join("")}</h2>`;
  }

  /** Ajusta cada .in al ancho del bloque; limita tamaño máximo y alto total. */
  function fitDisplay(root, { max = 300, maxH = Infinity, width, minSize = 150 } = {}) {
    root.querySelectorAll(".display").forEach((block) => {
      const W = width || block.clientWidth;
      // Si una línea queda chica y tiene espacios, se parte en palabras: titulares siempre grandes.
      // Si al partir el bloque ya no cabe en alto, se deshace.
      const original = block.innerHTML;
      [...block.querySelectorAll(".in")].forEach((el) => {
        if (el.style.whiteSpace === "normal" || !el.textContent.includes(" ")) return;
        el.style.fontSize = "100px";
        if ((100 * W) / (el.offsetWidth || 1) >= minSize) return;
        const ln = el.parentElement;
        el.innerHTML.split(" ").forEach((word) => {
          const n = ln.cloneNode(false);
          n.innerHTML = `<span class="in">${word}</span>`;
          ln.before(n);
        });
        ln.remove();
      });
      const measure = () => {
        const ins = [...block.querySelectorAll(".in")];
        const sizes = ins.map((el) => {
          el.style.fontSize = "100px";
          return Math.min(max, (100 * W) / (el.offsetWidth || 1));
        });
        const total = sizes.reduce((a, b) => a + b * 0.9, 0);
        return { ins, sizes, k: total > maxH ? maxH / total : 1 };
      };
      let { ins, sizes, k } = measure();
      if (k < 0.9 && block.innerHTML !== original) {
        block.innerHTML = original;
        ({ ins, sizes, k } = measure());
      }
      ins.forEach((el, i) => {
        const fs = Math.floor(sizes[i] * k * 10) / 10;
        el.style.fontSize = fs + "px";
        el.parentElement.style.fontSize = fs + "px";
      });
    });
  }
  CX.fitDisplay = fitDisplay;

  CX.fontsReady = async function () {
    await Promise.all([
      document.fonts.load('900 100px "Archivo"'),
      document.fonts.load('600 100px "Archivo"'),
      document.fonts.load('900 100px "Archivo"', "ÁÉÍÓÚÑ¿"),
    ]);
    await document.fonts.ready;
  };

  /* ───────────────────────── REEL ───────────────────────── */
  const SCENES = [
    { key: "hook", dur: 2600, reveal: "cut" },
    { key: "problem", dur: 3400, reveal: "wipe" },
    { key: "solution", dur: 4300, reveal: "keyhole" },
    { key: "cta", dur: 3900, reveal: "wipe" },
  ];
  const REVEAL_MS = { cut: 0, wipe: 620, keyhole: 1000 };

  class Reel {
    constructor(host, reel, lang) {
      this.host = host;
      this.reel = reel;
      this.lang = lang;
      this.anims = [];
      this.t = 0;
      this.playing = false;
      let acc = 0;
      this.scenes = SCENES.map((s) => {
        const out = { ...s, start: acc };
        acc += s.dur;
        return out;
      });
      this.duration = acc;
    }

    async build() {
      const r = this.reel;
      const L = this.lang;
      const B = CX.brand;
      const hookBg = r.hookBg || "ink";
      this.host.innerHTML = `
        <div class="frame reel-frame">
          <div class="reel-stage">
            <section class="scene bg-${hookBg}" data-scene="hook">${displayBlock(t(r.hook, L))}</section>
            <section class="scene bg-paper" data-scene="problem">
              <div class="icon-wrap">${CX.icon(r.icon, { size: 300, stroke: 7 })}</div>
              ${displayBlock(t(r.problem, L))}
              <p class="body-l problem-sub soft">${esc(t(r.problemSub, L))}</p>
            </section>
            <section class="scene bg-green" data-scene="solution">
              ${displayBlock(t(r.solution, L))}
              <ul class="bullets">${t(r.bullets, L)
                .map((b) => `<li>${CX.icon("check", { size: 64, stroke: 12 })}<span>${esc(b)}</span></li>`)
                .join("")}</ul>
            </section>
            <section class="scene bg-ink cta-scene" data-scene="cta">
              ${symbolFor("ink", 520)}
              <img class="wordmark" src="${wordmarkFor("ink")}" alt="CANAVEX">
              <div class="contact">
                <div class="label soft">${L === "es" ? "Llámanos o escríbenos" : "Call or message us"}</div>
                <div class="phone tnum">${esc(B.phone)}</div>
                <div class="body-l">${esc(B.handle)}</div>
              </div>
            </section>
          </div>
        </div>`;
      this.frame = this.host.firstElementChild;
      await CX.fontsReady();
      await Promise.all([...this.frame.querySelectorAll("img")].map((i) => (i.complete ? 0 : new Promise((r) => (i.onload = i.onerror = r)))));
      const inner = FRAME_W - 192;
      fitDisplay(this.q("hook"), { max: 300, maxH: 1150, width: inner });
      fitDisplay(this.q("problem"), { max: 230, maxH: 640, width: inner });
      fitDisplay(this.q("solution"), { max: 240, maxH: 760, width: inner });
      this.compose();
      this.seek(0);
      return this;
    }

    q(key) {
      return this.frame.querySelector(`[data-scene="${key}"]`);
    }

    /** Registra una animación en la línea de tiempo global (ms absolutos). */
    add(el, keyframes, at, duration, easing = EASE_OUT, extra = {}) {
      if (!el) return;
      const a = el.animate(keyframes, { duration, delay: at, easing, fill: "both", ...extra });
      a.pause();
      this.anims.push(a);
    }

    riseLines(scene, at, gap = 90) {
      scene.querySelectorAll(".display .in").forEach((el, i) => {
        this.add(el, [{ transform: "translateY(105%)" }, { transform: "translateY(0)" }], at + i * gap, 760);
      });
    }

    compose() {
      const [hook, problem, solution, cta] = this.scenes;
      const H = this.q("hook"), P = this.q("problem"), S = this.q("solution"), C = this.q("cta");

      // 1 · Gancho: las líneas suben desde su máscara; antes del corte se comprimen hacia arriba
      this.riseLines(H, 120, 110);
      this.add(H.querySelector(".display"), [{ transform: "translateY(0) scale(1)" }, { transform: "translateY(-48px) scale(0.97)" }], hook.start + 1500, 1100, EASE_IN_OUT);

      // 2 · Problema: entra con barrido desde abajo (clip-path), luego pictograma animado
      this.revealWipe(P, problem.start);
      const pAt = problem.start + REVEAL_MS.wipe - 200;
      this.add(P.querySelector(".icon-wrap"), [{ opacity: 0, transform: "scale(0.94)" }, { opacity: 1, transform: "scale(1)" }], pAt, 500);
      this.riseLines(P, pAt + 120, 80);
      this.add(P.querySelector(".problem-sub"), [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "translateY(0)" }], pAt + 700, 500);
      this.iconMotion(P.querySelector(".cx-icon"), pAt + 400, problem.start + problem.dur);

      // 3 · Solución: transición ojo de cerradura (la firma de marca)
      this.revealKeyhole(S, solution.start);
      const sAt = solution.start + 520;
      this.riseLines(S, sAt, 90);
      S.querySelectorAll(".bullets li").forEach((li, i) => {
        const at = sAt + 650 + i * 160;
        this.add(li, [{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }], at, 520);
        const path = li.querySelector("[data-part=draw]");
        this.add(path, [{ strokeDasharray: 120, strokeDashoffset: 120 }, { strokeDasharray: 120, strokeDashoffset: 0 }], at + 120, 420);
      });

      // 4 · Cierre: la hoja-auto entra como una llave en su cerradura, el ojo gira, sale la marca
      this.revealWipe(C, cta.start);
      const cAt = cta.start + REVEAL_MS.wipe - 150;
      const sym = C.querySelector(".cx-symbol");
      const blade = sym.querySelector("[data-part=blade]");
      const hole = sym.querySelector("[data-part=hole]");
      this.add(sym, [{ opacity: 0 }, { opacity: 1 }], cAt, 200, "linear");
      this.add(blade, [{ transform: "translateX(140px)", opacity: 0 }, { transform: "translateX(0)", opacity: 1 }], cAt, 700);
      hole.style.transformBox = "fill-box";
      hole.style.transformOrigin = "50% 50%";
      // "clic": el ojo se cierra un instante cuando la hoja llega
      this.add(hole, [{ transform: "scale(1)" }, { transform: "scale(0.6)" }, { transform: "scale(1)" }], cAt + 620, 320, EASE_IN_OUT);
      this.add(C.querySelector(".wordmark"), [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }], cAt + 500, 640);
      C.querySelectorAll(".contact > *").forEach((el, i) => {
        this.add(el, [{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }], cAt + 900 + i * 90, 520);
      });
    }

    revealWipe(scene, at) {
      this.add(scene, [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)" }], at, REVEAL_MS.wipe, EASE_IN_OUT);
    }

    revealKeyhole(scene, at) {
      scene.style.webkitMaskImage = scene.style.maskImage = `url("${CX.KEYHOLE_SVG}")`;
      scene.style.webkitMaskRepeat = scene.style.maskRepeat = "no-repeat";
      scene.style.webkitMaskPosition = scene.style.maskPosition = "50% 46%";
      // El ojo aparece pequeño, respira y se abre hasta cubrir el frame
      this.add(
        scene,
        [
          { maskSize: "0px 0px", webkitMaskSize: "0px 0px", offset: 0 },
          { maskSize: "260px 260px", webkitMaskSize: "260px 260px", offset: 0.38 },
          { maskSize: "9000px 9000px", webkitMaskSize: "9000px 9000px", offset: 1 },
        ],
        at,
        REVEAL_MS.keyhole,
        EASE_IN_OUT
      );
    }

    /** Movimiento propio de cada pictograma (explica el problema, no decora). */
    iconMotion(svg, at, end) {
      if (!svg) return;
      const part = (n) => [...svg.querySelectorAll(`[data-part=${n}]`)];
      svg.querySelectorAll("[data-part]").forEach((p) => { p.style.transformBox = "fill-box"; p.style.transformOrigin = "50% 50%"; });
      svg.style.transformOrigin = "50% 60%";
      const shake = [{ transform: "rotate(0)" }, { transform: "rotate(-5deg)" }, { transform: "rotate(5deg)" }, { transform: "rotate(-3deg)" }, { transform: "rotate(0)" }];
      switch (this.reel.anim) {
        case "lock": {
          const [sh] = part("shackle");
          sh.style.transformOrigin = "50% 100%";
          this.add(sh, [{ transform: "translateY(-18px)" }, { transform: "translateY(0)" }], at, 360, EASE_IN_OUT);
          this.add(svg, shake, at + 700, 520, EASE_IN_OUT);
          this.add(svg, shake, at + 1500, 520, EASE_IN_OUT);
          break;
        }
        case "search": {
          const [lens] = part("lens");
          this.add(lens, [
            { transform: "translate(0,0)" }, { transform: "translate(-16px,10px)" }, { transform: "translate(14px,16px)" },
            { transform: "translate(10px,-12px)" }, { transform: "translate(-12px,-8px)" }, { transform: "translate(0,0)" },
          ], at, 2400, EASE_IN_OUT);
          break;
        }
        case "fob": {
          part("btn").forEach((b, i) => {
            this.add(b, [{ opacity: 1 }, { opacity: 0.2 }, { opacity: 1 }], at + i * 220, 360, "ease");
            this.add(b, [{ opacity: 1 }, { opacity: 0.2 }, { opacity: 1 }], at + 1100 + i * 220, 360, "ease");
          });
          this.add(svg, [{ transform: "translateX(0)" }, { transform: "translateX(-14px)" }, { transform: "translateX(12px)" }, { transform: "translateX(-6px)" }, { transform: "translateX(0)" }], at + 1900, 480, EASE_IN_OUT);
          break;
        }
        case "broken": {
          const [l] = part("left"), [r] = part("right");
          this.add(l, [{ transform: "translate(0,0) rotate(0)" }, { transform: "translate(-18px,6px) rotate(-10deg)" }], at + 300, 520, EASE_OUT);
          this.add(r, [{ transform: "translate(0,0) rotate(0)" }, { transform: "translate(18px,12px) rotate(14deg)" }], at + 300, 520, EASE_OUT);
          break;
        }
        case "ignition": {
          const [s] = part("slot");
          const turn = [{ transform: "rotate(0)" }, { transform: "rotate(28deg)" }, { transform: "rotate(22deg)" }, { transform: "rotate(28deg)" }, { transform: "rotate(0)" }];
          this.add(s, turn, at, 1000, EASE_IN_OUT);
          this.add(s, turn, at + 1300, 1000, EASE_IN_OUT);
          break;
        }
        case "copy": {
          const [k2] = part("k2");
          this.add(k2, [{ transform: "translateY(-36px)", opacity: 0 }, { transform: "translateY(-36px)", opacity: 0.4, offset: 0.2 }, { transform: "translateY(0)", opacity: 1 }], at + 200, 800, EASE_OUT);
          break;
        }
        case "halloween": {
          this.add(svg, [{ opacity: 1 }, { opacity: 0.35 }, { opacity: 1 }, { opacity: 0.6 }, { opacity: 1 }], at + 200, 900, "linear");
          this.add(svg, [{ transform: "rotate(0)" }, { transform: "rotate(-12deg)" }], at, end - at, EASE_IN_OUT);
          break;
        }
      }
    }

    seek(ms) {
      this.t = Math.max(0, Math.min(ms, this.duration));
      for (const a of this.anims) a.currentTime = this.t;
      this.scenes.forEach((s, i) => {
        const next = this.scenes[i + 1];
        const until = next ? next.start + REVEAL_MS[next.reveal] : Infinity;
        this.q(s.key).hidden = !(this.t >= s.start && this.t < until);
      });
    }

    play() {
      if (this.playing) return;
      this.playing = true;
      let last = performance.now();
      const loop = (now) => {
        if (!this.playing) return;
        let next = this.t + (now - last);
        last = now;
        if (next >= this.duration) next = 0;
        this.seek(next);
        this.onTick && this.onTick(this.t);
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);
    }

    pause() {
      this.playing = false;
      cancelAnimationFrame(this.raf);
    }

    destroy() {
      this.pause();
      this.anims.forEach((a) => a.cancel());
      this.host.innerHTML = "";
    }
  }
  CX.Reel = Reel;

  /* ───────────────────────── CARRUSEL ───────────────────────── */
  CX.renderSlide = async function (host, car, index, lang) {
    const s = car.slides[index];
    const total = car.slides.length;
    const bg = s.bg || "paper";
    const L = lang;
    const count = `<span class="count tnum">${index + 1}/${total}</span>`;
    let inner = "";
    if (s.kind === "cover") {
      inner = `
        <div class="slide-top">${symbolFor(bg, 190)}${count}</div>
        <div style="margin-top:auto">${displayBlock(t(s.lines, L))}</div>
        <div class="slide-foot" style="margin-top:56px">
          <p class="body-l" style="margin:0;max-width:17ch">${esc(t(s.sub, L))}</p>
          <span class="swipe">${L === "es" ? "Desliza" : "Swipe"} ${CX.icon("arrow", { size: 44, stroke: 11 })}</span>
        </div>`;
    } else if (s.kind === "item") {
      inner = `
        <div class="slide-top"><span class="item-icon">${CX.icon(s.icon, { size: 200, stroke: 7 })}</span>${s.n ? `<span class="big-n tnum">${esc(s.n)}</span>` : count}</div>
        <div style="margin-top:auto">
          <h2 class="item-h">${esc(t(s.h, L))}</h2>
          <p class="item-p body-l soft">${esc(t(s.p, L))}</p>
        </div>
        <div class="slide-foot" style="margin-top:72px"><img src="${wordmarkFor("paper")}" alt="CANAVEX" style="height:44px;width:auto">${s.n ? count : ""}</div>`;
    } else if (s.kind === "compare") {
      const cols = t(s.cols, L);
      const rows = t(s.rows, L);
      inner = `
        <div class="slide-top"><h2 class="item-h" style="font-size:84px">${esc(t(s.h, L))}</h2>${count}</div>
        <div class="compare">
          <div class="c-a head">${esc(cols[0])}</div><div class="c-b head">${esc(cols[1])}</div>
          ${rows.map(([a, b]) => `<div class="c-a">${esc(a)}</div><div class="c-b">${esc(b)}</div>`).join("")}
        </div>
        <div class="slide-foot"><img src="${wordmarkFor("paper")}" alt="CANAVEX" style="height:44px;width:auto"></div>`;
    } else if (s.kind === "list") {
      inner = `
        <div class="slide-top"><h2 class="item-h">${esc(t(s.h, L))}</h2>${count}</div>
        <ul class="checklist">${t(s.items, L).map((i) => `<li><span class="box"></span><span>${esc(i)}</span></li>`).join("")}</ul>
        <div class="slide-foot"><img src="${wordmarkFor("paper")}" alt="CANAVEX" style="height:44px;width:auto"></div>`;
    } else if (s.kind === "cta") {
      inner = `
        <div class="slide-top">${symbolFor(bg, 190)}${count}</div>
        <div style="margin-top:auto">${displayBlock(t(s.lines, L))}
          <p class="body-l soft" style="margin:40px 0 0">${esc(t(s.sub, L))}</p></div>
        <div class="slide-foot" style="margin-top:72px;align-items:center">
          <div><div class="phone tnum" style="font-weight:900;font-stretch:125%;font-size:60px;line-height:1;white-space:nowrap">${esc(CX.brand.phone)}</div>
          <div class="body-m" style="margin-top:10px">${esc(CX.brand.handle)}</div></div>
          <img src="${wordmarkFor(bg)}" alt="CANAVEX" style="height:52px;width:auto">
        </div>`;
    }
    host.innerHTML = `<div class="frame is-carousel bg-${bg}"><div class="slide">${inner}</div></div>`;
    await CX.fontsReady();
    fitDisplay(host, { max: 280, maxH: s.kind === "cta" ? 560 : 760, width: FRAME_W - 192 });
    return host.firstElementChild;
  };

  /* ───────────────────────── HISTORIA ───────────────────────── */
  CX.STORY_FRAMES = 2;
  CX.renderStory = async function (host, story, frame, lang, { guides = false } = {}) {
    const d = story.data;
    const L = lang;
    const B = CX.brand;
    let bg = "paper";
    let inner = "";
    const foot = (bgc) => `<div class="story-foot"><span class="pill">${esc(t(story.label, L))}</span><img src="${wordmarkFor(bgc)}" alt="CANAVEX" style="height:40px;width:auto"></div>`;
    const contact = `<div style="margin-top:72px"><div class="phone tnum" style="font-weight:900;font-stretch:125%;font-size:84px;line-height:1">${esc(B.phone)}</div><div class="body-l" style="margin-top:14px">${esc(B.handle)}</div></div>`;

    switch (story.kind) {
      case "tip":
        if (frame === 0) { bg = "paper"; inner = `<div style="color:var(--green);margin-bottom:64px">${CX.icon("key", { size: 220, stroke: 7 })}</div>${displayBlock(t(d.h, L))}`; }
        else { bg = "green"; inner = `<p class="display" style="font-size:96px;line-height:1"><span class="ln"><span class="in" style="white-space:normal">${esc(t(d.p, L))}</span></span></p><p class="body-l soft" style="margin-top:56px">${L === "es" ? "¿Dudas? Escríbenos." : "Questions? Message us."}</p>`; }
        break;
      case "poll":
        if (frame === 0) { bg = "ink"; inner = `${displayBlock(t(d.q, L))}<div class="sticker-zone" data-hint="${L === "es" ? "Sticker de encuesta: " : "Poll sticker: "}${esc(t(d.opts, L).join(" / "))}"></div>`; }
        else { bg = "paper"; inner = `<h2 class="item-h" style="font-weight:880;font-stretch:112%;font-size:110px;line-height:0.98;letter-spacing:-0.02em;margin:0;text-wrap:balance">${esc(t(d.r, L))}</h2>${contact}`; }
        break;
      case "faq":
        if (frame === 0) { bg = "green"; inner = `${displayBlock(t(d.q, L))}<div class="sticker-zone" style="height:200px" data-hint="${L === "es" ? "Sticker: pregúntanos" : "Sticker: ask us"}"></div>`; }
        else { bg = "paper"; inner = `<div style="color:var(--green);margin-bottom:56px">${CX.icon("check", { size: 160, stroke: 12 })}</div><h2 style="margin:0;font-weight:820;font-stretch:108%;font-size:92px;line-height:1.02;letter-spacing:-0.02em;text-wrap:balance">${esc(t(d.a, L))}</h2><p class="body-l soft" style="margin-top:56px">${L === "es" ? "¿Otra pregunta? Escríbenos por DM." : "Another question? DM us."}</p>`; }
        break;
      case "myth":
        if (frame === 0) { bg = "ink"; inner = `${displayBlock(t(d.s, L))}<div class="sticker-zone" data-hint="${L === "es" ? "Sticker de quiz: Mito / Realidad" : "Quiz sticker: Myth / Fact"}"></div>`; }
        else {
          bg = d.v === "fact" ? "green" : "paper";
          const word = d.v === "fact" ? (L === "es" ? ["REALIDAD."] : ["FACT."]) : (L === "es" ? ["MITO."] : ["MYTH."]);
          inner = `<div style="margin-bottom:48px;color:${d.v === "fact" ? "var(--paper)" : "var(--green)"}">${CX.icon(d.v === "fact" ? "check" : "cross", { size: 150, stroke: 12 })}</div>${displayBlock(word)}<p class="body-l" style="margin-top:56px;max-width:19ch">${esc(t(d.a, L))}</p>`;
        }
        break;
      case "weekend":
        if (frame === 0) { bg = "green"; inner = `<div style="margin-bottom:64px">${CX.icon(story.date === "2026-10-30" ? "moon" : "calendar", { size: 200, stroke: 7 })}</div>${displayBlock(t(d.h, L))}<p class="body-l" style="margin-top:56px">${esc(t(d.p, L))}</p>`; }
        else { bg = "ink"; inner = `${symbolFor("ink", 420)}<p class="label soft" style="margin:96px 0 0">${L === "es" ? "Guarda nuestro número" : "Save our number"}</p>${contact}`; }
        break;
    }
    host.innerHTML = `<div class="frame bg-${bg} ${guides ? "guides" : ""}"><div class="story">${inner}</div>${foot(bg)}</div>`;
    await CX.fontsReady();
    fitDisplay(host, { max: 290, maxH: 900, width: FRAME_W - 192 });
    // Párrafos display con salto de línea libre no se ajustan por ancho
    host.querySelectorAll('.in[style*="white-space:normal"]').forEach((el) => { el.style.fontSize = "96px"; el.parentElement.style.fontSize = "96px"; });
    return host.firstElementChild;
  };
})();
