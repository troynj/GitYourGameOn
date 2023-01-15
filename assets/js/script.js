var coordinates = {};

function getLocation(city) {
  var apikey = "e5e80f690a1de46cd1c48d028667801f";
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=imperial`;

  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      coordinates = data.city.coord;
      console.log(coordinates);
      tmBasketball(coordinates);
    });
}

//_embedded.events[0].name -- home vs away
// home icon
//_embedded.events[0]._embedded.attractions[1].images[0].url -- away icon
//_embedded.events[0]._embedded.attractions[1].images[1].url -- diff size away icon (goes til [9])

function tmBasketball() {
  const start = new Date(Date.UTC(2023, 0, 15));
  const end = new Date(Date.UTC(2023, 2, 15));

  var apiKey = `9XshdGRWAPA44uov6ogAAGLaYkru76D3`;
  var baseUrl = `https://app.ticketmaster.com`;
  // var basketball = `/discovery/v2/classifications/genres/1`
  var subGenreId = "KZazBEonSMnZfZ7vFJA";
  var events = `/discovery/v2/events/`;
  var keyword = "Warriors";
  var startDateStr = "&startDateTime=2023-01-14T02:00:00Z";
  var endDateStr = "&endDateTime=2023-03-15T02:00:00Z";
  var latlongStr = `&latlong=${coordinates.lat},${coordinates.lon}`;
  var requestUrl = `${baseUrl}${events}?apikey=${apiKey}&keyword=${keyword}&subGenreId=${subGenreId}${startDateStr}${endDateStr}`;
  // &subGrenreId=${subGenreId}&pages=1000&per_page=100
  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(
      //   data._embedded.classifications[1].segment._embedded.genres[5]._embedded
      //     .subgenres[4].name
      // );
      // console.log(data.page.classifications[1]/segment/_embedded/genres[5]/subgenres[4])
      // console.log(data);
    });
}

tmBasketball();

// function tmEvents(){
// //Brad Coleman
// var apiKey ='nPYUXzYriSK7f0xcD6RYhwFUMGiFgMgr'
// //Troy Johnson
// //Daniele Bensan

// var baseUrl = 'https://app.ticketmaster.com'
// var page = '2'
// var size = '20'
// var test = 'page=${page}&size=${size}'

//     var requestUrl = `${baseUrl}/discovery/v2/events.json?apikey=${apiKey}`
//     fetch(requestUrl)
//     .then ((response) => {
//         return response.json()

//     })
//     .then ((data) =>{
//         console.log(data)

//     })
// }
// tmEvents();

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

function popGameListing() {
  //function to show TM results w/ dates and headline
  var gameList = createElement("div");
  for (var i = 0; i < 5; i++) {
    // Look at ticketmaster data and append the titles

    var selectBtn = document.createElement("button");
    selectBtn.setAttribute("");
  }
}
//================= BALL DONT LIE API ============================//

var nbaTeams = {
  LAL: ["237", "472", "117"],
  GSW: ["115", "443", "185"],
  PHX: ["57", "367", "22"],
  LAC: ["274", "172", "467"],
  DAL: ["132", "486", "38017679"],
  PLR: ["278", "419", "349"],
  DEN: ["246", "335", "375"],
  UTA: ["297", "100", "413"],
  MEM: ["666786", "231", "3"],
  SAC: ["161", "30", "38017688"],
  NOP: ["666969", "303", "455"],
  MIN: ["3547238", "176", "447"],
  HOU: ["17895966", "38017684", " 666849"],
  SAS: ["666682", "373", "3547274"],
  OKC: ["175", "17896065", "666541"],
  BOS: ["434", "70", "219"],
  BKN: ["140", "228", "417"],
  MIL: ["15", "315", "214"],
  NYK: ["73", "387", "399"],
  CLE: ["666581", "285", "322"],
  CHI: ["268", "125", "27"],
  PHI: ["192", "145", "3547254"],
  MIA: ["79", "666633", "4"],
  TOR: ["416", "17896055", "458"],
  WAS: ["378", "37", "265"],
  ATL: ["490", "101", "334"],
  CHA: ["3547239", "204", "403"],
  IND: ["3547245", "452", "210"],
  DET: ["17896075", "54", "482"],
  ORL: ["28", "38017683", "165"],
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
      // bdlNamesApi(0,1,playerId, stats.data[0])
    });
}
// This function fetched the player names and combine player stats
function bdlNamesApi(playerId, playerStats) {
  var requestUrl = `https://www.balldontlie.io/api/v1/players/${playerId}`;

  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((stats) => {
      //This method merges player stats from Fetch(bdlStatApi) with the stats from Fetch(bdlNamesApi)
      $.extend(playerStats, stats);

      // console.log(stats)
      //Passes player stats to the displayPlayerStats function
      displayPlayerStats(getPlayerStats(playerStats));
    });
}

//Get Stats
function getTeamStats(inputTeam) {
  // For each element within the array, call the bdlapi and pass datatype 3 and the element.
  nbaTeams[inputTeam].forEach((el) => {
    bdlStatsApi(el);
  });
  // nbaTeams[inputTeam].forEach((el) => {bdlStatsApi(3,0,el)})
}

function getPlayerStats(stats) {
  //PTS, REB, AST, FG%
  var playerName = stats.first_name + " " + stats.last_name + " (" + stats.position +")";
  var pts = stats.pts.toFixed(1);
  var totReb = (stats.oreb + stats.dreb).toFixed(1);
  var ast = stats.ast.toFixed(1);
  var fgp = (stats.fg_pct * 100).toFixed(1);

  return {
    Name: playerName,
    PTS: pts,
    REB: totReb,
    AST: ast,
    "FG%": fgp + "%",
  };
}

function displayPlayerStats(pStatObj) {
  //Creating an element
  var pstatsUl = $("<ul>");
  // Append that element to the Div tag with ID = "player-stats-card"
  $("#player-stats-card").append(pstatsUl);
  Object.entries(pStatObj).forEach(([key, value]) => {
    //create an element li element to hold each player stat and name
    var listEl = $("<li>");
    //Set the element with the stat or the name
    listEl.text(key + ": " + value);
    //Append the ul element with the stat or name
    pstatsUl.append(listEl);
  });
} 

/*Create event listener when Select Game button is clicked and pass the home 
team and away team ID's to displayPlayerStats function */
$("#selected-game").click(() => {
  getTeamStats("LAC");
});
