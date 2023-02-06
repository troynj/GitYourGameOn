function displayPlayerStats(pStatObj) {
  const teamEl = document.querySelector(`[team="${pStatObj.Team}"]`);
  const playerCardEl = document.createElement("article");
  playerCardEl.dataset.player = JSON.stringify(pStatObj);
  const pstatsUl = document.createElement("ul");
  const inputPlayerStr = pStatObj.Player.split(" ").slice(0, 2).join(" ");

  const starBtnEl = document.createElement("i");
  starBtnEl.classList.add("fas", "fa-star");
  starBtnEl.addEventListener("click", () => {
    const checkFav = getLocalStorage() || [];
    if (!checkFav.some((el) => el.Name === inputPlayerStr)) {
      getPlayerId(inputPlayerStr, pStatObj.Team, "long", true);
      console.log(inputPlayerStr, "Added to Favorites");
    }
  });

  playerCardEl.appendChild(starBtnEl);
  playerCardEl.style.position = "relative";
  teamEl.id = "team-card";
  pstatsUl.style.backgroundColor = "#ffffffd9";
  teamEl.appendChild(playerCardEl);
  playerCardEl.appendChild(pstatsUl);

  if (getLocalStorage().some((el) => el.Name === inputPlayerStr)) {
    starBtnEl.style.color = "#ffc400";
  }

  Object.entries(pStatObj).forEach(([key, value]) => {
    const listEl = document.createElement("li");
    if (key === "Player") {
      const titleEl = document.createElement("h3");
      titleEl.style.marginBottom = "0px";
      titleEl.textContent = value;
      listEl.appendChild(titleEl);
      playerCardEl.dataset.playerCard = value;
    } else if (key !== "Team") {
      listEl.textContent = key + ": " + value;
    }
    pstatsUl.appendChild(listEl);
    pstatsUl.style.listStyle = "none";
  });
}

Module.exports = { displayPlayerStats };