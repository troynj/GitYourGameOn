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

var nbaTeams = {
  West: {
    LAL: ['237', '472', '117'],
    GSW: ['115','443', '185'],
    PHX: ['57', '367', '22'],
    LAC: ['274', '172','467'],
    DAL: ['132', '486', '38017679'],
    PLR: ['278', '419', '349'],
    DEN: ['246', '335', '375'],
    UTA: ['297', '100', '413'],
    MEM: ['666786', '231', '3'],
    SAC: ['161', '30', '38017688'],
    NOP: ['666969','303','455'],
    MIN: ['3547238','176','447'],
    HOU: ['17895966','38017684',' 666849'],
    SAS: ['666682','373','3547274'],
    OKC: ['175','17896065','666541']
    
  },
  East : {
    BOS: ['434','70','219'],
    BKN: ['140','228','417'],
    MIL: ['15','315','214'],
    NYK: ['73','387','399'],
    CLE: ['666581','285','322'],
    CHI: ['268','125','27'],
    PHI: ['192','145','3547254'],
    MIA: ['79','666633','4'],
    TOR: ['416','17896055','458'],
    WAS: ['378','37','265'],
    ATL: ['490','101','334'],
    CHA: ['3547239','204','403'],
    IND: ['3547245','452','210'],
    DET: ['17896075','54','482'],
    ORL: ['28','38017683','165']
  }
}

//lebron = &player_ids[]=237
var player = prompt('Enter player name:');
var ScottyPippenJr = "38017656"
var seasonFrom = "2022";
var seasonTo = "2022";
var seasonStr = `?seasons[]=${seasonFrom}&seasons[]=${seasonTo}`;
var perPage = "100";
var perPageStr = `?per_page=${perPage}`;
var dataType = ["players", "stats", "teams"]
function bdlApi(pageNum, type) {
  var baseUrl = "https://www.balldontlie.io/api/v1/";
  // var requestUrl = `${baseUrl}${dataType[type]}?page=${pageNum}${seasonStr}${perPageStr}`;
  var requestUrl = `${baseUrl}${dataType[type]}${perPageStr}&page=${pageNum}&search=${player}` //${ScottyPippenJr}
  fetch(requestUrl)
    .then((response) => {
      return response.json();
    })
    .then((stats) => {
      console.log(stats);
      // getTeam(stats);
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

// function getTeam(stats, userinputTeam) {
//   for (var i = 0; i < stats.data?.length; i++) {
//     if (stats.data[i].team.abbreviation == "LAL") {
//       /* Check to see if player ID already exists in the Object (LalObj), if NOT, add the new 
//       player ID to the object, if Player ID already exists, then dont evaluate the second half 
//       of this statement */
//       LalObj[stats.data[i].player.id] || (LalObj[stats.data[i].player.id] = {});
      
//       /* Does this exist? Ternary operator*/
//       LalObj[stats.data[i].player.id].assists
//       /* Increment - true */
//         ? (LalObj[stats.data[i].player.id].assists += stats.data[i].ast)
//          /* Instantiate - false */
//         : (LalObj[stats.data[i].player.id].assists = stats.data[i].ast);
      
//         LalObj[stats.data[i].player.id].blocks
//         ? (LalObj[stats.data[i].player.id].blocks += stats.data[i].blk)
//         : (LalObj[stats.data[i].player.id].blocks = stats.data[i].blk);

//       LalObj[stats.data[i].player.id].oRebounds
//         ? (LalObj[stats.data[i].player.id].oRebounds += stats.data[i].oreb)
//         : (LalObj[stats.data[i].player.id].oRebounds = stats.data[i].oreb);

//       LalObj[stats.data[i].player.id].dRebounds
//         ? (LalObj[stats.data[i].player.id].dRebounds += stats.data[i].dreb)
//         : (LalObj[stats.data[i].player.id].dRebounds = stats.data[i].dreb);

//       LalObj[stats.data[i].player.id].freethrowsMade
//         ? (LalObj[stats.data[i].player.id].freethrowsMade += stats.data[i].ftm)
//         : (LalObj[stats.data[i].player.id].freethrowsMade = stats.data[i].ftm);

//       LalObj[stats.data[i].player.id].fieldGoalsMade
//         ? (LalObj[stats.data[i].player.id].fieldGoalsMade += stats.data[i].fgm)
//         : (LalObj[stats.data[i].player.id].fieldGoalsMade = stats.data[i].fgm);
//     }
//   }
//   console.log(LalObj);
// }

