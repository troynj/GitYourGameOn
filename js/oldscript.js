function fetchBasketballData(userSelection) {
  const reqUrl = buildRequestUrl(userSelection);
  
  fetch(reqUrl)
    .then(response => response.json())
    .then(data => {
      const gameListEl = $("#initInfo");
      gameListEl.addClass("gamesContainer");
      data._embedded.events.forEach((event, i) => {
        const gameEl = createGameElement(event);
        $("#games").append(gameListEl);
        gameListEl.append(gameEl);
      });
    });
}

function buildRequestUrl(userSelection) {
  const apiKey = "apikey=9XshdGRWAPA44uov6ogAAGLaYkru76D3";
  const baseUrl = "https://app.ticketmaster.com/";
  const searchBy = "discovery/v2/events.json";
  const subGenreId = "subGenreId=KZazBEonSMnZfZ7vFJA";
  const keywordStr = `keyword="${userSelection}"`;
  return `${baseUrl}${searchBy}?${apiKey}&${keywordStr}&${subGenreId}`;
}

function createGameElement(event) {
  const gameEl = createGameContainer();
  const [home, away] = setTeamNames(event.name);
  const [homeIcon, awayIcon] = setTeamIcons(event._embedded.attractions);
  const gameLink = event.url;
  const gameTime = setGameTime(event.dates.start.localTime);

  addGameName(gameEl, event.name);
  addTeamAttributes(gameEl, home, away, homeIcon, awayIcon);
  addClickHandler(gameEl, event, gameTime, gameLink);

  return gameEl;
}

function createGameContainer() {
  const gameEl = document.createElement("div");
  gameEl.classList.add("uk-flex-center", "uk-card");
  gameEl.style.backgroundColor = "#ffffffd9";
  gameEl.style.margin = "10px 0px";
  return gameEl;
}

function setTeamIcons(attractions) {
  return [setIcon(attractions[0].images), setIcon(attractions[1].images)];
}

function addGameName(gameEl, gameName) {
  const nameContainer = document.createElement("p");
  nameContainer.classList.add("uk-flex-inline");
  nameContainer.textContent = gameName;
  gameEl.appendChild(nameContainer);
}

function addTeamAttributes(gameEl, home, away, homeIcon, awayIcon) {
  gameEl.setAttribute("jumpto", "details");
  gameEl.setAttribute("jumpfrom", "games");
  gameEl.setAttribute("homeTeam", home.trim());
  gameEl.setAttribute("awayTeam", away.trim());
  gameEl.setAttribute("homeIcon", homeIcon);
  gameEl.setAttribute("awayIcon", awayIcon);
}

function addClickHandler(gameEl, event, gameTime, gameLink) {
  gameEl.addEventListener("click", (event) => {
    const target = event.currentTarget;
    navigate(target.getAttribute("jumpto"), target.getAttribute("jumpfrom"));
    document.getElementById("games").innerHTML = "";
    [      [target.getAttribute("homeTeam"), target.getAttribute("homeIcon")],
      [target.getAttribute("awayTeam"), target.getAttribute("awayIcon")]
    ].forEach(([team, icon]) => getTeamStats(team, icon));
    displayGameInfo(event.dates.start.localDate, gameTime, gameLink);
  });
}



function displayGameInfo(gameDate, gameTime, gameLink) {
  var linkEl = $("<button>");
  linkEl.text(`Purchase Tickets for\n ${gameDate} at ${gameTime}`);
  linkEl.attr("id", "game-link");
  $("#details").prepend(linkEl);

  linkEl.click(() => {
    window.open(gameLink);
  });
}

function setGameTime(time) {
  var [hourString, minute] = time.split(":");
  var hour = +hourString % 24;
  return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}

function setTeamNames(gameStr) {
  const gameArr = gameStr.split(" ");
  let team1 = "";
  let team2 = "";

  let currentTeamIndex = 0;
  for (const word of gameArr) {
    if (word === "vs." || word === "v." || word === "vs" || word === "v") {
      currentTeamIndex = 1;
    } else {
      if (currentTeamIndex === 0) {
        team1 += word + " ";
      } else {
        team2 += word + " ";
      }
    }
  }

  return [team1.trim(), team2.trim()];
}


function setIcon(dataArr) {
  var min = 1000;
  var savedIndex = 0;
  dataArr.forEach((el, i) => {
    min > el.height && (min = el.height) && (savedIndex = i);
  });
  return dataArr[savedIndex].url;
}

function navigate(jumpFrom, jumpTo) {
  jumpFrom === "nav"
    ? $(".visible").toggleClass("visible invisible")
    : $(`#${jumpFrom}`).toggleClass("visible invisible");
  $(`#${jumpTo}`).toggleClass("visible invisible");
}

var nbaTeams = {
  "Los Angeles Lakers": ["237", "472", "117"],
  "Golden State Warriors": ["115", "443", "185"],
  "Phoenix Suns": ["57", "367", "22"],
  "Portland Trail Blazers": ["278", "419", "349"],
  "LA Clippers": ["274", "172", "467"],
  "Dallas Mavericks": ["132", "486", "38017679"],
  "Denver Nuggets": ["246", "335", "375"],
  "Utah Jazz": ["297", "100", "413"],
  "Memphis Grizzlies": ["666786", "231", "3"],
  "Sacramento Kings": ["161", "30", "38017688"],
  "New Orleans Pelicans": ["666969", "303", "455"],
  "Minnesota Timberwolves": ["3547238", "176", "447"],
  "Houston Rockets": ["17895966", "38017684", " 666849"],
  "San Antonio Spurs": ["666682", "373", "3547274"],
  "Oklahoma City Thunder": ["175", "17896065", "666541"],
  "Boston Celtics": ["434", "70", "219"],
  "Brooklyn Nets": ["140", "228", "417"],
  "Milwaukee Bucks": ["15", "315", "214"],
  "New York Knicks": ["73", "387", "399"],
  "Cleveland Cavaliers": ["666581", "285", "322"],
  "Chicago Bulls": ["268", "125", "460"],
  "Philadelphia 76ers": ["192", "145", "3547254"],
  "Miami Heat": ["79", "666633", "4"],
  "Toronto Raptors": ["416", "17896055", "458"],
  "Washington Wizards": ["378", "37", "265"],
  "Atlanta Hawks": ["490", "101", "334"],
  "Indiana Pacers": ["3547245", "452", "210"],
  "Charlotte Hornets": ["3547239", "204", "403"],
  "Detroit Pistons": ["17896075", "54", "3547241"],
  "Orlando Magic": ["28", "38017683", "165"],
};

function popTeamListing() {
  Object.keys(nbaTeams).forEach((teamName) => {
    const teamBtn = $("<button>");
    teamBtn
      .addClass("uk-flex-center@l uk-background-muted team-btn")
      .text(teamName)
      .hover(() => teamBtn.addClass("uk-button-secondary"))
      .mouseleave(() => teamBtn.removeClass("uk-button-secondary"))
      .click(() => {
        tmBbasketball(teamName.split(" ").pop());
        navigate("teams", "games");
      });
    $("#teams").append(teamBtn);
  });
}
function bdlStatsApi(playerId, playerStatsType, favShortcut) {
  console.log("favShortcut", favShortcut);
  var requestUrl = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`;

  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((stats) => {
      bdlNamesApi(playerId, stats.data[0], playerStatsType, favShortcut);
    });
}
function bdlNamesApi(playerId, playerStats, playerStatsType, favShortcut) {
  var requestUrl = `https://www.balldontlie.io/api/v1/players/${playerId}`;

  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((stats) => {
      $.extend(playerStats, stats);
      if (playerStatsType == "short") {
        displayPlayerStats(getPlayerStats(playerStats));
      } else {
        if (favShortcut) {
          addLocalStorage(setPlayerProfile(playerStats));
          console.log("CORRECT IF CONDITION")
        } else {
          displayPlayerProfile(setPlayerProfile(playerStats));
        }
      }
    });
}

/* This function fetches players that match the input name and then identifies the player name that also have a team that matches the selected team*/
function getPlayerId(playerSearched, team, playerStatsType, favShortcut) {
  console.log("===TEAM", team)
  // console.log("entered");
 console.log("favShortcut", favShortcut);
  var requestUrl = `https://www.balldontlie.io/api/v1/players?search=${playerSearched}`;

  fetch(requestUrl)
    .then((response) => {
      if (response.status != 200) {
        // console.log(response.status);
      }
      return response.json();
    })
    .then((stats) => {
      stats.data.forEach((el) => {
        if (team === el.team.full_name) {
          bdlStatsApi(el.id, playerStatsType, favShortcut);
        }
      });
    });
}

//Get Stats
function getTeamStats(inputTeam, icon) {
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

//This function displays a link to TicketMaster for the selected game

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

  function populateTeamList() {
    const lookupFormEl = document.createElement('form');
    const playerSelectEl = document.createElement('select');
    const playerInputEl = document.createElement('input');
    const submitBtn = document.createElement('button');
  
    Object.keys(nbaTeams).forEach((el) => {
      const optionListEl = document.createElement('option');
      optionListEl.value = el;
      optionListEl.textContent = el;
      playerSelectEl.appendChild(optionListEl);
    });
  
    submitBtn.textContent = "Submit";
    submitBtn.addEventListener('click', function (event) {
      event.preventDefault();
      if (!playerInputEl.value) {
        playerInputEl.placeholder = "Enter A Name!";
      } else {
        getPlayerId(playerInputEl.value, playerSelectEl.value, "long");
      }
    });
  
    const searchEl = document.querySelector('#search');
    searchEl.appendChild(lookupFormEl);
    lookupFormEl.appendChild(playerSelectEl);
    lookupFormEl.appendChild(playerInputEl);
    lookupFormEl.appendChild(submitBtn);
  }
  

function setPlayerProfile(stats) {
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


$("#home-nav").click(() => {
  navigate("nav", "teams");
});

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

function displayFavorites() {
  const favObj = getLocalStorage() || {};
  const outerList = document.querySelector("#accordion");

  for (const player of Object.values(favObj)) {
    const outerItem = document.createElement("li");
    outerItem.id = "outer-li";

    const titleEl = document.createElement("a");
    titleEl.classList.add("uk-accordion-title");
    titleEl.href = "#";
    titleEl.textContent = player.Name;

    const innerList = document.createElement("ul");
    innerList.classList.add("uk-accordion-content");

    for (const [key, value] of Object.entries(player)) {
      if (key === "Name") {
        continue;
      }

      const innerItem = document.createElement("li");
      innerItem.textContent = `${key}: ${value}`;

      innerList.appendChild(innerItem);
    }

    outerItem.appendChild(titleEl);
    outerItem.appendChild(innerList);
    outerList.appendChild(outerItem);
  }
}

function populateFavorites() {
  var myFavorites = getLocalStorage() ?? {};
  var player = {};

  Object.entries(myFavorites).forEach(([key, value]) => {
    player[key] = value;
  });
  // console.log(player);
}

function addLocalStorage(addLS) {
  var storage = getLocalStorage() ?? [];

  storage.push(addLS);
  window.localStorage.removeItem("favoritePlayersStringify");
  $("#fav").empty();

  setLocalStorage(storage);
}

function setLocalStorage(favoritePlayers) {
  localStorage.setItem(
    "favoritePlayersStringify",
    JSON.stringify(favoritePlayers)
  );
}

function getLocalStorage() {
  if (localStorage.getItem("favoritePlayersStringify") !== null) {
    return JSON.parse(localStorage.getItem("favoritePlayersStringify"));
  }
}

function init() {
  popTeamListing();
  populateTeamList();
}

init();
