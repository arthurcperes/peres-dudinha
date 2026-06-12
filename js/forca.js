const forcaAnswer = "SEU ABRAÇO";
const forcaHint = "É o melhor lugar do mundo";

let guessedLetters = [];
let mistakes = 0;

function $(id) {
  return document.getElementById(id);
}

function normalizeText(text) {
  return text
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function renderForca() {
  const wordEl = $("forcaWord");
  const lettersEl = $("forcaLetters");
  const mistakesEl = $("forcaMistakes");
  const messageEl = $("forcaMessage");
  const nextBtn = $("forcaNextBtn");

  if (!wordEl || !lettersEl || !mistakesEl || !messageEl || !nextBtn) return;

  const normalizedAnswer = normalizeText(forcaAnswer);

  wordEl.innerHTML = "";
  for (const char of forcaAnswer) {
    const span = document.createElement("div");
    span.className = "forca__char";

    if (char === " ") {
      span.style.borderBottom = "none";
      span.textContent = "";
    } else if (guessedLetters.includes(normalizeText(char))) {
      span.textContent = char;
    } else {
      span.textContent = "";
    }

    wordEl.appendChild(span);
  }

  lettersEl.innerHTML = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  alphabet.forEach((letter) => {
    const btn = document.createElement("button");
    btn.className = "forca__letter";
    btn.type = "button";
    btn.textContent = letter;

    const alreadyUsed = guessedLetters.includes(letter);
    if (alreadyUsed || mistakes >= 6) {
      btn.disabled = true;
    }

    btn.addEventListener("click", () => handleLetter(letter));
    lettersEl.appendChild(btn);
  });

  mistakesEl.textContent = `Erros: ${mistakes} de 6`;

  const isWon = normalizedAnswer
    .split("")
    .every((char) => char === " " || guessedLetters.includes(char));

  if (isWon) {
    messageEl.textContent = "Você acertou! ❤️";
    nextBtn.classList.remove("hidden");
    lettersEl.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
    if (typeof burstConfetti === "function") burstConfetti(100);
  } else if (mistakes >= 6) {
    messageEl.textContent = `A resposta era: ${forcaAnswer}`;
    nextBtn.classList.remove("hidden");
    lettersEl.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
  } else {
    messageEl.textContent = `Dica: ${forcaHint}`;
    nextBtn.classList.add("hidden");
  }
}

function handleLetter(letter) {
  const normalizedAnswer = normalizeText(forcaAnswer);

  guessedLetters.push(letter);

  if (!normalizedAnswer.includes(letter)) {
    mistakes += 1;
  }

  renderForca();
}

document.addEventListener("DOMContentLoaded", () => {
  guessedLetters = [];
  mistakes = 0;
  renderForca();

  const nextBtn = $("forcaNextBtn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      hideSection("forcaSection");
      showSection("rouletteSection");
    });
  }
});