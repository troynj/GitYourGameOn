//_embedded.events[0].name -- home vs away
// home icon
//_embedded.events[0]._embedded.attraces[0].url -- away icon
//_embedded.events[0]._embedded.attractions[1].images[1].url -- diff size away icon (goes til [9])

//social media links
// _embedded.events[0]._embedded.attractions[0].externalLinks

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





      var gameListEl = $("<ul>");
      data._embedded.events.forEach((el, i) => {
        //create
        var gameEl = $("<li>");
        var selectBtnEl = $("<button>");
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

        //set
        gameEl.text(data._embedded.events[i].name);
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
        selectBtnEl.text("See Players");
        //append
        $("#games").append(gameListEl);
        gameListEl.append(gameEl);
        gameEl.append(selectBtnEl);
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
    teamBtn.addClass("uk-background-muted uk-padding")
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
  "Charlette Hornets": ["3547239", "204", "403"],
  "Detroit Pistons": ["17896075", "54", "482"],
  "Orlando Magic": ["28", "38017683", "165"],
};

//This fetch request retrieves the 3 player stats for the selected NBA team
function bdlStatsApi(playerId) {
  var requestUrl = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`;

  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((stats) => {
      // console.log(stats)
      /*After the fetch for player stats is completed, a second fetch command and this passes
     the data from the first API request on to the second API request for names*/
      bdlNamesApi(playerId, stats.data[0]);
    });
}
// This function fetched the player names and combine player stats
function bdlNamesApi(playerId, playerStats) {
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
      //Passes player stats to the displayPlayerStats function
      displayPlayerStats(getPlayerStats(playerStats));
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
  titleCardEl.css("background-color", "white")
  titleEl.text(inputTeam)
  $("#details").append(teamEl);
  teamEl.append(titleCardEl)
  titleCardEl.append(titleEl)
  // console.log(teamEl);
  // console.log(inputTeam);
  // For each element within the array, call the bdlStatsApi and pass datatype 3 and the element.
  nbaTeams[inputTeam].forEach((el) => {
    // console.log(i)
    bdlStatsApi(el);
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

popTeamListing();
