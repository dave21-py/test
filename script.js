document.addEventListener("DOMContentLoaded", () => {
  // --- SMOOTH SCROLL SETUP (LENIS & GSAP) ---
  const lenis = new Lenis();
  gsap.registerPlugin(ScrollTrigger);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // --- REAL-TIME CLOCK ---
  function updateTime() {
    const timeWidget = document.getElementById("time-widget");
    if (!timeWidget) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    timeWidget.textContent = `${timeString}`;
  }
  setInterval(updateTime, 1000);
  updateTime();

  // --- FLUID PROJECT SCROLL-IN ANIMATIONS ---
  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item) => {
    gsap.fromTo(
      item,
      { y: 100, scale: 0.9 },
      {
        autoAlpha: 1, // Fades in and sets opacity to 1
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%", // Start animation when 90% from top of viewport
          toggleActions: "play none none none", // Play animation once
        },
      },
    );
  });

  // --- CUSTOM VIEW CURSOR & PROJECT HOVER ---
  const cursor = document.querySelector(".view-cursor");
  const hoverTriggerElements = document.querySelectorAll(".project-link");
  const projectsWrapper = document.querySelector(".projects-wrapper");

  // Animate cursor to follow mouse
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });
  window.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  // Animate cursor on hover
  hoverTriggerElements.forEach((el) => {
    el.addEventListener("mouseenter", () =>
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      }),
    );
    el.addEventListener("mouseleave", () =>
      gsap.to(cursor, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      }),
    );
  });

  // Add class to projects-wrapper to blur other projects on hover
  if (projectsWrapper) {
    projectsWrapper.addEventListener("mouseenter", () =>
      projectsWrapper.classList.add("is-hovered"),
    );
    projectsWrapper.addEventListener("mouseleave", () =>
      projectsWrapper.classList.remove("is-hovered"),
    );
  }

  // --- SMOOTH SCROLLING FOR NAVIGATION ---
  document.querySelectorAll('.project-nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      // Use Lenis to scroll smoothly
      lenis.scrollTo(targetId, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    });
  });

  // --- ACTIVE SECTION HIGHLIGHTING (Remains the same) ---
  const sections = document.querySelectorAll(
    "section[id], div[id].projects-wrapper",
  );
  const navLinks = document.querySelectorAll(".project-nav a");

  const highlightObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const id = entry.target.getAttribute("id");
          const correspondingLink = document.querySelector(
            `.project-nav a[href="#${id}"]`,
          );
          if (correspondingLink) {
            correspondingLink.classList.add("active");
          }
        }
      });
    },
    {
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    },
  );
  sections.forEach((section) => {
    highlightObserver.observe(section);
  });
});
