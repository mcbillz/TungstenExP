$(".pbtn").on("click", function () {
  $(this).toggleClass("activebtn");
});

$(".btnalrtcl").on("click", function () {
  $(".succalrt").css("display", "none");
  $(".failalrt").css("display", "none");
});
