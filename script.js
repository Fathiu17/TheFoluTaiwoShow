/* ==========================================================
   THE FOLU TAIWO SHOW — Interactive Scripts
   ========================================================== */
"use strict";

/* ---------- Episode data (edit freely — new episodes appear automatically) ---------- */
const EPISODES = [
  {
    title: "Japa: Leaving Home With Soft Eyes",
    description:
      "On relocation, longing, and what we carry with us when we leave — a gentle conversation about the Japa wave.",
    duration: "38 min",
    tag: "Life Issues",
    gradient: "linear-gradient(135deg, #4a2545, #7a4069)",
    initials: "EP 01",
  },
  {
    title: "Motherhood & The Business of Being Everything",
    description:
      "Raising children, raising businesses, raising ourselves. Real talk on tiredness, grace, and asking for help.",
    duration: "45 min",
    tag: "Motherhood",
    gradient: "linear-gradient(135deg, #c98a3d, #e8b4a0)",
    initials: "EP 02",
  },
  {
    title: "Women Deserve A Seat In The Digital Future",
    description:
      "From Tech Boot Camps to the Oyo Educators Summit — why tech literacy for women and young people is non-negotiable.",
    duration: "42 min",
    tag: "Tech & Women",
    gradient: "linear-gradient(135deg, #6d3b5d, #a25b7e)",
    initials: "EP 03",
  },
  {
    title: "Teaching For 20 Years: Soft Lessons From Classrooms",
    description:
      "What two decades of training teachers taught me about patience, people, and the quiet power of encouragement.",
    duration: "35 min",
    tag: "Education",
    gradient: "linear-gradient(135deg, #8c5a2b, #c98a3d)",
    initials: "EP 04",
  },
  {
    title: "Home, Hope & Healing — Wherever You Are",
    description:
      "From Ibadan City Mall to the diaspora: caring for Nigerians everywhere, and building soft spaces in hard times.",
    duration: "40 min",
    tag: "Hope",
    gradient: "linear-gradient(135deg, #3d2a4d, #6d5a8c)",
    initials: "EP 05",
  },
  {
    title: "Music, Writing & Speaking: My Three Loves",
    description:
      "Why I hum to think, scribble to heal, and speak to connect — the creative heartbeat behind the show.",
    duration: "33 min",
    tag: "Creativity",
    gradient: "linear-gradient(135deg, #a34d5e, #e08e8e)",
    initials: "EP 06",
  },
];

/* ---------- Render episodes ---------- */
const episodesGrid = document.getElementById("episodesGrid");

function renderEpisodes() {
  if (!episodesGrid) return;
  episodesGrid.innerHTML = EPISODES.map(
    (ep, i) => `
    <article class="episode-card reveal">
      <div class="episode-card__cover" style="background:${ep.gradient}">${ep.initials}</div>
      <div class="episode-card__meta">
        <span class="episode-card__badge">${ep.tag}</span>
        <span class="episode-card__duration">${ep.duration}</span>
      </div>
      <h3>${ep.title}</h3>
      <p>${ep.description}</p>
      <button class="episode-card__play" data-index="${i}">
        <span class="play-circle">▶</span> Play Episode
      </button>
    </article>`
  ).join("");
}

/* ---------- Player bar ---------- */
const player = document.getElementById("player");
const playerPlay = document.getElementById("playerPlay");
const playerClose = document.getElementById("playerClose");
const playerTitle = document.getElementById("playerTitle");
const playerDesc = document.getElementById("playerDesc");
const playerRange = document.getElementById("playerRange");

let playing = false;
let progressTimer = null;

function openPlayer(index) {
  const ep = EPISODES[index];
  if (!ep || !player) return;
  playerTitle.textContent = ep.title;
  playerDesc.textContent = `${ep.tag} · ${ep.duration}`;
  playerRange.value = 0;
  player.classList.add("show");
  player.setAttribute("aria-hidden", "false");
  startPlayback();
}

function startPlayback() {
  playing = true;
  playerPlay.textContent = "❚❚";
  clearInterval(progressTimer);
  progressTimer = setInterval(() => {
    let v = Number(playerRange.value);
    if (v >= 100) {
      stopPlayback();
      playerRange.value = 0;
      return;
    }
    playerRange.value = v + 1;
  }, 300);
}

function stopPlayback() {
  playing = false;
  playerPlay.textContent = "▶";
  clearInterval(progressTimer);
}

if (playerPlay) {
  playerPlay.addEventListener("click", () => {
    playing ? stopPlayback() : startPlayback();
  });
}

if (playerClose) {
  playerClose.addEventListener("click", () => {
    stopPlayback();
    player.classList.remove("show");
    player.setAttribute("aria-hidden", "true");
  });
}

/* Delegate clicks on episode play buttons */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".episode-card__play");
  if (btn) openPlayer(Number(btn.dataset.index));
});

/* ---------- Mobile navigation ---------- */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  /* Close menu when a link is clicked */
  navMenu.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Sticky header shadow on scroll ---------- */
const siteHeader = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {
  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", window.scrollY > 40);
  }
  highlightNavLink();
}, { passive: true });

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

function highlightNavLink() {
  const scrollPos = window.scrollY + 120;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}

/* ---------- Scroll reveal animations ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function observeReveals() {
  document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
    revealObserver.observe(el);
  });
}

/* ---------- Contact form ---------- */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    formStatus.className = "form__status";

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in all fields.";
      formStatus.classList.add("error");
      return;
    }
    if (!emailOk) {
      formStatus.textContent = "Please enter a valid email address.";
      formStatus.classList.add("error");
      return;
    }

    /* Replace this with a real backend / email service call */
    formStatus.textContent =
      "Thank you! Your message has been noted — Folu will get back to you soon.";
    formStatus.classList.add("success");
    contactForm.reset();
  });
}

/* ---------- Footer year ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Init ---------- */
renderEpisodes();
observeReveals();
  
