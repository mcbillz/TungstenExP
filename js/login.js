const { on } = require("nodemon");

$(".togglecir").click(function () {
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

// const findLocation = () => {
//   const success = (position) => {
//     $(".location").attr("value", position);
//   };
//   const err = (error) => {
//     $(".location").attr("value", error);
//   };
//   navigator.geolocation.getCurrentPosition(success, err);
// };
// $(".btn").on("click", findLocation);
