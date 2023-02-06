function fetchGames(userSelection) {
  const reqUrl = buildRequestUrl(userSelection);

  fetch(reqUrl)
    .then((response) => response.json())
    .then((data) => {
      const gameListEl = document.getElementById("initInfo");
      gameListEl.classList.add("gamesContainer");
      data._embedded.events.forEach((event, i) => {
        const gameEl = createGameElement(event);
        document.getElementById("games").append(gameListEl);
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
  const awayIcon = setIcon(event._embedded.attractions[0].images);
  const homeIcon = setIcons(event._embedded.attractions[1].images);
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

function setTeamNames(gameStr) {
  const gameArr = gameStr.split(" ");
  let homeName = "";
  let awayName = "";

  let home = true;
  for (const word of gameArr) {
    if (word === "vs." || word === "v." || word === "vs" || word === "v") {
      home = false;
    }
    home ? (homeName += word + " ") : (awayName += word + " ");
  }

  return [homeName.trim(), awayName.trim()];
}

function setIcons(iconArr) {
  var min = 1000;
  var savedIndex = 0;
  iconArr.forEach((el, i) => {
    min > el.height && (min = el.height) && (savedIndex = i);
  });
  return iconArr[savedIndex].url;
}

function setGameTime(time) {
  var [hourString, minute] = time.split(":");
  var hour = +hourString % 24;
  return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
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
    [
      [target.getAttribute("homeTeam"), target.getAttribute("homeIcon")],
      [target.getAttribute("awayTeam"), target.getAttribute("awayIcon")],
    ].forEach(([team, icon]) => getTeamStats(team, icon));
    displayGameInfo(event.dates.start.localDate, gameTime, gameLink);
  });
}

Module.exports = { fetchGames };
