/* Contenido de octubre 2026 — CANAVEX Auto Keys. Todo en { es, en }.
   Reels: 7 · Carruseles: 7 · Historias: lunes a viernes (22 días, 2 pantallas por día). */
(function () {
  const CX = (window.CX = window.CX || {});
  CX.MONTH = { year: 2026, month: 9 }; // octubre (0-based)

  const TAGS = {
    es: "#cerrajeriaautomotriz #cerrajero #llavesdecarro #llavesperdidas #cerrajeromovil #canavex",
    en: "#automotivelocksmith #carlocksmith #carkeys #lockedout #mobilelocksmith #canavex",
  };
  CX.TAGS = TAGS;

  /* ───────────────────────── REELS ─────────────────────────
     Estructura de cada reel (≈14 s, 9:16):
     gancho (tinta) → problema (papel + pictograma animado) → transición ojo de cerradura →
     solución (verde, 3 puntos) → cierre con logo y contacto. */
  CX.reels = [
    {
      id: 1, date: "2026-10-02", icon: "lock", anim: "lock",
      title: { es: "Te quedaste afuera", en: "Locked out" },
      hook: { es: ["¿TE", "QUEDASTE", "AFUERA?"], en: ["LOCKED", "OUT OF", "YOUR CAR?"] },
      problem: {
        es: ["LLAVES", "ADENTRO.", "PUERTAS", "CERRADAS."],
        en: ["KEYS", "INSIDE.", "DOORS", "LOCKED."],
      },
      problemSub: { es: "Y tienes prisa.", en: "And you're in a hurry." },
      solution: { es: ["TE ABRIMOS", "EL CARRO."], en: ["WE GET", "YOU IN."] },
      bullets: {
        es: ["Vamos a donde estás", "Sin dañar puertas ni ventanas", "Sigues tu camino"],
        en: ["We come to you", "No damage to doors or windows", "Back on the road"],
      },
      caption: {
        es: "Las llaves adentro y el carro cerrado. Nos pasa a todos. Llámanos y vamos a donde estás para abrirlo sin dañarlo. 🔑",
        en: "Keys inside, car locked. It happens to everyone. Call us and we'll come to you and open it without damage. 🔑",
      },
      audio: { es: "Beat minimal con golpe en cada corte (90–100 BPM)", en: "Minimal beat with a hit on every cut (90–100 BPM)" },
    },
    {
      id: 2, date: "2026-10-07", icon: "search", anim: "search",
      title: { es: "Perdiste tus llaves", en: "Lost your keys" },
      hook: { es: ["¿PERDISTE", "TODAS TUS", "LLAVES?"], en: ["LOST", "ALL YOUR", "KEYS?"] },
      problem: { es: ["NI UNA", "COPIA."], en: ["NOT A", "SINGLE", "SPARE."] },
      problemSub: { es: "Y el dealer te pide días.", en: "And the dealer wants days." },
      solution: { es: ["LLAVE", "NUEVA", "EN SITIO."], en: ["NEW KEY", "ON THE", "SPOT."] },
      bullets: {
        es: ["Cortamos y programamos", "Sin remolcar el carro", "Sin la llave original"],
        en: ["We cut and program it", "No towing needed", "No original key needed"],
      },
      caption: {
        es: "¿Perdiste todas las llaves? No necesitas la original ni remolcar el carro. Hacemos y programamos una llave nueva donde estés.",
        en: "Lost every key? You don't need the original or a tow. We make and program a new key wherever you are.",
      },
      audio: { es: "Tic-tac de reloj al inicio, entra el beat en la transición", en: "Clock ticking at the start, beat drops at the transition" },
    },
    {
      id: 3, date: "2026-10-12", icon: "fob", anim: "fob",
      title: { es: "El control no responde", en: "Key fob not working" },
      hook: { es: ["¿TU", "CONTROL", "NO ABRE?"], en: ["FOB", "NOT", "WORKING?"] },
      problem: { es: ["APRIETAS.", "NADA."], en: ["CLICK.", "NOTHING."] },
      problemSub: { es: "Ni con batería nueva.", en: "Not even with a new battery." },
      solution: { es: ["LO", "PROGRAMAMOS."], en: ["WE", "PROGRAM IT."] },
      bullets: {
        es: ["Controles y smart keys", "Reemplazo de carcasa", "Diagnóstico en el momento"],
        en: ["Remotes and smart keys", "Shell replacement", "On-the-spot diagnosis"],
      },
      caption: {
        es: "Si cambiaste la batería y tu control sigue sin responder, puede necesitar programación. Lo revisamos y lo dejamos funcionando.",
        en: "Swapped the battery and your fob still won't respond? It may need programming. We check it and get it working.",
      },
      audio: { es: "Sonido de 'clic' sincronizado con el pictograma", en: "Click sound synced to the icon" },
    },
    {
      id: 4, date: "2026-10-16", icon: "broken", anim: "broken",
      title: { es: "Llave partida", en: "Broken key" },
      hook: { es: ["SE", "PARTIÓ", "LA LLAVE."], en: ["YOUR", "KEY", "SNAPPED."] },
      problem: { es: ["MEDIA", "LLAVE", "ADENTRO."], en: ["HALF", "STUCK", "INSIDE."] },
      problemSub: { es: "No la fuerces con pinzas.", en: "Don't force it with pliers." },
      solution: { es: ["LA SACAMOS.", "TE HACEMOS", "OTRA."], en: ["WE PULL IT.", "WE CUT", "A NEW ONE."] },
      bullets: {
        es: ["Extracción sin dañar la chapa", "Llave nueva cortada", "Todo en una visita"],
        en: ["Extraction without lock damage", "New key cut", "All in one visit"],
      },
      caption: {
        es: "Una llave partida dentro de la chapa o el switch se complica si la fuerzas. Déjanos sacarla y te hacemos una nueva en la misma visita.",
        en: "A key snapped in the lock or ignition gets worse if you force it. Let us extract it and cut you a new one in the same visit.",
      },
      audio: { es: "Golpe seco cuando se separan las piezas", en: "Sharp hit when the pieces split" },
    },
    {
      id: 5, date: "2026-10-21", icon: "ignition", anim: "ignition",
      title: { es: "La llave no gira", en: "Key won't turn" },
      hook: { es: ["¿LA LLAVE", "NO", "GIRA?"], en: ["KEY", "WON'T", "TURN?"] },
      problem: { es: ["SWITCH", "TRABADO."], en: ["STUCK", "IGNITION."] },
      problemSub: { es: "Ni para adelante ni para atrás.", en: "Not forward, not back." },
      solution: { es: ["REPARAMOS", "EL SWITCH."], en: ["WE FIX", "THE", "IGNITION."] },
      bullets: {
        es: ["Reparación o reemplazo", "Llaves nuevas que coinciden", "Sin llevarlo al dealer"],
        en: ["Repair or replacement", "Matching new keys", "No dealer trip"],
      },
      caption: {
        es: "Si la llave entra pero no gira, el problema puede estar en el switch. Lo reparamos o reemplazamos y te dejamos llaves que funcionan.",
        en: "If the key goes in but won't turn, the ignition may be the issue. We repair or replace it and leave you keys that work.",
      },
      audio: { es: "Sonido metálico al trabarse, silencio, beat", en: "Metallic jam sound, silence, beat" },
    },
    {
      id: 6, date: "2026-10-26", icon: "copy", anim: "copy",
      title: { es: "Solo tienes una llave", en: "Only one key" },
      hook: { es: ["¿SOLO", "TIENES", "UNA?"], en: ["ONLY", "ONE", "KEY?"] },
      problem: { es: ["UNA LLAVE", "ES CERO", "LLAVES."], en: ["ONE KEY", "IS ZERO", "KEYS."] },
      problemSub: { es: "Si la pierdes, empieza el problema.", en: "Lose it and the trouble starts." },
      solution: { es: ["HAZ TU", "COPIA", "HOY."], en: ["GET", "A SPARE", "TODAY."] },
      bullets: {
        es: ["Copias con chip y control", "Programadas a tu carro", "Más simple que una emergencia"],
        en: ["Chip and remote spares", "Programmed to your car", "Simpler than an emergency"],
      },
      caption: {
        es: "Hacer una copia ahora siempre es más simple que hacer una llave cuando ya las perdiste todas. Escríbenos y la programamos para tu carro.",
        en: "Making a spare now is always simpler than making a key after you've lost them all. Message us and we'll program one for your car.",
      },
      audio: { es: "Duplicado: el beat se repite en eco", en: "Echo beat that 'duplicates' itself" },
    },
    {
      id: 7, date: "2026-10-30", icon: "moon", anim: "halloween", hookBg: "green",
      title: { es: "Halloween", en: "Halloween" },
      hook: { es: ["LO QUE", "DE VERDAD", "DA MIEDO…"], en: ["WHAT'S", "REALLY", "SCARY…"] },
      problem: { es: ["QUEDARTE", "SIN LLAVES", "DE NOCHE."], en: ["NO KEYS", "AT NIGHT."] },
      problemSub: { es: "Ni fantasmas ni brujas.", en: "Not ghosts. Not witches." },
      solution: { es: ["GUARDA", "ESTE", "NÚMERO."], en: ["SAVE", "THIS", "NUMBER."] },
      bullets: {
        es: ["Aperturas de emergencia", "Llaves perdidas", "Controles que no responden"],
        en: ["Emergency lockouts", "Lost keys", "Dead key fobs"],
      },
      caption: {
        es: "Este Halloween lo único que debería asustarte son los disfraces. Guarda nuestro número antes de salir. 🎃",
        en: "This Halloween the only scary thing should be the costumes. Save our number before you head out. 🎃",
      },
      audio: { es: "Sonido de puerta que rechina → corte a beat", en: "Creaking door → cut to beat" },
    },
  ];

  /* ───────────────────────── CARRUSELES (4:5) ─────────────────────────
     slide.kind: cover | item | compare | list | cta */
  CX.carousels = [
    {
      id: 1, date: "2026-10-01", title: { es: "Conoce CANAVEX", en: "Meet CANAVEX" },
      slides: [
        { kind: "cover", bg: "green", lines: { es: ["LLAVES", "PARA TU", "CARRO."], en: ["KEYS", "FOR YOUR", "CAR."] }, sub: { es: "Todo lo que resolvemos, en un carrusel.", en: "Everything we solve, in one carousel." } },
        { kind: "item", icon: "lock", n: "1", h: { es: "Aperturas", en: "Lockouts" }, p: { es: "Llaves adentro y puertas cerradas. Abrimos sin dañar tu carro.", en: "Keys inside, doors locked. We open it without damaging your car." } },
        { kind: "item", icon: "key", n: "2", h: { es: "Llaves nuevas", en: "New keys" }, p: { es: "Aunque hayas perdido todas. Cortadas y programadas en sitio.", en: "Even if you lost them all. Cut and programmed on site." } },
        { kind: "item", icon: "fob", n: "3", h: { es: "Controles y smart keys", en: "Fobs and smart keys" }, p: { es: "Programación, reemplazo y carcasas nuevas.", en: "Programming, replacement and new shells." } },
        { kind: "item", icon: "ignition", n: "4", h: { es: "Switch de encendido", en: "Ignition" }, p: { es: "Reparación y reemplazo cuando la llave no gira.", en: "Repair and replacement when the key won't turn." } },
        { kind: "item", icon: "copy", n: "5", h: { es: "Copias", en: "Spare keys" }, p: { es: "La copia que te salva de la próxima emergencia.", en: "The spare that saves you from the next emergency." } },
        { kind: "cta", bg: "ink", lines: { es: ["GUÁRDANOS."], en: ["SAVE US."] }, sub: { es: "Para cuando lo necesites.", en: "For when you need us." } },
      ],
      caption: {
        es: "Somos CANAVEX, cerrajería automotriz. Aperturas, llaves nuevas, controles, switch y copias. Guarda este post para cuando lo necesites.",
        en: "We're CANAVEX, automotive locksmith. Lockouts, new keys, fobs, ignitions and spares. Save this post for when you need it.",
      },
    },
    {
      id: 2, date: "2026-10-05", title: { es: "5 señales de que tu control falla", en: "5 signs your fob is failing" },
      slides: [
        { kind: "cover", bg: "ink", lines: { es: ["TU CONTROL", "TE ESTÁ", "AVISANDO."], en: ["YOUR FOB", "IS WARNING", "YOU."] }, sub: { es: "5 señales antes de que te deje a pie.", en: "5 signs before it leaves you stranded." } },
        { kind: "item", icon: "signal", n: "1", h: { es: "Tienes que acercarte más", en: "You have to get closer" }, p: { es: "El alcance baja poco a poco. Suele ser la batería.", en: "Range drops little by little. Usually the battery." } },
        { kind: "item", icon: "fob", n: "2", h: { es: "Hay que apretar dos veces", en: "You press twice" }, p: { es: "Botones gastados o contactos sucios por dentro.", en: "Worn buttons or dirty contacts inside." } },
        { kind: "item", icon: "battery", n: "3", h: { es: "Aviso en el tablero", en: "Dashboard warning" }, p: { es: "“Key battery low”. No lo dejes para después.", en: "“Key battery low”. Don't put it off." } },
        { kind: "item", icon: "broken", n: "4", h: { es: "Carcasa rota", en: "Cracked shell" }, p: { es: "Si se abre, el chip y la batería se pueden perder.", en: "If it opens, the chip and battery can fall out." } },
        { kind: "item", icon: "ignition", n: "5", h: { es: "“Key not detected”", en: "“Key not detected”" }, p: { es: "El carro no reconoce la llave. Puede necesitar programación.", en: "The car doesn't recognize the key. It may need programming." } },
        { kind: "cta", bg: "green", lines: { es: ["NO ESPERES", "A QUE FALLE."], en: ["DON'T WAIT", "FOR IT", "TO DIE."] }, sub: { es: "Escríbenos y lo revisamos.", en: "Message us and we'll check it." } },
      ],
      caption: {
        es: "Tu control casi siempre avisa antes de fallar. ¿Reconoces alguna de estas 5 señales? Escríbenos y lo revisamos.",
        en: "Your fob almost always warns you before it fails. Recognize any of these 5 signs? Message us and we'll check it.",
      },
    },
    {
      id: 3, date: "2026-10-09", title: { es: "Te quedaste afuera: qué hacer", en: "Locked out: what to do" },
      slides: [
        { kind: "cover", bg: "ink", lines: { es: ["TE", "QUEDASTE", "AFUERA."], en: ["LOCKED", "OUT."] }, sub: { es: "Qué hacer (y qué no) en 4 pasos.", en: "What to do (and not do) in 4 steps." } },
        { kind: "item", icon: "shield", n: "1", h: { es: "Ponte a salvo", en: "Get safe" }, p: { es: "Si es de noche o en carretera, busca un lugar iluminado.", en: "At night or on a highway, find a well-lit spot." } },
        { kind: "item", icon: "cross", n: "2", h: { es: "No fuerces nada", en: "Don't force anything" }, p: { es: "Ganchos y alambres rayan, rompen sellos y dañan seguros.", en: "Hangers and wires scratch paint, break seals and damage locks." } },
        { kind: "item", icon: "pin", n: "3", h: { es: "Ten tu ubicación lista", en: "Have your location ready" }, p: { es: "Dirección o pin, marca, modelo y año del carro.", en: "Address or pin, plus make, model and year." } },
        { kind: "item", icon: "phone", n: "4", h: { es: "Llama a un cerrajero", en: "Call a locksmith" }, p: { es: "Abrimos sin daños y sigues tu día.", en: "We open it damage-free and you get on with your day." } },
        { kind: "cta", bg: "green", lines: { es: ["GUARDA", "ESTE POST."], en: ["SAVE", "THIS POST."] }, sub: { es: "Y nuestro número.", en: "And our number." } },
      ],
      caption: {
        es: "Quedarte afuera de tu carro estresa, pero tiene solución. Guarda estos 4 pasos y nuestro número.",
        en: "Getting locked out is stressful, but fixable. Save these 4 steps and our number.",
      },
    },
    {
      id: 4, date: "2026-10-14", title: { es: "Dealer vs. cerrajero automotriz", en: "Dealer vs. auto locksmith" },
      slides: [
        { kind: "cover", bg: "green", lines: { es: ["DEALER", "VS.", "CERRAJERO."], en: ["DEALER", "VS.", "LOCKSMITH."] }, sub: { es: "¿Dónde te conviene hacer tu llave?", en: "Where should you get your key made?" } },
        {
          kind: "compare",
          h: { es: "Cómo se compara", en: "How it compares" },
          cols: { es: ["Dealer", "CANAVEX"], en: ["Dealer", "CANAVEX"] },
          rows: {
            es: [["Llevas el carro", "Vamos a donde estás"], ["Remolque si no hay llave", "Sin remolque"], ["Cita y espera", "Atención directa"], ["Solo tu marca", "Muchas marcas y modelos"]],
            en: [["You bring the car", "We come to you"], ["Tow if no key", "No tow"], ["Appointment and wait", "Direct service"], ["Only your brand", "Many makes and models"]],
          },
        },
        { kind: "item", icon: "key", n: "", h: { es: "La misma llave", en: "The same key" }, p: { es: "Cortada y programada para tu carro, con el equipo adecuado.", en: "Cut and programmed for your car, with the right equipment." } },
        { kind: "cta", bg: "ink", lines: { es: ["COMPÁRALO", "TÚ MISMO."], en: ["COMPARE", "FOR", "YOURSELF."] }, sub: { es: "Pide tu cotización sin compromiso.", en: "Ask for a no-obligation quote." } },
      ],
      caption: {
        es: "El dealer no es la única opción para hacer tu llave. Te contamos la diferencia. Pide tu cotización por DM.",
        en: "The dealer isn't your only option for a new key. Here's the difference. DM us for a quote.",
      },
    },
    {
      id: 5, date: "2026-10-19", title: { es: "Tipos de llaves de carro", en: "Types of car keys" },
      slides: [
        { kind: "cover", bg: "ink", lines: { es: ["¿QUÉ", "LLAVE", "TIENES?"], en: ["WHICH", "KEY DO", "YOU HAVE?"] }, sub: { es: "5 tipos y cómo reconocerlos.", en: "5 types and how to spot them." } },
        { kind: "item", icon: "key", n: "1", h: { es: "Metálica", en: "Basic metal" }, p: { es: "Sin chip. Común en carros más antiguos.", en: "No chip. Common on older cars." } },
        { kind: "item", icon: "key", n: "2", h: { es: "Transponder", en: "Transponder" }, p: { es: "Tiene un chip en la cabeza. Sin programar, el carro no enciende.", en: "A chip in the head. Unprogrammed, the car won't start." } },
        { kind: "item", icon: "fob", n: "3", h: { es: "Llave con control", en: "Remote head key" }, p: { es: "Llave y botones en una sola pieza.", en: "Key and buttons in one piece." } },
        { kind: "item", icon: "signal", n: "4", h: { es: "Smart key", en: "Smart key" }, p: { es: "Encendido por botón. El carro la detecta por proximidad.", en: "Push-to-start. The car detects it by proximity." } },
        { kind: "item", icon: "key", n: "5", h: { es: "Corte láser", en: "Laser cut" }, p: { es: "La ranura va al centro de la hoja, no en el borde.", en: "The groove runs down the middle of the blade, not the edge." } },
        { kind: "cta", bg: "green", lines: { es: ["LAS", "HACEMOS", "TODAS."], en: ["WE MAKE", "THEM ALL."] }, sub: { es: "Mándanos foto de la tuya.", en: "Send us a photo of yours." } },
      ],
      caption: {
        es: "No todas las llaves son iguales. ¿Cuál es la tuya? Mándanos una foto por DM y te decimos qué necesita.",
        en: "Not all keys are the same. Which one is yours? DM us a photo and we'll tell you what it needs.",
      },
    },
    {
      id: 6, date: "2026-10-23", title: { es: "Mitos de las llaves de carro", en: "Car key myths" },
      slides: [
        { kind: "cover", bg: "green", lines: { es: ["MITOS", "QUE TE", "CUESTAN."], en: ["MYTHS", "THAT COST", "YOU."] }, sub: { es: "Lo que se dice de las llaves y no es cierto.", en: "Things people say about keys that aren't true." } },
        { kind: "item", icon: "cross", n: "", h: { es: "“Solo el dealer puede hacerla”", en: "“Only the dealer can make it”" }, p: { es: "Un cerrajero automotriz con el equipo correcto también la corta y la programa.", en: "An automotive locksmith with the right equipment can cut and program it too." } },
        { kind: "item", icon: "cross", n: "", h: { es: "“Sin la original no se puede”", en: "“No original, no key”" }, p: { es: "Se puede hacer una llave nueva aunque las hayas perdido todas.", en: "A new key can be made even if you lost them all." } },
        { kind: "item", icon: "cross", n: "", h: { es: "“Una copia sencilla sirve”", en: "“A basic copy works”" }, p: { es: "Si tu llave tiene chip, la copia también necesita programación.", en: "If your key has a chip, the copy needs programming too." } },
        { kind: "item", icon: "cross", n: "", h: { es: "“Con un gancho lo abro”", en: "“A hanger will open it”" }, p: { es: "Puede dañar sellos, cables y seguros. Sale más caro.", en: "It can damage seals, wiring and locks. It ends up costing more." } },
        { kind: "cta", bg: "ink", lines: { es: ["PREGÚNTANOS", "LO QUE SEA."], en: ["ASK US", "ANYTHING."] }, sub: { es: "Respondemos por DM.", en: "We answer by DM." } },
      ],
      caption: {
        es: "¿Cuántos de estos mitos creías? Comparte este post con quien siempre dice “eso solo lo hace el dealer”.",
        en: "How many of these did you believe? Share this with the friend who always says “only the dealer can do that”.",
      },
    },
    {
      id: 7, date: "2026-10-28", title: { es: "Checklist antes de salir", en: "Checklist before you go" },
      slides: [
        { kind: "cover", bg: "ink", lines: { es: ["ANTES", "DE SALIR", "ESTE FINDE."], en: ["BEFORE", "YOU HEAD", "OUT."] }, sub: { es: "Halloween, viaje o fiesta: revisa esto.", en: "Halloween, road trip or party: check this." } },
        {
          kind: "list",
          h: { es: "Checklist", en: "Checklist" },
          items: {
            es: ["¿Tienes copia de tu llave?", "¿La batería del control responde bien?", "¿Sabes dónde queda la copia?", "¿Guardaste el número de tu cerrajero?"],
            en: ["Do you have a spare key?", "Is your fob battery responding?", "Do you know where the spare is?", "Did you save your locksmith's number?"],
          },
        },
        { kind: "item", icon: "copy", n: "", h: { es: "La copia, lejos de la original", en: "Keep the spare apart" }, p: { es: "Si las dos van en el mismo llavero, no es una copia.", en: "If both are on the same keyring, it's not a spare." } },
        { kind: "cta", bg: "green", lines: { es: ["SAL", "TRANQUILO."], en: ["GO OUT", "WORRY-", "FREE."] }, sub: { es: "Y si algo pasa, llámanos.", en: "And if anything happens, call us." } },
      ],
      caption: {
        es: "Antes de salir este fin de semana, revisa esta lista de 30 segundos. Si te falta algo, escríbenos.",
        en: "Before heading out this weekend, run this 30-second checklist. Missing something? Message us.",
      },
    },
  ];

  /* ───────────────────────── HISTORIAS (lunes a viernes) ─────────────────────────
     Lunes: tip · Martes: encuesta · Miércoles: pregunta frecuente · Jueves: mito o realidad · Viernes: fin de semana */
  const THEMES = {
    1: { kind: "tip", label: { es: "Tip del lunes", en: "Monday tip" } },
    2: { kind: "poll", label: { es: "Encuesta", en: "Poll" } },
    3: { kind: "faq", label: { es: "Preguntas frecuentes", en: "FAQ" } },
    4: { kind: "myth", label: { es: "¿Mito o realidad?", en: "Myth or fact?" } },
    5: { kind: "weekend", label: { es: "Fin de semana", en: "Weekend" } },
  };
  CX.STORY_THEMES = THEMES;

  const tips = [
    { h: { es: ["NO GUARDES", "LA COPIA", "EN EL CARRO."], en: ["DON'T KEEP", "THE SPARE", "IN THE CAR."] }, p: { es: "Si te roban el carro, se llevan las dos llaves.", en: "If the car is stolen, they get both keys." } },
    { h: { es: ["CAMBIA LA", "BATERÍA", "CADA AÑO."], en: ["SWAP THE", "BATTERY", "YEARLY."] }, p: { es: "Más o menos. Antes de que te deje a pie.", en: "Roughly. Before it leaves you stranded." } },
    { h: { es: ["NO USES", "LA LLAVE", "DE LLAVERO."], en: ["DON'T HANG", "A HEAVY", "KEYCHAIN."] }, p: { es: "El peso desgasta el switch con el tiempo.", en: "The weight wears out the ignition over time." } },
    { h: { es: ["TOMA FOTO", "DE TU", "LLAVE."], en: ["SNAP A", "PHOTO OF", "YOUR KEY."] }, p: { es: "Si la pierdes, nos ayuda a identificarla rápido.", en: "If you lose it, it helps us identify it fast." } },
  ];
  const polls = [
    { q: { es: ["¿CUÁNTAS", "LLAVES", "TIENES?"], en: ["HOW MANY", "KEYS DO", "YOU HAVE?"] }, opts: { es: ["Solo una", "Tengo copia"], en: ["Just one", "I have a spare"] }, r: { es: "Si respondiste “solo una”, hablemos.", en: "If you said “just one”, let's talk." } },
    { q: { es: ["¿TE HAS", "QUEDADO", "AFUERA?"], en: ["EVER BEEN", "LOCKED", "OUT?"] }, opts: { es: ["Sí 😩", "Nunca"], en: ["Yes 😩", "Never"] }, r: { es: "Pasa más de lo que crees.", en: "It happens more than you think." } },
    { q: { es: ["¿TU", "CARRO TIENE", "BOTÓN?"], en: ["PUSH-", "TO-START", "CAR?"] }, opts: { es: ["Botón", "Llave"], en: ["Button", "Key"] }, r: { es: "Programamos las dos.", en: "We program both." } },
    { q: { es: ["¿DÓNDE", "GUARDAS", "LA COPIA?"], en: ["WHERE'S", "YOUR", "SPARE?"] }, opts: { es: ["En casa", "¿Qué copia?"], en: ["At home", "What spare?"] }, r: { es: "En casa, lejos del carro, es lo ideal.", en: "At home, away from the car, is ideal." } },
  ];
  const faqs = [
    { q: { es: ["¿NECESITO", "LA LLAVE", "ORIGINAL?"], en: ["DO I NEED", "THE ORIGINAL", "KEY?"] }, a: { es: "No. Podemos hacer una llave nueva aunque las hayas perdido todas.", en: "No. We can make a new key even if you lost them all." } },
    { q: { es: ["¿VAN A", "DONDE ESTOY?"], en: ["DO YOU", "COME TO ME?"] }, a: { es: "Sí, somos móviles. Mándanos tu ubicación.", en: "Yes, we're mobile. Send us your location." } },
    { q: { es: ["¿QUÉ DATOS", "NECESITAN?"], en: ["WHAT INFO", "DO YOU", "NEED?"] }, a: { es: "Marca, modelo, año y, si lo tienes, el VIN.", en: "Make, model, year and, if you have it, the VIN." } },
    { q: { es: ["¿ABREN", "SIN DAÑAR?"], en: ["NO", "DAMAGE?"] }, a: { es: "Sí. Usamos herramientas de apertura profesionales.", en: "Right. We use professional lockout tools." } },
  ];
  const myths = [
    { s: { es: ["SOLO EL", "DEALER", "PROGRAMA."], en: ["ONLY THE", "DEALER CAN", "PROGRAM."] }, v: "myth", a: { es: "Un cerrajero automotriz con el equipo correcto también programa llaves.", en: "An automotive locksmith with the right equipment programs keys too." } },
    { s: { es: ["EL CHIP", "VA EN LA", "LLAVE."], en: ["THE CHIP", "IS IN", "THE KEY."] }, v: "fact", a: { es: "Las llaves transponder llevan un chip que el carro debe reconocer.", en: "Transponder keys carry a chip the car has to recognize." } },
    { s: { es: ["UN GANCHO", "NO HACE", "DAÑO."], en: ["A HANGER", "DOES NO", "HARM."] }, v: "myth", a: { es: "Puede romper sellos, cables y seguros de la puerta.", en: "It can break seals, wiring and door locks." } },
    { s: { es: ["EL CONTROL", "SE PUEDE", "PROGRAMAR."], en: ["A FOB", "CAN BE", "PROGRAMMED."] }, v: "fact", a: { es: "Un control nuevo o usado se puede programar a tu carro.", en: "A new or used fob can be programmed to your car." } },
    { s: { es: ["SIN LLAVE", "HAY QUE", "REMOLCAR."], en: ["NO KEY", "MEANS", "A TOW."] }, v: "myth", a: { es: "Hacemos la llave donde está el carro. Sin remolque.", en: "We make the key where the car is. No tow." } },
  ];
  const weekends = [
    { h: { es: ["¿SALES", "ESTE", "FINDE?"], en: ["HEADING", "OUT THIS", "WEEKEND?"] }, p: { es: "Guarda nuestro número antes de irte.", en: "Save our number before you go." } },
    { h: { es: ["VIERNES.", "LLAVES", "EN MANO."], en: ["FRIDAY.", "KEYS", "IN HAND."] }, p: { es: "Revisa que la copia esté en casa.", en: "Make sure your spare is at home." } },
    { h: { es: ["PLAN DE", "FINDE:", "SIN SUSTOS."], en: ["WEEKEND", "PLAN:", "NO SCARES."] }, p: { es: "Y si pasa algo, aquí estamos.", en: "And if anything happens, we're here." } },
    { h: { es: ["NO TE", "QUEDES", "AFUERA."], en: ["DON'T GET", "LOCKED", "OUT."] }, p: { es: "Pero si pasa, escríbenos.", en: "But if it happens, message us." } },
    { h: { es: ["FELIZ", "HALLOWEEN."], en: ["HAPPY", "HALLOWEEN."] }, p: { es: "Que el único susto sea el disfraz.", en: "May the only scare be the costume." } },
  ];

  /* Genera los días hábiles de octubre y les asigna contenido según el día de la semana */
  CX.stories = [];
  const counters = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const days = new Date(CX.MONTH.year, CX.MONTH.month + 1, 0).getDate();
  for (let d = 1; d <= days; d++) {
    const date = new Date(CX.MONTH.year, CX.MONTH.month, d);
    const wd = date.getDay();
    if (wd < 1 || wd > 5) continue;
    const i = counters[wd]++;
    const iso = `2026-10-${String(d).padStart(2, "0")}`;
    const theme = THEMES[wd];
    const data = { tip: tips, poll: polls, faq: faqs, myth: myths, weekend: weekends }[theme.kind][i];
    CX.stories.push({ id: iso, date: iso, weekday: wd, kind: theme.kind, label: theme.label, data });
  }

  /* Utilidades */
  CX.t = (v, lang) => (v && typeof v === "object" && !Array.isArray(v) && (v.es !== undefined || v.en !== undefined) ? v[lang] : v);
  CX.parseDate = (iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
})();
