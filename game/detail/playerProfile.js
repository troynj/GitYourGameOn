function getPlayerProfile(stats) {
  return {
    Name: stats.first_name + " " + stats.last_name,
    Team: stats.team.full_name,
    Height: stats.height_feet + "-" + stats.height_inches,
    Position: stats.position,
    Weight: stats.weight_pounds,
    Points: stats.pts.toFixed(1),
    Rebounds: (stats.oreb + stats.dreb).toFixed(1),
    Assists: stats.ast.toFixed(1),
    "Field Goal %": (stats.fg_pct * 100).toFixed(1),
    "3 Point %": (stats.fg3_pct * 100).toFixed(1),
    Steals: stats.stl,
    Blocks: stats.blk,
    Turnovers: stats.turnover,
  };
}
function displayPlayerProfile(player) {
  clearSearch();
  Object.entries(player).forEach(([key, value]) => {
    var listItem = document.createElement("li");
    listItem.textContent = key + ": " + value;
    document.querySelector("#tmhere").appendChild(listItem);
  });

  document.querySelector("#modal-favorites").addEventListener("click", () => {
    addLocalStorage(player);
  });

  document.querySelector("#modal-close").addEventListener("click", () => {
    clearSearch();
  });
}

Module.exports = { setPlayerProfile, displayPlayerProfile}