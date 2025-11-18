// Fade-in on scroll
const targets = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
targets.forEach((t) => io.observe(t));

// Close mobile nav after selecting a link
const navToggle = document.querySelector("#nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const brandLink = document.querySelector(".brand");
const header = document.querySelector(".site-header");

if (navToggle && navLinks.length) {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle.checked) {
        navToggle.checked = false;
      }
    });
  });
}

if (brandLink) {
  const brandHref = brandLink.getAttribute("href") || "";
  brandLink.addEventListener("click", (event) => {
    const isHashLink = brandHref.startsWith("#");
    if (isHashLink) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (navToggle && navToggle.checked) {
        navToggle.checked = false;
      }
    }
  });
}

const syncHeaderState = () => {
  if (!header) return;
  if (window.scrollY > 24) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
};

syncHeaderState();
window.addEventListener("scroll", syncHeaderState);

const heroCrayon = document.querySelector(".hero__piece--crayonolith");
const heroCrayonTrigger = document.querySelector(".hero__crayon-trigger");
const heroAhoBird = document.querySelector(".hero__piece--aho");
const heroAhoDots = document.querySelector(".hero__aho-dots");
const introCrayon = document.querySelector(".intro__interactive");
const contactMascot = document.querySelector(".contact-mascot__img");
const heroBgPieces = document.querySelectorAll(
  ".hero__piece--earth, .hero__piece--stars, .hero__piece--space"
);

if (heroBgPieces.length) {
  let pending = heroBgPieces.length;
  const markHeroReady = () =>
    document.documentElement.classList.add("hero-bg-ready");
  const handlePieceSettled = () => {
    pending -= 1;
    if (pending <= 0) {
      markHeroReady();
    }
  };
  heroBgPieces.forEach((img) => {
    if (img.complete && img.naturalWidth > 0) {
      pending -= 1;
    } else {
      img.addEventListener("load", handlePieceSettled, { once: true });
      img.addEventListener("error", handlePieceSettled, { once: true });
    }
  });
  if (pending <= 0) {
    markHeroReady();
  }
}

if (introCrayon) {
  const animateCrayon = () => {
    introCrayon.classList.remove("is-animating");
    void introCrayon.offsetWidth; // restart animation
    introCrayon.classList.add("is-animating");
  };

  introCrayon.addEventListener("click", animateCrayon);
  introCrayon.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      animateCrayon();
    }
  });
  introCrayon.addEventListener("animationend", () => {
    introCrayon.classList.remove("is-animating");
  });
}

const copyCtas = document.querySelectorAll(".cta[data-copy]");

copyCtas.forEach((cta) => {
  const button = cta.querySelector(".cta__copy");
  const toast = cta.querySelector(".cta__toast");
  const value = cta.getAttribute("data-copy");
  let toastTimer;

  if (!button || !toast || !value) return;

  const showToast = (message) => {
    toast.textContent = message;
    cta.classList.add("cta--toast-active");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      cta.classList.remove("cta--toast-active");
    }, 1800);
  };

  const fallbackCopy = () => {
    const temp = document.createElement("textarea");
    temp.value = value;
    temp.setAttribute("readonly", "");
    temp.style.position = "absolute";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand("copy");
      showToast("Copied!");
    } catch (error) {
      showToast("Press Ctrl+C to copy");
    }
    document.body.removeChild(temp);
  };

  button.addEventListener("click", async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        showToast("Copied!");
      } catch (error) {
        fallbackCopy();
      }
    } else {
      fallbackCopy();
    }
  });
});

if (contactMascot) {
  const shout = () => {
    contactMascot.classList.remove("is-shouting");
    void contactMascot.offsetWidth;
    contactMascot.classList.add("is-shouting");
  };

  contactMascot.addEventListener("click", shout);
  contactMascot.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      shout();
    }
  });
  contactMascot.addEventListener("animationend", (event) => {
    if (event.animationName === "contact-mascot-shout") {
      contactMascot.classList.remove("is-shouting");
    }
  });
}
const prefersReducedMotion = window.matchMedia
  ? window.matchMedia("(prefers-reduced-motion: reduce)")
  : null;

const HERO_AHO_FLIGHT_DURATION = 4200;
const HERO_AHO_DOTS_INTERVAL = 800;
let heroAhoBirdTimer;
let heroAhoDotsInterval;

const shouldReduceMotion = () => prefersReducedMotion?.matches ?? false;

const setHeroAhoDotsCount = (count) => {
  if (!heroAhoDots) return;
  heroAhoDots.dataset.count = String(count);
};

const stopHeroAhoDotsCycle = () => {
  if (!heroAhoDots) return;
  clearInterval(heroAhoDotsInterval);
  heroAhoDotsInterval = null;
  setHeroAhoDotsCount(0);
};

const startHeroAhoDotsCycle = () => {
  if (!heroAhoDots) return;
  clearInterval(heroAhoDotsInterval);
  if (shouldReduceMotion()) {
    setHeroAhoDotsCount(3);
    return;
  }
  let count = 1;
  setHeroAhoDotsCount(count);
  heroAhoDotsInterval = window.setInterval(() => {
    count = (count % 3) + 1;
    setHeroAhoDotsCount(count);
  }, HERO_AHO_DOTS_INTERVAL);
};

const flyHeroAhoBird = () => {
  if (!heroAhoBird) return;
  heroAhoBird.classList.remove("is-flying");
  void heroAhoBird.offsetWidth;
  heroAhoBird.classList.add("is-flying");
  startHeroAhoDotsCycle();
  clearTimeout(heroAhoBirdTimer);
  heroAhoBirdTimer = window.setTimeout(() => {
    heroAhoBird.classList.remove("is-flying");
    stopHeroAhoDotsCycle();
  }, HERO_AHO_FLIGHT_DURATION);
};

if (heroAhoBird) {
  heroAhoBird.addEventListener("animationend", (event) => {
    if (event.animationName === "hero-aho-flight") {
      heroAhoBird.classList.remove("is-flying");
      stopHeroAhoDotsCycle();
    }
  });
}

if (heroAhoDots) {
  setHeroAhoDotsCount(0);
}

if (prefersReducedMotion) {
  prefersReducedMotion.addEventListener("change", () => {
    if (!heroAhoDots) return;
    if (heroAhoBird?.classList.contains("is-flying")) {
      if (shouldReduceMotion()) {
        stopHeroAhoDotsCycle();
        setHeroAhoDotsCount(3);
      } else {
        startHeroAhoDotsCycle();
      }
    } else {
      setHeroAhoDotsCount(0);
    }
  });
}

if (heroCrayon && heroCrayonTrigger) {
  let isAnimatingCrayon = false;

  const pressHeroCrayon = () => {
    flyHeroAhoBird();
    if (isAnimatingCrayon) return;
    isAnimatingCrayon = true;

    const computedTransform = window.getComputedStyle(heroCrayon).transform;
    heroCrayon.style.setProperty(
      "--hero-crayon-origin",
      computedTransform === "none" ? "translate3d(0, 0, 0)" : computedTransform
    );
    heroCrayon.classList.add("is-pressed");
  };

  heroCrayon.addEventListener("animationend", (event) => {
    if (event.animationName !== "hero-crayon-press") return;
    heroCrayon.classList.remove("is-pressed");
    heroCrayon.style.removeProperty("--hero-crayon-origin");
    isAnimatingCrayon = false;
  });

  heroCrayonTrigger.addEventListener("click", pressHeroCrayon);
  heroCrayonTrigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      pressHeroCrayon();
    }
  });
}
