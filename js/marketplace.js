const hamburger = document.querySelector(".hamburger");
const navmenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", function () {
  this.classList.toggle("is-active");
  navmenu.classList.toggle("active");
});

$(".nft ").on("click", function () {
  var mag = $("img", this).attr("src");
  var nftn = $("img", this).attr("name");
  var nftp = $("img", this).attr("alt");
  $(".buy").css("display", "block");
  $(".overlayimg").attr("src", mag);
  $("#nftn").text(nftn);
  $("#nftn").attr("value", nftn);
  $("#nftp").text(nftp);
  $("#nftp").attr("value", nftp);
});

$(".buy-btn").on("click", function () {
  $(".buy").css("display", "none");
});
$(".cancelbtn").on("click", function () {
  $(".buy").css("display", "none");
});

$(".btnalrtcl").on("click", function () {
  $(".succalrt").css("display", "none");
  $(".failalrt").css("display", "none");
});
