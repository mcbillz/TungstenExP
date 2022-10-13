$(".pbtn").on("click", function () {
  $(this).toggleClass("activebtn");
});

function alrt() {
  $(".succalrt").css("display", "flex");
}
function alrtx() {
  $(".succalrt").css("display", "none");
}

$("#confirmbtn").on("click", function () {
  alrt();
  setTimeout(alrtx, 5000);
});

$(".alrtcl").on("click", function () {
  $(".succalrt").css("display", "none");
});

$(".cancelbtn").on("click", function () {
  $(".sell").css("display", "none");
});
