function playerSearchForm(nbaTeams) {
  // Create a form element
  const lookupFormEl = document.createElement("form");
  // Create a select element
  const playerSelectEl = document.createElement("select");
  // Create an input element
  const playerInputEl = document.createElement("input");
  // Create a button element
  const submitBtn = document.createElement("button");

  // Loop through all team names in the nbaTeams object
  Object.keys(nbaTeams).forEach((el) => {
    // Create an option element
    const optionListEl = document.createElement("option");
    // Set the value of the option element to the team name
    optionListEl.value = el;
    // Set the text content of the option element to the team name
    optionListEl.textContent = el;
    // Add the option element to the select element
    playerSelectEl.appendChild(optionListEl);
  });

  // Set the text content of the submit button to "Submit"
  submitBtn.textContent = "Submit";
  // Add an event listener for the click event
  submitBtn.addEventListener("click", function (event) {
    // Prevent the default form submission
    event.preventDefault();
    // Check if the player input is empty
    if (!playerInputEl.value) {
      // Set the placeholder text of the player input to "Enter A Name!"
      playerInputEl.placeholder = "Enter A Name!";
    } else {
      // Call the getPlayerId function with the player input value, selected team, and "long" as arguments
      getPlayerId(playerInputEl.value, playerSelectEl.value, "long");
    }
  });

  // Get the element with id "search"
  const searchEl = document.querySelector("#search");
  // Add the form element to the "search" element
  searchEl.appendChild(lookupFormEl);
  // Add the select element to the form element
  lookupFormEl.appendChild(playerSelectEl);
  // Add the input element to the form element
  lookupFormEl.appendChild(playerInputEl);
  // Add the submit button to the form element
  lookupFormEl.appendChild(submitBtn);
}