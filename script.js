// --- REAL-TIME CLOCK ---
function updateTime() {
  const timeWidget = document.getElementById("time-widget");
  if (!timeWidget) return;
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  timeWidget.textContent = `${timeString} Bali, ID`;
}
setInterval(updateTime, 1000);
updateTime();

// --- MODAL FUNCTIONALITY ---
const modal = document.getElementById("project-modal");
const openBtn = document.getElementById("open-modal-btn");
const closeBtn = document.getElementById("close-modal-btn");

const openModal = () => {
  if (modal) modal.classList.add("visible");
};
const closeModal = () => {
  if (modal) modal.classList.remove("visible");
};

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    // Close modal if overlay is clicked
    if (event.target === modal) {
      closeModal();
    }
  });
}
