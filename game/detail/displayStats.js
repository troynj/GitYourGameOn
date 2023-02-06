function displayPlayerStats(pStatObj) {
  var teamEl = $(`[team="${pStatObj.Team}"]`);
  var playerCardEl = $("<article>").data(pStatObj);
  var pstatsUl = $("<ul>");
  var inputPlayerStr = pStatObj.Player.split(" ").slice(0,2).join(" ");

  var starBtnEl = $("<i>").addClass("fas fa-star")
    .click(() => {
      var checkFav = getLocalStorage() || [];
      if (!checkFav.some(el => el.Name === inputPlayerStr)) {
        getPlayerId(inputPlayerStr, pStatObj.Team, "long", true);
        console.log(inputPlayerStr, "Added to Favorites");
      }
    });

  playerCardEl.append(starBtnEl);
  playerCardEl.css("position", "relative");
  teamEl.attr("id", "team-card");
  pstatsUl.css("background-color", "#ffffffd9");
  teamEl.append(playerCardEl);
  playerCardEl.append(pstatsUl);

  if (getLocalStorage().some(el => el.Name === inputPlayerStr)) {
    starBtnEl.css("color", "#ffc400");
  }

  Object.entries(pStatObj).forEach(([key, value]) => {
    var listEl = $("<li>");
    if (key === "Player") {
      var titleEl = $("<h3>").css("margin-bottom", "0px").text(value);
      listEl.append(titleEl);
      playerCardEl.attr("player-card", value);
    } else if (key !== "Team") {
      listEl.text(key + ": " + value);
    }
    pstatsUl.append(listEl);
    pstatsUl.css("list-style", "none");
  });
}

Module.exports = { displayPlayerStats };