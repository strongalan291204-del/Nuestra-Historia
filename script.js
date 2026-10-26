/* =========================================================
   NUESTRA PEQUEÑA HISTORIA — script.js
   ========================================================= */

/* ---------------------------------------------------------
   0. CONFIGURACIÓN — edita aquí lo que quieras personalizar
   --------------------------------------------------------- */
const START_DATE = new Date("2022-06-18T00:00:00");

// Agrega, quita o edita todas las razones que quieras.
// Es un simple arreglo de strings: fácil de editar.
const REASONS = [
  "Porque tu risa arregla hasta mis peores días.",
  "Porque me haces sentir en casa sin importar dónde estemos.",
  "Porque tienes la manera más dulce de decir mi nombre.",
  "Porque contigo hasta lo simple se vuelve mi momento favorito.",
  "Porque me miras y siento que no tengo que fingir nada.",
  "Porque tu abrazo es el lugar más seguro que conozco.",
  "Porque cada plan es mejor si tú estás en él.",
  "Porque me cuidas hasta en los detalles que nadie más nota.",
  "Porque tu voz es lo primero que quiero escuchar en el día.",
  "Porque haces que amar sea fácil, incluso en los días difíciles.",
  "Porque eres mi persona favorita en cualquier versión de mi vida.",
  "Porque contigo el 'para siempre' no me da miedo.",
  "Porque tu paciencia conmigo es un regalo que no doy por sentado.",
  "Porque desde el 18 de junio de 2022 todo tiene más sentido.",
  "Porque elegirte no es una decisión, es un reflejo.",
  "Porque tu manera de amar es la más honesta que he visto.",
  "Porque me inspiras a ser mejor sin siquiera intentarlo.",
  "Porque amo a la Cami que eres cuando nadie más te ve.",
  "Porque tu mano en la mía siempre encaja perfecto.",
  "Porque quiero seguir sumando historias contigo, mi persona favorita en el mundo."
];

/* ---------------------------------------------------------
   1. SCROLL REVEAL (IntersectionObserver)
   --------------------------------------------------------- */
const revealTargets = document.querySelectorAll(
  ".reveal-fade, .reveal-scale, .reveal-side"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
);

revealTargets.forEach((el, i) => {
  el.style.setProperty("--i", i % 6);
  revealObserver.observe(el);
});

/* also observe timeline items for the little dot fill */
document.querySelectorAll(".timeline__item").forEach((item) => {
  revealObserver.observe(item);
});

/* ---------------------------------------------------------
   2. NAV DE PUNTOS — resalta la sección activa
   --------------------------------------------------------- */
const sections = document.querySelectorAll(".section");
const dots = document.querySelectorAll(".dot-nav .dot");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        dots.forEach((dot) => {
          dot.classList.toggle("active", dot.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((s) => navObserver.observe(s));

/* ---------------------------------------------------------
   3. CONTADOR DE TIEMPO JUNTOS (con animación numérica)
   --------------------------------------------------------- */
function computeElapsed(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  let hours = to.getHours() - from.getHours();

  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }
  return { years, months, days, hours };
}

function animateCount(el, target, duration = 1200) {
  const startVal = 0;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(startVal + (target - startVal) * eased);
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

let counterAnimated = false;

function updateCounter(animate) {
  const now = new Date();
  const elapsed = computeElapsed(START_DATE, now);

  const map = {
    "cnt-years": elapsed.years,
    "cnt-months": elapsed.months,
    "cnt-days": elapsed.days,
    "cnt-hours": elapsed.hours,
  };

  Object.entries(map).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (animate) {
      animateCount(el, value, 1400);
    } else {
      el.textContent = value;
    }
  });
}

// Recalcula cada minuto para que las horas se mantengan exactas
updateCounter(false);
setInterval(() => updateCounter(false), 60 * 1000);

// Anima con números "subiendo" la primera vez que la sección entra en vista
const counterSection = document.getElementById("contador");
if (counterSection) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counterAnimated) {
          counterAnimated = true;
          updateCounter(true);
        }
      });
    },
    { threshold: 0.4 }
  );
  counterObserver.observe(counterSection);
}

/* ---------------------------------------------------------
   4. RAZONES POR LAS QUE TE AMO
   --------------------------------------------------------- */
const reasonsBtn = document.getElementById("reasons-btn");
const reasonsText = document.getElementById("reasons-text");
let lastReasonIndex = -1;

function pickReason() {
  if (REASONS.length === 0) return "";
  let idx = Math.floor(Math.random() * REASONS.length);
  if (REASONS.length > 1) {
    while (idx === lastReasonIndex) {
      idx = Math.floor(Math.random() * REASONS.length);
    }
  }
  lastReasonIndex = idx;
  return REASONS[idx];
}

reasonsBtn?.addEventListener("click", () => {
  reasonsText.classList.add("swap");
  setTimeout(() => {
    reasonsText.textContent = pickReason();
    reasonsText.classList.remove("swap");
  }, 300);
});

/* ---------------------------------------------------------
   5. REPRODUCTOR DE MÚSICA FLOTANTE
   --------------------------------------------------------- */
const audio = document.getElementById("bg-audio");
const musicToggle = document.getElementById("music-toggle");

musicToggle?.addEventListener("click", () => {
  if (!audio) return;
  if (audio.paused) {
    audio.volume = 0.6;
    audio.play().catch(() => {
      alert("Agrega tu canción en assets/nuestra-cancion.mp3 para poder reproducirla.");
    });
    musicToggle.classList.add("playing");
  } else {
    audio.pause();
    musicToggle.classList.remove("playing");
  }
});

/* ---------------------------------------------------------
   6. FONDO — pétalos flotando suavemente (canvas)
   --------------------------------------------------------- */
const canvas = document.getElementById("petals-canvas");
const ctx = canvas.getContext("2d");
let W, H, petals = [];

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const PETAL_COLORS = ["#e08a9c", "#e4cfa0", "#c6455f", "#f4e9e4"];
const PETAL_COUNT = window.innerWidth < 640 ? 22 : 40;

function makePetal() {
  return {
    x: Math.random() * W,
    y: Math.random() * H, // distribuidos desde el inicio, no solo arriba
    size: 7 + Math.random() * 9,
    speedY: 0.35 + Math.random() * 0.6,
    speedX: Math.random() * 0.6 - 0.3,
    sway: Math.random() * 2 * Math.PI,
    swaySpeed: 0.005 + Math.random() * 0.01,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 0.6,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    opacity: 0.55 + Math.random() * 0.4,
  };
}

for (let i = 0; i < PETAL_COUNT; i++) petals.push(makePetal());

function drawPetal(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);
  ctx.globalAlpha = p.opacity;
  ctx.shadowColor = p.color;
  ctx.shadowBlur = 6;
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function animatePetals() {
  ctx.clearRect(0, 0, W, H);
  petals.forEach((p) => {
    p.sway += p.swaySpeed;
    p.y += p.speedY;
    p.x += p.speedX + Math.sin(p.sway) * 0.4;
    p.rotation += p.rotationSpeed;

    if (p.y > H + 20) {
      p.y = -20;
      p.x = Math.random() * W;
    }
    if (p.x > W + 20) p.x = -20;
    if (p.x < -20) p.x = W + 20;

    drawPetal(p);
  });
  requestAnimationFrame(animatePetals);
}

// Los pétalos son un elemento decorativo suave; se muestran siempre.
animatePetals();
