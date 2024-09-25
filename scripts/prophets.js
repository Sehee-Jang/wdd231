const url =
  "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";

const cards = document.querySelector("#cards");

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create elements to add to the div.cards element
    let card = document.createElement("section");
    let fullName = document.createElement("h2"); // fill in the blank
    let portrait = document.createElement("img");
    let dob = document.createElement("p");
    let pob = document.createElement("p");

    // Build the h2 content out to show the prophet's full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`; // fill in the blank
    // Build the image portrait by setting all the relevant attributes
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute(
      "alt",
      `Portrait of ${prophet.name} ${prophet.lastname}`
    );
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");

    // Set Date of Birth and Place of Birth content
    dob.textContent = `Date of Birth: ${prophet.birthdate}`;
    pob.textContent = `Place of Birth: ${prophet.death}`;

    // Append the section(card) with the created elements
    card.appendChild(fullName); //fill in the blank
    card.appendChild(portrait);
    card.appendChild(dob);
    card.appendChild(pob);

    cards.appendChild(card);
  });
};
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  //   console.table(data.prophets);
  displayProphets(data.prophets);
}

getProphetData();
