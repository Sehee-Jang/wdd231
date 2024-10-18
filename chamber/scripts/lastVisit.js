// Get Current Date
const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");
const messageElement = document.getElementById("visit-message");

if (lastVisit) {
  const daysSinceLastVisit = Math.floor(
    (now - lastVisit) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceLastVisit === 0) {
    messageElement.textContent = "Back so soon! Awesome!";
  } else if (daysSinceLastVisit === 1) {
    messageElement.textContent = "You last visited 1 day ago.";
  } else {
    messageElement.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
  }
} else {
  messageElement.textContent =
    "Welcome! Let us know if you have any questions.";
}

// 현재 날짜를 저장
localStorage.setItem("lastVisit", now);
