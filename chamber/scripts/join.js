function showModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside of modal content
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".membership-cards .card");
  cards.forEach((card) => {
    setTimeout(() => {
      card.classList.add("visible");
    }, 800);
  });
});


