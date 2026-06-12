const quizData = [
  {
    question: "Onde nós estudamos juntos desde pequenos?",
    options: [
      { text: "Fundação Bradesco", correct: true },
      { text: "Shopping União", correct: false },
      { text: "Parque Villa-Lobos", correct: false },
      { text: "Amaze", correct: false },
    ],
  },
  {
    question: "Qual era nosso ponto de encontro na escola?",
    options: [
      { text: "Biblioteca", correct: false },
      { text: "Bebedouro", correct: true },
      { text: "Quadra", correct: false },
      { text: "Cantina", correct: false },
    ],
  },
  {
    question: "Quando foi nosso primeiro beijo?",
    options: [
      { text: "24/10/2025", correct: false },
      { text: "31/10/2025", correct: true },
      { text: "05/03/2026", correct: false },
      { text: "14/02/2026", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let answeredCorrectly = false;

function $(id) {
  return document.getElementById(id);
}

function renderQuestion() {
  const questionEl = $("quizQuestion");
  const optionsEl = $("quizOptions");
  const progressEl = $("quizProgress");
  const feedbackEl = $("quizFeedback");
  const nextBtn = $("quizNextBtn");

  if (!questionEl || !optionsEl || !progressEl || !feedbackEl || !nextBtn) return;

  const current = quizData[currentQuestionIndex];

  questionEl.textContent = current.question;
  progressEl.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");
  answeredCorrectly = false;

  optionsEl.innerHTML = "";

  current.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "quiz__option";
    button.type = "button";
    button.textContent = option.text;
    button.dataset.correct = String(option.correct);

    button.addEventListener("click", () => handleAnswer(button, option.correct));

    optionsEl.appendChild(button);
  });
}

function handleAnswer(button, isCorrect) {
  const options = document.querySelectorAll(".quiz__option");
  const feedbackEl = $("quizFeedback");
  const nextBtn = $("quizNextBtn");

  options.forEach((opt) => {
    opt.disabled = true;
    const correct = opt.dataset.correct === "true";

    if (correct) {
      opt.classList.add("correct");
    }
  });

  if (isCorrect) {
    button.classList.add("correct");
    feedbackEl.textContent = "Acertou! ❤️";
    answeredCorrectly = true;
    if (typeof burstConfetti === "function") burstConfetti(60);
    nextBtn.textContent = currentQuestionIndex === quizData.length - 1 ? "Ir para as lembranças" : "Avançar";
    nextBtn.classList.remove("hidden");
  } else {
    button.classList.add("wrong");
    feedbackEl.textContent = "Quase! Tenta novamente.";
    setTimeout(() => {
      const current = quizData[currentQuestionIndex];
      const buttons = Array.from(document.querySelectorAll(".quiz__option"));
      buttons.forEach((btn, index) => {
        btn.disabled = false;
        btn.classList.remove("wrong", "correct");
        btn.dataset.correct = String(current.options[index].correct);
      });
      feedbackEl.textContent = "";
    }, 900);
  }
}

function goNext() {
  const nextBtn = $("quizNextBtn");
  if (!answeredCorrectly) return;

  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    if (typeof burstConfetti === "function") burstConfetti(110);
    hideSection("quizSection");
    showSection("scratchSection");
  }

  if (nextBtn) nextBtn.blur();
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();

  const nextBtn = $("quizNextBtn");
  if (nextBtn) {
    nextBtn.addEventListener("click", goNext);
  }
});