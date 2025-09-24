// --- REAL-TIME CLOCK ---
function updateTime() {
  const timeWidget = document.getElementById("time-widget");
  if (!timeWidget) return;
  // Using a more specific locale for time in SC, USA if needed, or fallback
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    timeZone: "America/New_York", // Example: Eastern Time
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  timeWidget.textContent = `${timeString}`;
}
setInterval(updateTime, 1000);
updateTime();

// --- FLUID SCROLL-IN ANIMATIONS ---
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // If the element is visible in the viewport
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // Stop observing the element once it's visible to save resources
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1, // Trigger when 10% of the element is visible
  },
);

// Find all elements you want to animate on scroll
const elementsToAnimate = document.querySelectorAll(
  ".project-item, .experience-section, .get-in-touch-section",
);

// Start observing each element
elementsToAnimate.forEach((element) => {
  element.classList.add("fade-in-element"); // Add the initial hidden state
  scrollObserver.observe(element);
});

// --- MODAL FUNCTIONALITY ---
const modal = document.getElementById("project-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const openModalFab = document.getElementById("open-modal-fab");

const openModal = () => {
  if (modal) modal.classList.add("visible");
};
const closeModal = () => {
  if (modal) modal.classList.remove("visible");
};

// Event listeners for the modal
if (closeModalBtn && modal && openModalFab) {
  // Open modal when floating action button is clicked
  openModalFab.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the link from jumping to the top of the page
    openModal();
  });

  // Close modal when the 'x' button is clicked
  closeModalBtn.addEventListener("click", closeModal);

  // Close modal if the overlay is clicked
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

// --- SMOOTH SCROLLING FOR NAVIGATION ---
document.querySelectorAll('.project-nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default jump

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth", // The magic ingredient!
        block: "start",
      });
    }
  });
});
