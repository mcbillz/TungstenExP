$(".togglecir").on("click", function () {
  $(".toggle").toggleClass("click1 ");
  $(".togglecir").toggleClass("click2 ");
});
function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
