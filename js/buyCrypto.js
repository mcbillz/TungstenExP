const hamburger = document.querySelector(".hamburger");
const navmenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", function () {
  this.classList.toggle("is-active");
  navmenu.classList.toggle("active");
});
