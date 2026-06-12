const finalMessage = `
amor,

se você chegou ate aqui, já entendeu que isso aqui eh só uma forma de mostrar o tamanho do que você significa pra mim.

nossa história não começou no dia em que eu te pedi em namoro. ela começou muito antes, la nos corredores da Fundação Bradesco, quando a gente nem imaginava que um dia ia ficar junto.

passou tempo, mudaram as salas, vieram conversas novas, a viagem da amaze, os encontros no bebedouro, as risadas, as brincadeiras e ate o famoso "tô no egito com meus amigos". e sem perceber você foi virando a melhor parte dos meus dias.

hoje eu olho pra tudo isso e vejo que cada detalhe valeu a pena. porque o melhor lugar nunca foi um parque, um shopping, um cinema ou um restaurante.

o melhor lugar sempre foi e sempre será ao seu lado.

obrigado por tudo.

obrigado pelos momentos que vivemos.

obrigado por ser exatamente quem você eh.

e obrigado por me fazer tão feliz.

também agradeço a Deus, porque a melhor resposta das minhas orações foi ter colocado você na minha vida.

feliz dia dos namorados amor.

eu te amo infinitamente sempre ∞ ❤️

hoje.
amanhã.
e em todos os dias que ainda vamos viver juntos!

— Arthur, (Peres), (pp) ❤️
`;

function createHeartRain() {
  const hearts = ["❤️","💖","💕","💘","💗"];

  for(let i = 0; i < 120; i++) {

    const heart = document.createElement("div");

    heart.className = "heart-particle";
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (3 + Math.random() * 4) + "s";
    heart.style.fontSize = (18 + Math.random() * 18) + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 8000);
  }
}

function typeWriter(text, element, speed = 25, callback = null) {

  let i = 0;

  function typing() {

    if(i < text.length) {

      if(text.charAt(i) === "\n") {
        element.innerHTML += "<br>";
      } else {
        element.innerHTML += text.charAt(i);
      }

      i++;
      setTimeout(typing, speed);

    } else {

      if(callback) callback();

    }
  }

  typing();
}

document.addEventListener("DOMContentLoaded", () => {

  const button = document.getElementById("loveExplosionBtn");

  const letter = document.getElementById("typedLetter");

  const surprise = document.getElementById("lastSurprise");

  button.addEventListener("click", () => {

    button.style.display = "none";

    letter.classList.remove("hidden");

    createHeartRain();

    typeWriter(finalMessage, letter, 20, () => {

      surprise.classList.remove("hidden");

      surprise.innerHTML += `
        <div class="ending-quote">
          Algumas histórias são bonitas.<br><br>
          Outras são inesquecíveis.<br><br>
          A nossa é a minha favorita. ❤️
        </div>
      `;
    });

  });

});