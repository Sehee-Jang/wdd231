// Last modified
document.getElementById("last-modified").innerText = document.lastModified;

// hamburger button
document.getElementById("hamburger").addEventListener("click", function () {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("active");
});
