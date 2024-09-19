document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  document.querySelector(".currentyear").textContent = currentYear;

  const lastModified = document.lastModified;
  document.getElementById("lastModified").textContent =
    "Last Modified: " + lastModified;
});
