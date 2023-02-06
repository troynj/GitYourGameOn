function addLocalStorage(addLS) {
  var storage = getLocalStorage() ?? [];

  storage.push(addLS);
  window.localStorage.removeItem("favoritePlayersStringify");
  $("#fav").empty();

  setLocalStorage(storage);
}

function setLocalStorage(favoritePlayers) {
  localStorage.setItem(
    "favoritePlayersStringify",
    JSON.stringify(favoritePlayers)
  );
}

function getLocalStorage() {
  if (localStorage.getItem("favoritePlayersStringify") !== null) {
    return JSON.parse(localStorage.getItem("favoritePlayersStringify"));
  }
}

module.exports = { addLocalStorage, setLocalStorage, getLocalStorage };