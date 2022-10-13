const hamburger = document.querySelector(".hamburger");
const navmenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", function () {
  this.classList.toggle("is-active");
  navmenu.classList.toggle("active");
});

$(".nhimg").on("click", function () {
  var mag = $(this).attr("src");
  var nftn = $(this).attr("name");
  $(".sell").css("display", "block");
  $(".overlayimg").attr("src", mag);
  $("#nftn").text(nftn);
  $("#nftn").attr("value", nftn);
});

function alrt() {
  $(".succalrt").css("display", "flex");
}
function alrtx() {
  $(".succalrt").css("display", "none");
}

$(".sell-btn").on("click", function () {
  $(".sell").css("display", "none");
  alrt();
  setTimeout(alrtx, 5000);
});

$(".alrtcl").on("click", function () {
  $(".succalrt").css("display", "none");
});

$(".cancelbtn").on("click", function () {
  $(".sell").css("display", "none");
});
