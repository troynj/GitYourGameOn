// function popTeamListing() {
//   Object.keys(nbaTeams).forEach((teamName) => {
//     const teamBtn = $("<button>");
//     teamBtn
//       .addClass("uk-flex-center@l uk-background-muted team-btn")
//       .text(teamName)
//       .hover(() => teamBtn.addClass("uk-button-secondary"))
//       .mouseleave(() => teamBtn.removeClass("uk-button-secondary"))
//       .click(() => {
//         tmBbasketball(teamName.split(" ").pop());
//         navigate("teams", "games");
//       });
//     $("#teams").append(teamBtn);
//   });
// }
function listTeams() {
  // Get an array of all team names in the nbaTeams object
  Object.keys(nbaTeams).forEach((teamName) => {
    // Create a button element
    const teamBtn = document.createElement("button");
    // Add classes to style the button
    teamBtn.classList.add(
      "uk-flex-center@l",
      "uk-background-muted",
      "team-btn"
    );
    // Set the text content of the button to the team name
    teamBtn.textContent = teamName;
    // Add event listener for mouseenter
    teamBtn.addEventListener("mouseenter", function () {
      // Add the "uk-button-secondary" class to the button on mouseenter
      teamBtn.classList.add("uk-button-secondary");
    });
    // Add event listener for mouseleave
    teamBtn.addEventListener("mouseleave", function () {
      // Remove the "uk-button-secondary" class from the button on mouseleave
      teamBtn.classList.remove("uk-button-secondary");
    });
    // Add event listener for click
    teamBtn.addEventListener("click", function () {
      // Call the fetchGames function with the last word of the team name as the argument
      fetchGames(teamName.split(" ").pop());
      // Call the navigate function with arguments "teams" and "games"
      navigate("teams", "games");
    });
    // Add the button to the element with id "teams"
    document.querySelector("#teams").appendChild(teamBtn);
  });
}

export default { listTeams }