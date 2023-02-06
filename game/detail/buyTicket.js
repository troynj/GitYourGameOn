function displayGameInfo(gameDate, gameTime, gameLink) {
  var linkEl = document.createElement("button");
  linkEl.innerText = "Purchase Tickets for\n" + gameDate + " at " + gameTime;
  linkEl.setAttribute("id", "game-link");
  document.getElementById("details").prepend(linkEl);

  linkEl.addEventListener("click", function() {
    window.open(gameLink);
  });
}

Module.exports = { displayGameInfo};