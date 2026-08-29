// ========== Apply text from content.js ==========
function setHtml(el, html) {
  if (el && html != null) el.innerHTML = html;
}

function setText(el, text) {
  if (el && text != null) el.textContent = text;
}

function applyContent() {
  if (typeof CONTENT === "undefined") return;

  document.title = CONTENT.pageTitle;

  const h = CONTENT.hero;
  setText(document.querySelector(".timer-label"), h.timerLabel);
  setText(document.querySelector(".psst"), h.psst);
  setText(document.querySelector(".hero-title"), h.title);
  setText(document.querySelector(".hero-sub"), h.subtitle);
  setHtml(document.querySelector(".hero-drama"), h.drama);
  setText(document.querySelector(".scroll-hint span"), h.scrollHint);

  const m = CONTENT.meter;
  const meterSec = document.getElementById("meter");
  if (meterSec) {
    setText(meterSec.querySelector(".section-tag"), m.tag);
    setText(meterSec.querySelector("h2"), m.title);
    setText(meterSec.querySelector(".meter-card-intro"), m.intro);
    meterSec.querySelectorAll(".meter-labels span").forEach((el, i) => {
      if (m.labels[i]) el.textContent = m.labels[i];
    });
    setHtml(meterSec.querySelector(".meter-bad"), m.bad);
    setText(meterSec.querySelector(".meter-note"), m.note);
  }

  const t = CONTENT.things;
  const thingsSec = document.getElementById("things");
  if (thingsSec) {
    setText(thingsSec.querySelector(".section-tag"), t.tag);
    setText(thingsSec.querySelector("h2"), t.title);
    setText(thingsSec.querySelector(".section-sub"), t.subtitle);
    setText(thingsSec.querySelector(".tap-hint"), t.tapHint);
  }

  const grid = document.getElementById("things-grid");
  if (grid && t.cards?.length) {
    grid.innerHTML = t.cards
      .map(
        (card) => `
      <button class="thing-card reveal" type="button" data-color="${card.color}">
        <span class="thing-tape tape-${card.tape}" aria-hidden="true"></span>
        <span class="same-badge" aria-hidden="true"><span class="same-check">✓</span> same</span>
        <div class="thing-gif-wrap" data-gif="${card.gif}"></div>
        <p class="thing-text">${card.text}</p>
      </button>`
      )
      .join("");
  }

  const p = CONTENT.pics;
  const picsSec = document.getElementById("pics");
  if (picsSec) {
    setText(picsSec.querySelector(".section-tag"), p.tag);
    setText(picsSec.querySelector("h2"), p.title);
    setText(picsSec.querySelector(".section-sub"), p.subtitle);
    picsSec.querySelectorAll(".pic-caption").forEach((el, i) => {
      if (p.captions[i]) el.textContent = p.captions[i];
    });
    setText(picsSec.querySelector(".pics-footer"), p.footer);
  }

  const th = CONTENT.thought;
  const thoughtSec = document.getElementById("thought");
  if (thoughtSec) {
    setText(thoughtSec.querySelector(".thought-label"), th.label);
    setText(thoughtSec.querySelector(".thought-line1"), th.line1);
    setText(thoughtSec.querySelector(".thought-quote"), th.quote);
    setHtml(thoughtSec.querySelector(".thought-note"), th.note);
    setText(thoughtSec.querySelector(".thought-secret"), th.secret);
  }

  const letterCard = document.querySelector(".letter-card");
  if (letterCard && CONTENT.letter?.lines) {
    letterCard.innerHTML = CONTENT.letter.lines
      .map((line) => {
        const cls = line.class ? ` class="${line.class}"` : "";
        return `<p${cls}>${line.text}</p>`;
      })
      .join("");
  }

  const f = CONTENT.finale;
  const finaleSec = document.getElementById("finale");
  if (finaleSec) {
    setText(finaleSec.querySelector(".almost"), f.almost);
    setHtml(finaleSec.querySelector(".finale-title"), f.title);
    finaleSec.querySelectorAll(".finale-line").forEach((el, i) => {
      if (f.lines[i]) setHtml(el, f.lines[i]);
    });
    setText(finaleSec.querySelector(".finale-sign"), f.sign);
    const hiBtn = document.getElementById("hi-btn");
    if (hiBtn) hiBtn.textContent = f.button;
  }

  const foot = CONTENT.footer;
  const footerEl = document.querySelector(".footer");
  if (footerEl && foot) {
    footerEl.innerHTML = `
      <p>${foot.line}</p>
      <p class="footer-credit">
        <a href="${foot.instagram}" target="_blank" rel="noopener noreferrer">${foot.credit}</a>
      </p>`;
  }
}

// ========== CONFIG — timer, WhatsApp, GIF fallbacks ==========
const CONFIG = {
  // When you started missing them (change this date/time)
  missStartTime: new Date(), // e.g. new Date('2026-05-19T10:00:00')

  // Your WhatsApp number for "say hi" (country code, no + or spaces)
  // Example India: "919876543210"
  whatsappNumber: "",

  // Optional pre-filled message
  whatsappMessage: "hi... i miss u too ♡",

  // Fallback GIF URLs if local file missing in gifs/
  gifFallbacks: {
    "meter-bear":
      "https://media1.tenor.com/m/kOfhJ6VeBIsAAAAC/dudu-bubu.gif",
    "thing-1":
      "https://media1.tenor.com/m/Rvqhj0q2_BkAAAAC/dudu-bubu-hit.gif",
    "thing-2":
      "https://media1.tenor.com/m/9fscv__vkukAAAAC/dudu-bubu-dudu-bubu-love.gif",
    "thing-3":
      "https://media.tenor.com/BB3sZELhyQgAAAAi/ermm-hmmm.gif",
    "thing-4":
      "https://media1.tenor.com/m/B2uBDYUtx0EAAAAC/bubu-dudu.gif",
    "thing-5":
      "https://media1.tenor.com/m/Rvqhj0q2_BkAAAAC/dudu-bubu-hit.gif",
    "thing-6":
      "https://media1.tenor.com/m/kOfhJ6VeBIsAAAAC/dudu-bubu.gif",
    thought:
      "https://media.tenor.com/hbNrud38kA4AAAAi/mimibubu.gif",
    waiting:
      "https://media1.tenor.com/m/m7isyFHYBRYAAAAC/%EB%AA%A8%EC%B0%8C-%EB%AA%A8%EB%AA%A8%EC%B0%8C.gif",
    kiss:
      "https://media1.tenor.com/m/dnkXvJVb5cAAAAAC/bear-blow-a-kiss.gif",
  },
};

// ========== Miss timer ==========
function updateTimer() {
  const start = CONFIG.missStartTime.getTime();
  const now = Date.now();
  const diff = Math.max(0, now - start);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  const el = document.getElementById("miss-timer");
  if (el) {
    el.textContent = `${hours}h ${minutes}m`;
  }
}

updateTimer();
setInterval(updateTimer, 60000);

// ========== Miss-o-meter animation ==========
const meterBar = document.getElementById("meter-bar");
const meterPin = document.querySelector(".meter-pin-end");
const meterSection = document.getElementById("meter");

const meterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        meterBar?.classList.add("meter-visible");
        meterPin?.classList.add("pin-visible");
      }
    });
  },
  { threshold: 0.35 }
);

if (meterSection) meterObserver.observe(meterSection);

// ========== Scroll reveal ==========
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

function observeReveals() {
  document.querySelectorAll(".reveal:not(.observed)").forEach((el) => {
    el.classList.add("observed");
    revealObserver.observe(el);
  });
}

// ========== Media loaders (tries each extension until one works) ==========
const GIF_EXT = [".gif", ".webp", ".png", ".PNG", ".jpg", ".jpeg"];
const PHOTO_EXT = [".jpg", ".jpeg", ".png", ".PNG", ".webp", ".avif", ".gif"];

function tryLoadMedia(basePath, extensions, onSuccess, onFail) {
  let i = 0;
  function next() {
    if (i >= extensions.length) {
      onFail?.();
      return;
    }
    const img = new Image();
    img.onload = () => onSuccess(img.src);
    img.onerror = () => {
      i++;
      next();
    };
    img.src = basePath + extensions[i];
  }
  next();
}

function injectGif(wrap, src) {
  const fallback = wrap.querySelector(".gif-fallback");
  const img = document.createElement("img");
  img.src = src;
  img.alt = "";
  img.loading = "lazy";
  wrap.insertBefore(img, fallback);
  wrap.classList.add("has-gif");
}

function loadGifElement(wrap) {
  const name = wrap.dataset.gif;
  if (!name) return;
  tryLoadMedia(
    `gifs/${name}`,
    GIF_EXT,
    (src) => injectGif(wrap, src),
    () => {
      const fallback = CONFIG.gifFallbacks?.[name];
      if (fallback) injectGif(wrap, fallback);
    }
  );
}

function loadAllGifs() {
  document
    .querySelectorAll(".gif-wrap[data-gif], .thing-gif-wrap[data-gif]")
    .forEach(loadGifElement);
}

// ========== Thing cards — tap for "same" badge ==========
function setupThingCards() {
  const grid = document.getElementById("things-grid");
  if (!grid || grid.dataset.bound) return;
  grid.dataset.bound = "true";
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".thing-card");
    if (!card) return;
    const wasSame = card.classList.contains("is-same");
    card.classList.toggle("is-same");
    if (!wasSame && card.classList.contains("is-same")) {
      card.classList.add("pop");
      setTimeout(() => card.classList.remove("pop"), 400);
    }
  });
}

// ========== Load photos from images/ folder ==========
// Drop pic1.png, pic2.jpg, etc. — any supported extension below works
const PHOTO_NAMES = ["pic1", "pic2", "pic3", "pic4", "pic5", "pic6"];

function loadPhotos() {
  document.querySelectorAll(".pic-card").forEach((card, i) => {
    const placeholder = card.querySelector(".pic-placeholder");
    const name = PHOTO_NAMES[i];
    if (!placeholder || !name || placeholder.dataset.loaded) return;
    placeholder.dataset.loaded = "true";

    tryLoadMedia(
      `images/${name}`,
      PHOTO_EXT,
      (src) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "us moment";
        img.loading = "lazy";
        placeholder.innerHTML = "";
        placeholder.appendChild(img);
      },
      () => {
        /* keep gradient placeholder */
      }
    );
  });
}

// ========== Say hi button ==========
const hiBtn = document.getElementById("hi-btn");
const heartsBurst = document.getElementById("hearts-burst");

function spawnHearts(x, y) {
  if (!heartsBurst) return;
  const hearts = ["💕", "💗", "✨", "♡", "🥺", "💖"];

  for (let i = 0; i < 12; i++) {
    const span = document.createElement("span");
    span.className = "heart-particle";
    span.textContent = hearts[i % hearts.length];
    const angle = (i / 12) * Math.PI * 2;
    const dist = 60 + Math.random() * 80;
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    span.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
    span.style.setProperty("--ty", `${Math.sin(angle) * dist - 40}px`);
    heartsBurst.appendChild(span);
    setTimeout(() => span.remove(), 1200);
  }
}

if (hiBtn) {
  hiBtn.addEventListener("click", (e) => {
    const rect = hiBtn.getBoundingClientRect();
    const section = document.getElementById("finale");
    const sectionRect = section?.getBoundingClientRect() || { left: 0, top: 0 };
    spawnHearts(
      rect.left + rect.width / 2 - sectionRect.left,
      rect.top + rect.height / 2 - sectionRect.top
    );

    if (CONFIG.whatsappNumber) {
      const msg = encodeURIComponent(CONFIG.whatsappMessage);
      window.open(
        `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`,
        "_blank"
      );
    } else {
      hiBtn.textContent = "i miss u too ♡";
      setTimeout(() => {
        hiBtn.textContent = CONTENT?.finale?.button || "say hi ♡";
      }, 2000);
    }
  });
}

function initPage() {
  applyContent();
  observeReveals();
  loadAllGifs();
  setupThingCards();
  loadPhotos();
}

initPage();
