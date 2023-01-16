//_embedded.events[0].name -- home vs away
// home icon
//_embedded.events[0]._embedded.attraces[0].url -- away icon
//_embedded.events[0]._embedded.attractions[1].images[1].url -- diff size away icon (goes til [9])

//social media links
// _embedded.events[0]._embedded.attractions[0].externalLinks

// var bodyBackground = $('body');
// var backgrounds = new Array(
//   'url(https://images.unsplash.com/photo-1499754162586-08f451261482?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
//   'url(https://images.unsplash.com/photo-1533923156502-be31530547c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)',
//   'url(http://placekitten.com/300)',
//   'url(http://placekitten.com/400)'
// );

// var current = 0;
// function nextBackground() {
//   current++;
//   current = current % backgrounds.length;
//   header.css('background-image', backgrounds[current]);
// }
// setInterval(nextBackground, 3000);
// bodyBackground.css('background-image', backgrounds[0]);

function tmBasketball(userSelection) {
  // console.log(userSelection);
  var apiKey = `apikey=9XshdGRWAPA44uov6ogAAGLaYkru76D3`;
  var baseUrl = `https://app.ticketmaster.com/`;
  var searchBy = `discovery/v2/events.json`;
  var subGenreId = `subGenreId=KZazBEonSMnZfZ7vFJA`;
  var keywordStr = `keyword="${userSelection}"`;
  var reqUrl = `${baseUrl}${searchBy}?${apiKey}&${keywordStr}&${subGenreId}`;

  // console.log(reqUrl);
  fetch(reqUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      var gameListEl = $("<div>");

      data._embedded.events.forEach((el, i) => {
        //create
        var gameEl = $("<div>");
        gameEl.addClass("uk-flex-center")
        gameEl.css("background-color", "#ffffffd9");
        gameEl.css("margin","15px 10px");
        var selectBtnEl = $("<button>");
        selectBtnEl.addClass("uk-button uk-button-secondary");
        //array deconstructor assigned values by splitting value from click event with regex
        // var [home, away] = data._embedded.events[i].name.split(
        //   /[\sv\s]|[\sv.\s]|[\svs\s]|[\svs.\s]/
        // );
        var [home, away] = setTeamNames(data._embedded.events[i].name)
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
        var nameContainer = $("<p>");
        // nameContainer.css("display", "inline");
        nameContainer.addClass("uk-flex-inline");
        var gameName = data._embedded.events[i].name;
        gameEl.append(nameContainer);
        //set
        nameContainer.text(gameName);
        nameContainer.css("font-size","40px");
        gameEl.append(nameContainer);

        gameEl.attr("jumpto", "details");
        gameEl.attr("jumpfrom", "games");
        //Cannot read properties of undefined (reading 'trim')
        gameEl.attr("homeTeam", home);
        //Cannot read properties of undefined (reading 'trim')
        gameEl.attr("awayTeam", away);
        gameEl.attr("homeIcon", homeIcon);
        gameEl.attr("awayIcon", awayIcon);

        gameEl.click(() => {
          // console.log(event.currentTarget.attributes[0].value);
          // console.log(event.currentTarget.attributes[1].value);

          navigate(
            event.currentTarget.attributes[0].value,
            event.currentTarget.attributes[1].value
          );
          $("#games").empty();
          getTeamStats(home, homeIcon);
          getTeamStats(away, awayIcon);
        });
        selectBtnEl.css("float", "right");
        selectBtnEl.text("See Players");

        //append
        $("#games").append(gameListEl);
        gameListEl.append(gameEl);
        gameEl.append(selectBtnEl);


        // adds game date to games page
        var gameDate = data._embedded.events[i].dates.start.localDate;
        console.log(gameDate);

        gameEl.append(gameDate);
      });


    });
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
  $(`#${jumpFrom}`).toggleClass("visible invisible");
  $(`#${jumpTo}`).toggleClass("visible invisible");
}

function popTeamListing() {
  Object.keys(nbaTeams).forEach((el) => {
    var teamBtn = $("<button>");
    teamBtn.addClass("uk-padding uk-button uk-button-secondary");
    teamBtn.addClass("uk-flex-center@l");
    teamBtn.attr("id", "team-select");
    teamBtn.text(el);

    var teamArr = el.split(" ");
    teamBtn.click(() => {
      tmBasketball(teamArr[teamArr.length - 1]);
      navigate("teams", "games");
    });
    $("#teams").append(teamBtn);
  });
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
  "Detroit Pistons": ["17896075", "54", "482"],
  "Orlando Magic": ["28", "38017683", "165"],
};

//This fetch request retrieves the 3 player stats for the selected NBA team
function bdlStatsApi(playerId, playerStatsType) {
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

      bdlNamesApi(playerId, stats.data[0], playerStatsType)

    });
}
// This function fetched the player names and combine player stats
function bdlNamesApi(playerId, playerStats, playerStatsType) {
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
      playerStatsType == "short" ?
        displayPlayerStats(getPlayerStats(playerStats)) :
        displayPlayerProfile(setPlayerProfile(playerStats));
    });
}

/* This function fetches players that match the input name and then identifies the player name that also have a team that matches the selected team*/
function getPlayerId(playerSearched, team, playerStatsType) {
  var requestUrl = `https://www.balldontlie.io/api/v1/players?search=${playerSearched}`;

  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((stats) => {
      stats.data.forEach((el) => {
        if (team === el.team.full_name) {
          bdlStatsApi(el.id, playerStatsType);
        }
      });
    });
}

//Get Stats
function getTeamStats(inputTeam, icon) {
  // console.log(inputTeam);
  // console.log(inputTeam)
  var teamEl = $("<section>");
  var titleCardEl = $("<div>")
  var titleEl = $("<h2>")
  teamEl.attr("team", inputTeam);
  teamEl.css("background-image", `url("${icon}")`);
  teamEl.css("text-align", "center");
  titleCardEl.css("color", "white");
  titleCardEl.css("-webkit-text-stroke-width", "1px");
  titleCardEl.css("-webkit-text-stroke-color", "black");
  titleCardEl.css("background-color", "transparent")
  titleEl.text(inputTeam)
  $("#details").append(teamEl);
  teamEl.append(titleCardEl)
  titleCardEl.append(titleEl)
  // console.log(teamEl);
  // console.log(inputTeam);
  // For each element within the array, call the bdlStatsApi and pass datatype 3 and the element.
  nbaTeams[inputTeam].forEach((el) => {
    // console.log(i)
    bdlStatsApi(el, "short");
  });
}

function getPlayerStats(stats) {
  //PTS, REB, AST, FG%
  // console.log(stats);
  var playerName =
    stats.first_name + " " + stats.last_name + " (" + stats.position + ")";
  var team = stats.team.full_name;
  var pts = stats.pts.toFixed(1);
  var totReb = (stats.oreb + stats.dreb).toFixed(1);
  var ast = stats.ast.toFixed(1);
  var fgp = (stats.fg_pct * 100).toFixed(1);

  return {
    Player: playerName,
    Team: team,
    PTS: pts,
    REB: totReb,
    AST: ast,
    "FG%": fgp + "%",
  };
}

function displayPlayerStats(pStatObj) {
  // console.log(pStatObj.Team)

  //Creating an element
  // console.log(pStatObj);
  var teamEl = $(`[team="${pStatObj.Team}"]`);

  var playerCardEl = $("<article>");
  var pstatsUl = $("<ul>");
  teamEl.attr("id", "team-card")

  pstatsUl.css("background-color", "#ffffffd9");
  // pstatsUl.css("width", "fit-content")
  // pstatsUl.css("box-shadow", "20px 0px 20px 15px #ffffff80")



  teamEl.append(playerCardEl);
  playerCardEl.append(pstatsUl);
  // Append that element to the Div tag with ID = "player-stats-card"
  //$("#player-stats-card").append(pstatsUl);
  Object.entries(pStatObj).forEach(([key, value]) => {
    //create element
    var listEl = $("<li>");
    //Set the element with the stat or the name

    if (key === "Player") {
      var titleEl = $("<h3>");
      titleEl.css("margin-bottom", "0px");
      titleEl.text(value);
      listEl.append(titleEl);
      playerCardEl.attr("player-card", value);
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
    optionListEl.addClass("")
    optionListEl.text(el);
    playerSelectEl.append(optionListEl);
  });
  submitBtn.text("Submit");
  submitBtn.click(function (event) {
    event.preventDefault();
    getPlayerId(playerInputEl.val(), playerSelectEl.val(), "long");

  });

  $("#search").append(lookupFormEl);
  lookupFormEl.append(playerSelectEl);
  lookupFormEl.append(playerInputEl);
  lookupFormEl.append(submitBtn);
}

function setPlayerProfile(stats) {

  return {
    Name: (stats.first_name + " " + stats.last_name),
    Team: stats.team.full_name,
    Height: (stats.height_feet + "-" + stats.height_inches),
    Position: stats.position,
    Weight: stats.weight_pounds,
    pts: stats.pts.toFixed(1),
    reb: (stats.oreb + stats.dreb).toFixed(1),
    ast: stats.ast.toFixed(1),
    fgp: (stats.fg_pct * 100).toFixed(1),
    fg3p: (stats.fg3_pct * 100).toFixed(1),
    stl: stats.stl,
    blk: stats.blk,
    to: stats.turnover

  }

}
function displayPlayerProfile(player) {

  // create
  var nameEl = $("<h2>");

  // set 
  nameEl.text(player.Name)
  // append
  $("#single-player-stats").append(nameEl)
}

function setLocalStorage(favoritePlayers) {
  document.setLocalStorage("favoritePlayersStringify", JSON.stringify(favoritePlayers))
}

function getLocalStorage() {
  JSON.parse(document.getLocalStorage(favoritePlayerStringify))
}

function init() {
  popTeamListing();
  populateTeamList();

}

init()

