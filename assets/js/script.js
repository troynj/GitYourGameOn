function tmEvents(){
//Brad Coleman
var apiKey ='nPYUXzYriSK7f0xcD6RYhwFUMGiFgMgr'
//Troy Johnson
//Daniele Bensan

var baseUrl = 'https://app.ticketmaster.com'
var page = '2'
var size = '20'
var test = 'page=${page}&size=${size}'

    var requestUrl = `${baseUrl}/discovery/v2/events.json?apikey=${apiKey}`
    fetch(requestUrl)
    .then ((response) => {
        return response.json()

    })
    .then ((data) =>{
        console.log(data)

    })
}
tmEvents();

//================= BALL DONT LIE API ============================//



//lebron = &player_ids[]=237

var ScottyPippenJr = "38017656"
var seasonFrom = "2022";
var seasonTo = "2022";
var seasonStr = `?seasons[]=${seasonFrom}&seasons[]=${seasonTo}`;
var perPage = "100";
var perPageStr = "&per_page=100";
var dataType = ["players", "stats", "team"]
function bdlApi(pageNum, type) {
  var baseUrl = "https://www.balldontlie.io/api/v1/";
  // var requestUrl = `${baseUrl}${dataType[type]}?page=${pageNum}${seasonStr}${perPageStr}`;
  var requestUrl = `${baseUrl}${dataType[type]}/${ScottyPippenJr}`
  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((stats) => {
      console.log(stats);
      getTeam(stats);
    });
}
for (var i = 0; i < 1; i++) {
  
  bdlApi(i, 0);
}

var LalObj = {};

//   "237": {
//   stats.data[i].player.id
//   assists: 0,
//   // stats.data[i].ast
//   blocks: 0,
//   // stats.data[i].blk
//   rebounds: 0,
//   // stats.data[i].dreb
//   // stats.data[i].oreb
//   freethrowsMade: 0
//   // stats.data[i].ftm
// }}

var userinputTeam = "LAL";

function getTeam(stats, userinputTeam) {
  for (var i = 0; i < stats.data?.length; i++) {
    if (stats.data[i].team.abbreviation == "LAL") {
      /* Check to see if player ID already exists in the Object (LalObj), if NOT, add the new 
      player ID to the object, if Player ID already exists, then dont evaluate the second half 
      of this statement */
      LalObj[stats.data[i].player.id] || (LalObj[stats.data[i].player.id] = {});
      
      /* Does this exist? Ternary operator*/
      LalObj[stats.data[i].player.id].assists
      /* Increment - true */
        ? (LalObj[stats.data[i].player.id].assists += stats.data[i].ast)
         /* Instantiate - false */
        : (LalObj[stats.data[i].player.id].assists = stats.data[i].ast);
      
        LalObj[stats.data[i].player.id].blocks
        ? (LalObj[stats.data[i].player.id].blocks += stats.data[i].blk)
        : (LalObj[stats.data[i].player.id].blocks = stats.data[i].blk);

      LalObj[stats.data[i].player.id].oRebounds
        ? (LalObj[stats.data[i].player.id].oRebounds += stats.data[i].oreb)
        : (LalObj[stats.data[i].player.id].oRebounds = stats.data[i].oreb);

      LalObj[stats.data[i].player.id].dRebounds
        ? (LalObj[stats.data[i].player.id].dRebounds += stats.data[i].dreb)
        : (LalObj[stats.data[i].player.id].dRebounds = stats.data[i].dreb);

      LalObj[stats.data[i].player.id].freethrowsMade
        ? (LalObj[stats.data[i].player.id].freethrowsMade += stats.data[i].ftm)
        : (LalObj[stats.data[i].player.id].freethrowsMade = stats.data[i].ftm);

      LalObj[stats.data[i].player.id].fieldGoalsMade
        ? (LalObj[stats.data[i].player.id].fieldGoalsMade += stats.data[i].fgm)
        : (LalObj[stats.data[i].player.id].fieldGoalsMade = stats.data[i].fgm);
    }
  }
  console.log(LalObj);
}

