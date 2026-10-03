/* ==========================================
   PERSONALISE THIS FILE
   ==========================================
   1. Change the password below.
   2. Do not put your actual password in a public
      website if you need serious security.
   This is a cute/private website lock, not bank-level security.
*/

const SECRET_PASSWORD = "150924"; // <-- CHANGE THIS

const permissionBtn = document.getElementById("permissionBtn");
const passwordArea = document.getElementById("passwordArea");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const errorMessage = document.getElementById("errorMessage");
const lockScreen = document.getElementById("lockScreen");
const mainSite = document.getElementById("mainSite");

permissionBtn.addEventListener("click", () => {
  permissionBtn.style.display = "none";
  passwordArea.classList.remove("hidden");
  passwordInput.focus();
});

function tryUnlock() {
  if (passwordInput.value === SECRET_PASSWORD) {
    lockScreen.style.transition = "opacity .8s ease";
    lockScreen.style.opacity = "0";

    setTimeout(() => {
      lockScreen.classList.add("hidden");
      mainSite.classList.remove("hidden");
      window.scrollTo(0, 0);
    }, 800);
  } else {
    errorMessage.textContent = "That's not it, boyfriend 😌 Hint ~ Try again with OUR DATE ❤️";
    passwordInput.value = "";
    passwordInput.focus();
  }
}

unlockBtn.addEventListener("click", tryUnlock);

passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    tryUnlock();
  }
});

/* ---------- LETTERS ---------- */

document.querySelectorAll(".envelope").forEach((envelope) => {
  envelope.addEventListener("click", () => {
    const card = envelope.closest(".letter-card");
    card.classList.toggle("open");

    if (card.classList.contains("open")) {
      setTimeout(() => {
        card.querySelector(".letter-body").scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }, 150);
    }
  });
});


/* ---------- MUSIC ---------- */

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

musicButton.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      musicButton.classList.add("playing");
      musicIcon.textContent = "❚❚";
      musicText.textContent = "Pause our song";
    } catch (error) {
      musicText.textContent = "Add music.mp3";
    }
  } else {
    backgroundMusic.pause();
    musicButton.classList.remove("playing");
    musicIcon.textContent = "♫";
    musicText.textContent = "Play our song";
  }
});

/* ---------- TYPING MESSAGE ---------- */

const typingMessage = document.getElementById("typingMessage");
const typingWords = [
  "You deserve to be celebrated.",
  "You are so special to me.",
  "So I made this little surprise for you. ❤️"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeMessage() {
  if (!typingMessage) return;

  const current = typingWords[wordIndex];

  if (!deleting) {
    typingMessage.textContent = current.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeMessage, 1800);
      return;
    }
  } else {
    typingMessage.textContent = current.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
    }
  }

  setTimeout(typeMessage, deleting ? 45 : 75);
}

typeMessage();

/* ---------- FALLING PETALS ---------- */

const petalContainer = document.getElementById("petalContainer");

function createPetal() {
  if (!petalContainer) return;

  const petal = document.createElement("span");
  petal.className = "petal";

  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = (6 + Math.random() * 7) + "s";
  petal.style.animationDelay = Math.random() * 2 + "s";
  petal.style.transform = `rotate(${Math.random() * 180}deg)`;
  petal.style.opacity = (.35 + Math.random() * .45).toFixed(2);
  petal.style.width = (7 + Math.random() * 7) + "px";
  petal.style.height = (10 + Math.random() * 8) + "px";

  petalContainer.appendChild(petal);

  setTimeout(() => petal.remove(), 15000);
}

setInterval(createPetal, 500);

/* ---------- SECRET MESSAGE ---------- */

const secretButton = document.getElementById("secretButton");
const secretMessage = document.getElementById("secretMessage");

if (secretButton) {
  secretButton.addEventListener("click", () => {
    secretMessage.classList.remove("hidden");
    secretButton.textContent = "You found it ♡";
    secretButton.disabled = true;
    secretButton.style.opacity = ".75";

    secretMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
}

/* ---------- PHOTO LIGHTBOX ---------- */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".memory-card").forEach((card) => {
  card.addEventListener("click", () => {
    const image = card.querySelector("img");

    lightboxImage.src = image.src;
    lightboxCaption.textContent = card.dataset.caption || "";

    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});

function closePhoto() {
  lightbox.classList.add("hidden");
  document.body.style.overflow = "";
}

closeLightbox.addEventListener("click", closePhoto);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closePhoto();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePhoto();
  }
});

/* ---------- LITTLE HEARTS ---------- */

const heartsContainer = document.querySelector(".floating-hearts");

if (heartsContainer) {
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement("span");
    heart.textContent = Math.random() > .5 ? "♡" : "♥";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.top = Math.random() * 100 + "%";
    heart.style.fontSize = (12 + Math.random() * 22) + "px";
    heart.style.color = "rgba(184,45,75,.13)";
    heart.style.animation = `floatHeart ${5 + Math.random() * 5}s ease-in-out infinite`;
    heart.style.animationDelay = Math.random() * 3 + "s";
    heartsContainer.appendChild(heart);
  }
}

/* Add the animation dynamically */
const style = document.createElement("style");
style.textContent = `
@keyframes floatHeart {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(8deg); }
}`;
document.head.appendChild(style);
