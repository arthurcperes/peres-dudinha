function initScratchCanvas(canvasId, nextBtnId) {
  const canvas = document.getElementById(canvasId);
  const nextBtn = document.getElementById(nextBtnId);

  if (!canvas || !nextBtn) return;

  const ctx = canvas.getContext("2d");
  const parent = canvas.parentElement;
  let isDrawing = false;
  let buttonShown = false;

  function resizeCanvas() {
    const rect = parent.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawOverlay();
  }

  function drawOverlay() {
    const rect = parent.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, rect.width, rect.height);

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#f3d1da");
    gradient.addColorStop(1, "#e85d75");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.font = "bold 22px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Raspe aqui", rect.width / 2, rect.height / 2);
  }

  function getPos(event) {
    const rect = canvas.getBoundingClientRect();
    const point = event.touches ? event.touches[0] : event;
    return {
      x: point.clientX - rect.left,
      y: point.clientY - rect.top,
    };
  }

  function scratchAt(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 34, 0, Math.PI * 2);
    ctx.fill();
  }

  function checkProgress() {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentPixels = 0;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) transparentPixels++;
    }

    const totalPixels = data.length / 4;
    const percent = transparentPixels / totalPixels;

    if (percent > 0.45 && !buttonShown) {
      buttonShown = true;
      nextBtn.classList.remove("hidden");
      if (typeof burstConfetti === "function") burstConfetti(80);
    }
  }

  function startDraw(event) {
    isDrawing = true;
    const pos = getPos(event);
    scratchAt(pos.x, pos.y);
    checkProgress();
  }

  function moveDraw(event) {
    if (!isDrawing) return;
    event.preventDefault();
    const pos = getPos(event);
    scratchAt(pos.x, pos.y);
    checkProgress();
  }

  function stopDraw() {
    isDrawing = false;
  }

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", moveDraw);
  canvas.addEventListener("mouseup", stopDraw);
  canvas.addEventListener("mouseleave", stopDraw);

  canvas.addEventListener("touchstart", startDraw, { passive: true });
  canvas.addEventListener("touchmove", moveDraw, { passive: false });
  canvas.addEventListener("touchend", stopDraw);

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
}

document.addEventListener("DOMContentLoaded", () => {
  initScratchCanvas("scratchCanvas", "scratchNextBtn");
  initScratchCanvas("scratchCanvas2", "scratchNextBtn2");
  initScratchCanvas("scratchCanvas3", "scratchNextBtn3");

  const next1 = document.getElementById("scratchNextBtn");
  const next2 = document.getElementById("scratchNextBtn2");
  const next3 = document.getElementById("scratchNextBtn3");

  if (next1) {
    next1.addEventListener("click", () => {
      hideSection("scratchSection");
      showSection("scratchSection2");
    });
  }

  if (next2) {
    next2.addEventListener("click", () => {
      hideSection("scratchSection2");
      showSection("scratchSection3");
    });
  }

  if (next3) {
    next3.addEventListener("click", () => {
      hideSection("scratchSection3");
      showSection("forcaSection");
    });
  }
});