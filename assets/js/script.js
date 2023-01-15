//_embedded.events[0].name -- home vs away
// home icon
//_embedded.events[0]._embedded.attraces[0].url -- away icon
//_embedded.events[0]._embedded.attractions[1].images[1].url -- diff size away icon (goes til [9])

async function tmBasketball(userSelection) {
  console.log(userSelection);
  var apiKey = `apikey=9XshdGRWAPA44uov6ogAAGLaYkru76D3`;
  var baseUrl = `https://app.ticketmaster.com/`;
  var searchBy = `discovery/v2/events.json`;
  var subGenreId = `subGenreId=KZazBEonSMnZfZ7vFJA`;
  var keywordStr = `keyword="${userSelection}"`;
  var reqUrl = `${baseUrl}${searchBy}?${apiKey}&${keywordStr}&${subGenreId}`;

  console.log(reqUrl);
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
        var [home, away] = data._embedded.events[i].name.split(/[\sv\s]+[\svs\s]+[[\svs.\s]/);
        
        //set
        gameEl.text(data._embedded.events[i].name);
        gameEl.attr("jumpto", "details");
        gameEl.attr("jumpfrom", "games");
        gameEl.attr("home", home.trim());
        gameEl.attr("away", away.trim());
        console.log(home.trim())
        console.log(away.trim())
        gameEl.click(() => {
          console.log(event.currentTarget.attributes[0].value)
          console.log(event.currentTarget.attributes[1].value)
          navigate(
            event.currentTarget.attributes[0].value,
            event.currentTarget.attributes[1].value
          );
          $("#games").empty();
          getTeamStats(home);
          getTeamStats(away);
        });
        selectBtnEl.text("Select");
        //append
        $("#games").append(gameListEl);
        gameListEl.append(gameEl);
        gameEl.append(selectBtnEl);
      });
    });
}

//Create elements on page
var landingSect = document.createElement("div");
var searchSect = document.createElement("div");
var resultSect = document.createElement("div");
//Set attributes to the containers
// landingSect.setAttribute("")
// searchSect.setAttribute("")
// resultSect.setAttribute("")
// append containers
document.body.appendChild(landingSect);
document.body.appendChild(searchSect);
document.body.appendChild(resultSect);

// function popTeamSelect() { //function iterate through 'nbaTeams'  + create checkboxes (discuss dropdown option)

// }

function navigate(jumpFrom, jumpTo) {
  $(`#${jumpFrom}`).toggleClass("visible invisible");
  $(`#${jumpTo}`).toggleClass("visible invisible");
}

function popTeamListing() {
  Object.keys(nbaTeams).forEach((el) => {
    teamArr = el.split(" ");
    var teamBtn = $("<button>");
    teamBtn.click(() => {
      tmBasketball(teamArr[teamArr.length - 1]);
      navigate("teams", "games");
    });
    teamBtn.text(el);
    $("#teams").append(teamBtn);
  });
}

// function popGameListing() {
//  //function to show TM results w/ dates and headline
//  var gameList = createElement("div");
//  for (var i = 0; i < 5; i++) {
//    // Look at ticketmaster data and append the titles

//    var selectBtn = document.createElement("button");
//    selectBtn.setAttribute("");
//  }
// }

// var nbaTeams = {
//   LAL: ["237", "472", "117"],
//   GSW: ["115", "443", "185"],
//   PHX: ["57", "367", "22"],
//   LAC: ["274", "172", "467"],
//   DAL: ["132", "486", "38017679"],
//   PLR: ["278", "419", "349"],
//   DEN: ["246", "335", "375"],
//   UTA: ["297", "100", "413"],
//   MEM: ["666786", "231", "3"],
//   SAC: ["161", "30", "38017688"],
//   NOP: ["666969", "303", "455"],
//   MIN: ["3547238", "176", "447"],
//   HOU: ["17895966", "38017684", " 666849"],
//   SAS: ["666682", "373", "3547274"],
//   OKC: ["175", "17896065", "666541"],
//   BOS: ["434", "70", "219"],
//   BKN: ["140", "228", "417"],
//   MIL: ["15", "315", "214"],
//   NYK: ["73", "387", "399"],
//   CLE: ["666581", "285", "322"],
//   CHI: ["268", "125", "27"],
//   PHI: ["192", "145", "3547254"],
//   MIA: ["79", "666633", "4"],
//   TOR: ["416", "17896055", "458"],
//   WAS: ["378", "37", "265"],
//   ATL: ["490", "101", "334"],
//   CHA: ["3547239", "204", "403"],
//   IND: ["3547245", "452", "210"],
//   DET: ["17896075", "54", "482"],
//   ORL: ["28", "38017683", "165"],
// };

var nbaTeams = {
  "Los Angeles Lakers": ["237", "472", "117"],
  "Golden State Warriors": ["115", "443", "185"],
  "Pheonix Suns": ["57", "367", "22"],
  "Portland Trail Blazers": ["278", "419", "349"],
  "Los Angeles Clippers": ["274", "172", "467"],
  "Dallas Mavericks": ["132", "486", "38017679"],
  "Denver Nuggests": ["246", "335", "375"],
  "Utah Jazz": ["297", "100", "413"],
  "Memphis Grizzlies": ["666786", "231", "3"],
  "Sacremento Kings": ["161", "30", "38017688"],
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
  "Chicago Bulls": ["268", "125", "27"],
  "Philadelphia 76ers": ["192", "145", "3547254"],
  "Miami Heat": ["79", "666633", "4"],
  "Toronto Raptors": ["416", "17896055", "458"],
  "Washington Wizards": ["378", "37", "265"],
  "Atlanta Hawks": ["490", "101", "334"],
  "Indiana Pacers": ["3547245", "452", "210"],
  "Charolette Hornets": ["3547239", "204", "403"],
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
      //This method merges player stats from Fetch(bdlStatApi) with the stats from Fetch(bdlNamesApi)
      $.extend(playerStats, stats);
      //Passes player stats to the displayPlayerStats function
      displayPlayerStats(getPlayerStats(playerStats));
    });
}

//Get Stats
function getTeamStats(inputTeam) {
  console.log(inputTeam)
  // For each element within the array, call the bdlStatsApi and pass datatype 3 and the element.
  nbaTeams[inputTeam].forEach((el) => {
    bdlStatsApi(el);
  });
}

function getPlayerStats(stats) {
  //PTS, REB, AST, FG%

  var playerName =
    stats.first_name + " " + stats.last_name + " (" + stats.position + ")";
  var pts = stats.pts.toFixed(1);
  var totReb = (stats.oreb + stats.dreb).toFixed(1);
  var ast = stats.ast.toFixed(1);
  var fgp = (stats.fg_pct * 100).toFixed(1);

  return {
    Player: playerName,
    PTS: pts,
    REB: totReb,
    AST: ast,
    "FG%": fgp + "%",
  };
}

function displayPlayerStats(pStatObj) {
  //Creating an element
  var teamEl = $("<article>");
  var pstatsUl = $("<ul>");
  pstatsUl.css("list-style", "none");
  $("#details").append(teamEl);
  teamEl.append(pstatsUl);
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
    } else {
      listEl.text(key + ": " + value);
    }
    //Append the ul element with the stat or name
    pstatsUl.append(listEl);
  });
}

/*Create event listener when Select Game button is clicked and pass the home
team and away team ID's to displayPlayerStats function */

$("#select-game").click(() => {
  $("#games").empty();
  getTeamStats("BOS");
});

popTeamListing();
