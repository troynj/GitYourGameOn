function displayFavorites() {
  const favObj = getLocalStorage() || {};
  const outerList = document.querySelector("#accordion");

  for (const player of Object.values(favObj)) {
    const outerItem = document.createElement("li");
    outerItem.id = "outer-li";

    const titleEl = document.createElement("a");
    titleEl.classList.add("uk-accordion-title");
    titleEl.href = "#";
    titleEl.textContent = player.Name;

    const innerList = document.createElement("ul");
    innerList.classList.add("uk-accordion-content");

    for (const [key, value] of Object.entries(player)) {
      if (key === "Name") {
        continue;
      }

      const innerItem = document.createElement("li");
      innerItem.textContent = `${key}: ${value}`;

      innerList.appendChild(innerItem);
    }

    outerItem.appendChild(titleEl);
    outerItem.appendChild(innerList);
    outerList.appendChild(outerItem);
  }
}

function populateFavorites() {
  var myFavorites = getLocalStorage() ?? {};
  var player = {};

  Object.entries(myFavorites).forEach(([key, value]) => {
    player[key] = value;
  });
}

Module.exports = { displayFavorites, populateFavorites };