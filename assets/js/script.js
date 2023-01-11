//Brad Coleman
// var apiKey ='nPYUXzYriSK7f0xcD6RYhwFUMGiFgMgr'
//Troy Johnson
//Daniele Bensan

var baseUrl = 'https://app.ticketmaster.com'

function tmEvents(){
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



