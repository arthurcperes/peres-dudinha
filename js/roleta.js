let isSpinning = false;
let currentRotation = 0;

function $(id) {
  return document.getElementById(id);
}

const roulettePlaces = [
  { name: "Academia", center: 324 },
  { name: "Cinema", center: 36 },
  { name: "Restaurante", center: 108 },
  { name: "Shopping", center: 180 },
  { name: "Parque", center: 252 },
];

function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

function circularDistance(a, b) {
  const diff = Math.abs(normalizeAngle(a) - normalizeAngle(b));
  return Math.min(diff, 360 - diff);
}

function getWinnerFromRotation(rotation) {
  const angleAtPointer = normalizeAngle(360 - rotation);

  let winner = roulettePlaces[0];
  let smallestDistance = circularDistance(angleAtPointer, winner.center);

  for (const place of roulettePlaces) {
    const distance = circularDistance(angleAtPointer, place.center);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      winner = place;
    }
  }

  return winner;
}

function spinRoulette() {
  if (isSpinning) return;

  const wheel = $("rouletteWheel");
  const result = $("rouletteResult");
  const nextBtn = $("rouletteNextBtn");
  const spinBtn = $("spinBtn");

  if (!wheel || !result || !nextBtn || !spinBtn) return;

  isSpinning = true;
  spinBtn.disabled = true;
  result.textContent = "Girando...";

  const selected = roulettePlaces[Math.floor(Math.random() * roulettePlaces.length)];

  const extraSpins = 4 * 360 + Math.floor(Math.random() * 360);
  const deltaToTop = normalizeAngle(360 - selected.center - currentRotation);

  currentRotation += extraSpins + deltaToTop;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    const winner = getWinnerFromRotation(currentRotation);
    result.textContent = `O próximo passeio é: ${winner.name} ❤️`;
    nextBtn.classList.remove("hidden");
    isSpinning = false;
    spinBtn.disabled = false;

    if (typeof burstConfetti === "function") burstConfetti(100);
  }, 4200);
}

document.addEventListener("DOMContentLoaded", () => {
  const spinBtn = $("spinBtn");
  const nextBtn = $("rouletteNextBtn");

  if (spinBtn) {
    spinBtn.addEventListener("click", spinRoulette);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      hideSection("rouletteSection");
showSection("storySection");
showSection("musicSection");
showSection("letterSection");
showSection("gallerySection");
showSection("finalSection");
      if (typeof burstConfetti === "function") burstConfetti(120);
    });
  }
});