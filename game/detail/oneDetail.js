//Get Stats
function setTeamStats(inputTeam, icon) {
  var teamEl = $("<section>");
  var title = $("<h2>").text(inputTeam);
  
  teamEl.attr("team", inputTeam)
    .css("background-image", `url("${icon}")`)
    .css("text-align", "center");
  
  title.css("color", "white");
  
  $("#wrapper").append(teamEl.append($("<div>").append(title)));
  
  nbaTeams[inputTeam].forEach((el) => {
    bdlStatsApi(el, "short");
  });
}

function getPlayerStats(stats) {
  return {
    Player:
      stats.first_name + " " + stats.last_name + " (" + stats.position + ")",
    Team: stats.team.full_name,
    PTS: stats.pts.toFixed(1),
    REB: (stats.oreb + stats.dreb).toFixed(1),
    AST: stats.ast.toFixed(1),
    "FG%": (stats.fg_pct * 100).toFixed(1),
  };
}