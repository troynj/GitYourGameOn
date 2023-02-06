async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

async function bdlStatsApi(playerId, playerStatsType) {
  const requestUrl = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`;
  const stats = await fetchData(requestUrl);
  return bdlNamesApi(playerId, stats.data[0], playerStatsType);
}

async function bdlNamesApi(playerId, playerStats, playerStatsType) {
  const requestUrl = `https://www.balldontlie.io/api/v1/players/${playerId}`;
  const stats = await fetchData(requestUrl);
  Object.assign(playerStats, stats);
  return playerStatsType === "short"
    ? displayPlayerStats(getPlayerStats(playerStats))
    : displayPlayerProfile(setPlayerProfile(playerStats));
}

async function getPlayerId(playerSearched, team, playerStatsType) {
  const requestUrl = `https://www.balldontlie.io/api/v1/players?search=${playerSearched}`;
  const stats = await fetchData(requestUrl);
  stats.data.forEach(async (el) => {
    if (team === el.team.full_name) {
      return bdlStatsApi(el.id, playerStatsType);
    }
  });
}

module.exports = { bdlStatsApi, bdlNamesApi, getPlayerId};
