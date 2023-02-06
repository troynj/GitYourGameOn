function navigate(jumpFrom, jumpTo) {
  jumpFrom === "nav"
    ? $(".visible").toggleClass("visible invisible")
    : $(`#${jumpFrom}`).toggleClass("visible invisible");
  $(`#${jumpTo}`).toggleClass("visible invisible");
}

function homeNav() {
  $("#home-nav").click(() => {
    navigate("nav", "teams");
  });
}

function favNav() {}
$("#favorites-nav").click((event) => {
  event.preventDefault();

  var current = document.querySelector(".visible");
  console.log(current);
  if (current.id === "fav") {
    return;
  } else {
    populateFavorites();
    navigate("nav", "fav");
    displayFavorites();
  }
});

Module.exports = {navigate, homeNav, favNav };