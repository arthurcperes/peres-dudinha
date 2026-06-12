const startDate = new Date("2026-03-05T00:00:00-03:00");

const sectionOrder = [
  "introSection",
  "quizSection",
  "scratchSection",
  "scratchSection2",
  "scratchSection3",
  "forcaSection",
  "rouletteSection",
  "storySection",
  "musicSection",
  "letterSection",
  "gallerySection",
];

function $(id) {
  return document.getElementById(id);
}

function showSection(id) {
  const el = $(id);
  if (!el) return;

  el.classList.remove("hidden");

  window.setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

function hideSection(id) {
  const el = $(id);
  if (!el) return;
  el.classList.add("hidden");
}

function updateCounter() {
  const now = new Date();
  const diff = Math.max(0, now - startDate);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const countDays = $("countDays");
  const countHours = $("countHours");
  const countMinutes = $("countMinutes");
  const countSeconds = $("countSeconds");

  if (countDays) countDays.textContent = String(days);
  if (countHours) countHours.textContent = String(hours).padStart(2, "0");
  if (countMinutes) countMinutes.textContent = String(minutes).padStart(2, "0");
  if (countSeconds) countSeconds.textContent = String(seconds).padStart(2, "0");
}

function scrollToTop() {
  const hero = $("topo");
  if (hero) {
    hero.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

let confettiCtx = null;
let confettiCanvas = null;
let confettiParticles = [];
let confettiRunning = false;

function resizeConfettiCanvas() {
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth * window.devicePixelRatio;
  confettiCanvas.height = window.innerHeight * window.devicePixelRatio;
  confettiCtx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}

function createConfettiParticle(x, y) {
  const colors = ["#e85d75", "#f7c7d0", "#ffd166", "#8ecae6", "#cdb4db", "#ffffff"];
  return {
    x,
    y,
    vx: (Math.random() - 0.5) * 8,
    vy: Math.random() * -8 - 4,
    gravity: 0.18 + Math.random() * 0.08,
    size: 6 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.2,
    life: 140 + Math.random() * 40,
  };
}

function burstConfetti(amount = 120, fromTop = true) {
  if (!confettiCtx || !confettiCanvas) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  for (let i = 0; i < amount; i++) {
    const x = Math.random() * width;
    const y = fromTop ? -10 : height * 0.35;
    confettiParticles.push(createConfettiParticle(x, y));
  }

  if (!confettiRunning) {
    confettiRunning = true;
    requestAnimationFrame(tickConfetti);
  }
}

function tickConfetti() {
  if (!confettiCtx || !confettiCanvas) return;

  confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  confettiParticles = confettiParticles.filter((p) => p.life > 0 && p.y < window.innerHeight + 30);

  for (const p of confettiParticles) {
    p.vy += p.gravity;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.vr;
    p.life -= 1;

    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.rotation);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
    confettiCtx.restore();
  }

  if (confettiParticles.length > 0) {
    requestAnimationFrame(tickConfetti);
  } else {
    confettiRunning = false;
  }
}

function initConfetti() {
  confettiCanvas = $("confetti-canvas");
  if (!confettiCanvas) return;

  confettiCtx = confettiCanvas.getContext("2d");
  resizeConfettiCanvas();

  window.addEventListener("resize", resizeConfettiCanvas);
}

function initNavigation() {
  const startBtn = $("startBtn");
  const toQuizBtn = $("toQuizBtn");
  const backToTopBtn = $("backToTopBtn");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      showSection("introSection");
      showSection("quizSection");
      burstConfetti(90);
    });
  }

  if (toQuizBtn) {
    toQuizBtn.addEventListener("click", () => {
      showSection("quizSection");
      burstConfetti(50);
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", scrollToTop);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCounter();
  initConfetti();
  initNavigation();

  window.showSection = showSection;
  window.hideSection = hideSection;
  window.burstConfetti = burstConfetti;
  window.sectionOrder = sectionOrder;
  window.scrollToTopSite = scrollToTop;

  setInterval(updateCounter, 1000);
});

window.addEventListener("load", () => {
  updateCounter();
});