function tmBasketball(userSelection) {
  // console.log(userSelection);
  var apiKey = `apikey=9XshdGRWAPA44uov6ogAAGLaYkru76D3`;
  var baseUrl = `https://app.ticketmaster.com/`;
  var searchBy = `discovery/v2/events.json`;
  var subGenreId = `subGenreId=KZazBEonSMnZfZ7vFJA`;
  var keywordStr = `keyword="${userSelection}"`;
  var reqUrl = `${baseUrl}${searchBy}?${apiKey}&${keywordStr}&${subGenreId}`;

  
  fetch(reqUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      // _embedded.events[0].dates.start.localDate
      // _embedded.events[0].dates.start.localDate
      var gameListEl = $("#initInfo");
      gameListEl.addClass("gamesContainer");

      data._embedded.events.forEach((el, i) => {
        //create
        var gameEl = $("<div>");
        gameEl.addClass("uk-flex-center");
        gameEl.addClass("uk-card");
        gameEl.css("background-color", "#ffffffd9");
        gameEl.css("margin", "10px 0px");
        var selectBtnEl = $("<button>");
        selectBtnEl.addClass("uk-button uk-button-secondary mask");
        //array deconstructor assigned values by splitting value from click event with regex
        // var [home, away] = data._embedded.events[i].name.split(
        //   /[\sv\s]|[\sv.\s]|[\svs\s]|[\svs.\s]/
        // );

        var [home, away] = setTeamNames(data._embedded.events[i].name);

        home = home?.trim();
        away = away?.trim();
        //home
        var homeIcon = setIcon(
          data._embedded.events[i]._embedded.attractions[0].images
        );
        //away
        var awayIcon = setIcon(
          data._embedded.events[i]._embedded.attractions[1].images
        );
        //Gets the Link to the game selected
        var gameLink = data._embedded.events[i].url;
        var gameName = data._embedded.events[i].name;
        var time = data._embedded.events[i].dates.start.localTime;
        var gameTime = setGameTime(time);
        // console.log(time);
        // console.log(gameTime);

        var nameContainer = $("<p>");
        nameContainer.addClass("uk-flex-inline");
        // nameContainer.css("display", "inline");

        gameEl.append(nameContainer);
        //set
        nameContainer.text(gameName);
        nameContainer.css({
          "font-size": "40px",
          color: "black",
        });
        gameEl.append(nameContainer);

        gameEl.attr("jumpto", "details");
        gameEl.attr("jumpfrom", "games");
        //Cannot read properties of undefined (reading 'trim')
        gameEl.attr("homeTeam", home);
        //Cannot read properties of undefined (reading 'trim')
        gameEl.attr("awayTeam", away);
        gameEl.attr("homeIcon", homeIcon);
        gameEl.attr("awayIcon", awayIcon);

        gameEl.click((event) => {
          // console.log(event.currentTarget.attributes[0].value);
          // console.log(event.currentTarget.attributes[1].value);

          navigate(
            event.currentTarget.attributes[0].value,
            event.currentTarget.attributes[1].value
          );
          $("#games").empty();
          getTeamStats(home, homeIcon);
          getTeamStats(away, awayIcon);
          // displayGameLink(gameDate, gameLink);
          displayGameInfo(gameDate, gameTime, gameLink);
          // console.log(gameLink);
          // console.log(gameName);
        });
        selectBtnEl.css("float", "right");
        selectBtnEl.text("Select");

        //append
        $("#games").append(gameListEl);
        gameListEl.append(gameEl);
        gameEl.append(selectBtnEl);

        // adds game date to games page
        var gameDate = data._embedded.events[i].dates.start.localDate;
        // console.log(gameDate);

        gameEl.append(gameDate);
      });
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
  // console.log(gameStr);
  var gameArr = gameStr.split(" ");
  var t1 = "";
  var t2 = "";
  var teamArr = [t1, t2];
  var j = 0;
  for (var i = 0; i < gameArr.length; i++) {
    if (
      gameArr[i] == "vs." ||
      gameArr[i] == "v." ||
      gameArr[i] == "vs" ||
      gameArr[i] == "v"
    ) {
      j++;
    } else {
      // console.log(teamArr[j]);
      teamArr[j] += gameArr[i] + " ";
    }
  }
  return teamArr;
}

function setIcon(dataArr) {
  var min = 1000;
  var savedIndex = 0;
  dataArr.forEach((el, i) => {
    min > el.height && (min = el.height) && (savedIndex = i);
    //   console.log("==" + i + "====");
    //   console.log(min);
    //   console.log(el.height);
    //   console.log("===============");
  });

  // console.log(min);
  // console.log(savedIndex);
  return dataArr[savedIndex].url;
}

function navigate(jumpFrom, jumpTo) {
  //console.log(jumpFrom)
  //console.log(jumpTo)
  //if (jumpFrom === jumpTo) return;

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
  Object.keys(nbaTeams).forEach((el) => {
    var teamBtn = $("<button>");

    teamBtn.addClass("uk-flex-center@l");
    // teamBtn.attr("id", "team-select");
    teamBtn.addClass("uk-background-muted team-btn");
    teamBtn.text(el);
    teamBtn.hover(() => {
      teamBtn.addClass("uk-button-secondary");
    });
    teamBtn.mouseleave(() => {
      teamBtn.removeClass("uk-button-secondary");
    });

    var teamArr = el.split(" ");
    teamBtn.click(() => {
      tmBasketball(teamArr[teamArr.length - 1]);
      navigate("teams", "games");
    });
    $("#teams").append(teamBtn);
    // console.log(teamBtn.val());
  });
}

//This fetch request retrieves the 3 player stats for the selected NBA team
function bdlStatsApi(playerId, playerStatsType, favShortcut) {
  console.log("favShortcut", favShortcut);
  // console.log(playerId, '==========');
  var requestUrl = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`;

  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((stats) => {
      // console.log(playerStatsType)
      // console.log(stats)
      /*After the fetch for player stats is completed, a second fetch command and this passes
     the data from the first API request on to the second API request for names*/
      bdlNamesApi(playerId, stats.data[0], playerStatsType, favShortcut);
    });
}
// This function fetched the player names and combine player stats
function bdlNamesApi(playerId, playerStats, playerStatsType, favShortcut) {
  // console.log("playerId", playerId)
  // console.log("playerStats", playerStats)
  // console.log("playerStatsType", playerStatsType)
  // console.log("favShortcut", favShortcut)
  var requestUrl = `https://www.balldontlie.io/api/v1/players/${playerId}`;

  // console.log(requestUrl)
  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((stats) => {
      // console.log(stats);
      //This method merges player stats from Fetch(bdlStatApi) with the stats from Fetch(bdlNamesApi)
      $.extend(playerStats, stats);
      // console.log(playerStats)
      //Passes player stats to the displayPlayerStats function
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
  // console.log(inputTeam);
  // console.log(inputTeam)
  var teamEl = $("<section>");
  var titleCardEl = $("<div>");
  var titleEl = $("<h2>");
  teamEl.attr("team", inputTeam);
  teamEl.css("background-image", `url("${icon}")`);
  teamEl.css("text-align", "center");
  titleCardEl.css("color", "white");
  titleEl.text(inputTeam);

  $("#wrapper").append(teamEl);
  teamEl.append(titleCardEl);
  titleCardEl.append(titleEl);
  // console.log(teamEl);
  // console.log(inputTeam);
  // For each element within the array, call the bdlStatsApi and pass datatype 3 and the element.
  nbaTeams[inputTeam].forEach((el) => {
    // console.log(i)
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

// code clean up. This function was nested within the other function already, solved in merge editor

// function purchaseTickets(gameName, gameLink) {
//   // console.log(gameName);
//   // console.log(gameLink);
//   $("link").prepend($("<h2>").text(gameName).css({ "background-color": "black", "color": "white" }))
//   var gameLinkEl = $("<a>");
//   gameLinkEl.attr('href', gameLink);
//   gameLinkEl.text("Purchase Tickets - " + gameName);
//   $("#details").append($("<button>").append(gameLinkEl))
// }

function displayPlayerStats(pStatObj) {
  var favArr = getLocalStorage() ?? [];
  var teamEl = $(`[team="${pStatObj.Team}"]`);
  var playerCardEl = $("<article>");
  var pstatsUl = $("<ul>");
  var inputPlayerArr = pStatObj.Player.split(" ");
  var inputPlayerStr = inputPlayerArr[0] + " " + inputPlayerArr[1];

  // console.log(pStatObj)
  //beginning of star code
  var starBtnEl = $("<i>");
  starBtnEl.addClass("fas fa-star");
  starBtnEl.click(() => {
    console.log(inputPlayerStr);
    var checkFav = getLocalStorage() || {};
    var checkFavArr = Object.values(checkFav);
    // console.log(checkFavArr)
    // console.log(checkFavArr.length == false)
    if (!checkFav.length) {
      getPlayerId(inputPlayerStr, pStatObj.Team, "long", true);
    } else {
      Object.values(checkFav).forEach((el) => {
        Object.entries(el).forEach(([key, value]) => {
          console.log(key);
          console.log(key === "Player");
          if (key == "Name") {
            // console.log(inputPlayerStr);
            // console.log(value);
            console.log("PSO.TEAM" ,pStatObj.Team)

            if (value !== inputPlayerStr)

            console.log("PSO.TEAM" ,pStatObj.Team)
              getPlayerId(inputPlayerStr, pStatObj.Team, "long", true);
            console.log(inputPlayerStr, "Added to Favorites");
          }
        });
      });
    }
  });
  playerCardEl.append(starBtnEl);
  //end of star code

  playerCardEl.css("position", "relative");
  teamEl.attr("id", "team-card");
  pstatsUl.css("background-color", "#ffffffd9");
  teamEl.append(playerCardEl);
  playerCardEl.append(pstatsUl);
  // Append that element to the Div tag with ID = "player-stats-card"
  Object.entries(pStatObj).forEach(([key, value]) => {
    //create element
    var listEl = $("<li>");
    //Set the element with the stat or the name
    var favPlayer = $("<button>");
    favPlayer.text();
    if (key === "Player") {
      var titleEl = $("<h3>");
      titleEl.css("margin-bottom", "0px");
      titleEl.text(value);
      listEl.append(titleEl);
      playerCardEl.attr("player-card", value);

      favArr.forEach((el) => {
        Object.entries(el).forEach(([lsKey, lsVal]) => {
          var nameArr = value.split(" ");
          var frankenstein = nameArr[0] + " " + nameArr[1];
          // console.log(frankenstein)
          // console.log(lsVal)
          // console.log(lsKey)
          if (lsKey === "Name" && lsVal === frankenstein) {
            // console.log(lsVal)
            starBtnEl.css("color", "#ffc400");
          }
        });
      });
    } else if (key === "Team") {
    } else {
      listEl.text(key + ": " + value);
    }
    //Append the ul element with the stat or name
    pstatsUl.append(listEl);
    pstatsUl.css("list-style", "none");
  });
}

/* This function dynamically populates the drop down list of teams by reference the 
  nbaTeams object*/
function populateTeamList() {
  var lookupFormEl = $("<form>");
  var playerSelectEl = $("<select>");
  var playerInputEl = $("<input>");
  var submitBtn = $("<button>");

  Object.keys(nbaTeams).forEach((el) => {
    var optionListEl = $("<option>");
    optionListEl.attr("value", el);
    //optionListEl.addClass("")
    optionListEl.text(el);
    playerSelectEl.append(optionListEl);
  });

  submitBtn.text("Submit");
  // submitBtn.onfocus(alert("run"))
  submitBtn.click(function (event) {
    event.preventDefault();
    if (!playerInputEl.val()) {
      playerInputEl.attr("placeholder", "Enter A Name!");
    } else {
      getPlayerId(playerInputEl.val(), playerSelectEl.val(), "long");
    }
  });

  $("#search").append(lookupFormEl);
  lookupFormEl.append(playerSelectEl);
  lookupFormEl.append(playerInputEl);
  lookupFormEl.append(submitBtn);
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
  // console.log(player);
  clearSearch();
  Object.entries(player).forEach(([key, value]) => {
    var listItem = $("<li>");
    listItem.text(key + ": " + value);
    $("#tmhere").append(listItem);
  });

  $("#modal-favorites").click(() => {
    addLocalStorage(player);
  });

  $("#modal-close").click(() => {
    // var current = document.querySelector(".visible");
    // if (current.id === "fav") {
    //   location.reload();

    //   navigate("teams", "fav");

    // console.log("hi")
    // }
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
  var favObj = getLocalStorage() ?? {};

  Object.values(favObj).forEach((el, i) => {
    var outerList = $("#accordion");
    var outerItem = $("<li>");
    outerItem.attr("id", "outer-li");

    var titelEl = $("<a>");

    titelEl.addClass('uk-accordion-title');
    titelEl.attr('href', `#`); //player-details${i}

    titelEl.text(el.Name);

    console.log(el.Name);

    var innerList = $("<ul>"); //.attr('id', `player-details${i}`)

    innerList.addClass("uk-accordion-content");
    Object.entries(el).forEach(([key, value]) => {
      var innerItem = $("<li>");
      if (key !== "Name") {
        innerItem.text(key + ": " + value);
      }

      outerList.append(outerItem);
      outerItem.append(titelEl);
      innerList.append(innerItem);
      outerItem.append(innerList);
    });
    // $("#fav").append(listEl);
  });
}

function clearSearch() {
  $("#tmhere").empty();
}

function populateFavorites() {
  var myFavorites = getLocalStorage() ?? {};
  var player = {};

  Object.entries(myFavorites).forEach(([key, value]) => {
    player[key] = value;
  });
  // console.log(player);
}

// function subLocalStorage(subLS) {
//   var storage = getLocalStorage() ?? []
//   var newStorage
//   console.log(storage)
//   Object.entries(storage).forEach(([key, value]) => {

//     console.log(value)

//     // console.log(subLS === value.Name)
//     if (subLS === value.Name){
//       console.log("entered")
//       // //delete still leaves null values in object
//       // delete storage[key]
//     }
//     else {
//       newStorage.push([key, value])

//     }
//   })

//   storage && setLocalStorage(storage);
// }

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

// function defibrillator() {

// }

function init() {
  popTeamListing();
}

init();
