function displayGameLink(gameName, gameLink) {
  // console.log(gameName);
  // console.log(gameLink);
  var gameLinkEl = $("<a>");

  gameLinkEl.attr("href", gameLink);
  gameLinkEl.text("Purchase Tickets - " + gameName).css({
    "background-color": "black",
    color: "white",
  });
  $("#link").append(gameLinkEl);
}

Module.exports = { displayGameLink };