// Top Button
// document.getElementById("top-btn").addEventListener("click", function () {
//   window.scroll({
//     behavior: "smooth",
//     top: 0,
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("top-btn").addEventListener("click", toTop);
});

function toTop() {
  window.scroll({
    behavior: "smooth",
    top: 0,
  });
}
