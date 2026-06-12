const finalMessage = `
Amor,

Se você chegou até aqui, significa que viu cada pedacinho dessa surpresa.

E talvez isso seja só um site.

Mas para mim, é uma forma de mostrar o quanto você é importante.

Porque nossa história não começou no dia em que eu te pedi em namoro.

Ela começou muito antes.

Começou nos corredores da Fundação Bradesco.

Começou nos dias em que a gente nem imaginava que um dia estaria junto.

Começou quando Deus colocou nossas vidas no mesmo caminho, mesmo que a gente ainda não conseguisse perceber.

Passaram-se anos.

Vieram novas salas, novos momentos, novas conversas.

Veio a viagem da Amaze.

Vieram os encontros no bebedouro.

Vieram as risadas.

Vieram as brincadeiras.

Veio o famoso "Tô no Egito com meus amigos".

E, sem perceber, você foi se tornando a melhor parte dos meus dias.

Até que chegou o momento em que eu não conseguia mais imaginar minha vida sem você.

E desde então, cada abraço seu virou lar.

Cada sorriso seu virou motivo.

Cada momento ao seu lado virou memória.

Obrigado por tudo.

Obrigado pela sua companhia.

Obrigado pela sua paciência.

Obrigado por cada momento que vivemos.

E obrigado por ser exatamente quem você é.

Se algum dia alguém me perguntar qual foi a melhor coisa que aconteceu na minha vida, a resposta sempre será a mesma:

Você.

Porque o melhor lugar do mundo nunca foi um parque.

Nunca foi um shopping.

Nunca foi um cinema.

Nunca foi um restaurante.

O melhor lugar do mundo sempre foi e sempre será ao seu lado.

Feliz Dia dos Namorados, amor.

Eu te amo. ❤️

Hoje.

Amanhã.

E em todos os dias que ainda vamos viver juntos.

— Arthur ❤️
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