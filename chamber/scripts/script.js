// Last modified
document.getElementById("last-modified").innerText = document.lastModified;

// hamburger button
document.getElementById("hamburger").addEventListener("click", function () {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", async () => {
  const businessCardsContainer = document.getElementById("business-cards");
  const gridButton = document.getElementById("grid");
  const listButton = document.getElementById("list");

  try {
    const response = await fetch("./data/members.json");
    const members = await response.json();

    // Function to create a card for each member
    const createBusinessCard = (member) => {
      const card = document.createElement("div");
      card.classList.add("business-card");
      card.innerHTML = `
                <h2>${member.name}</h2>
                <p class="business-tag">${member.description}</p>
                <img src="./images/${member.image}" alt="${member.name}" />
                <p><strong>Email:</strong> <a href="mailto:info@${
                  member.website.split("//")[1]
                }">${member.website.split("//")[1]}</a></p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>URL:</strong> <a href="${
                  member.website
                }" target="_blank">${member.website}</a></p>
            `;
      return card;
    };

    // Function to display members in grid or list view
    const displayMembers = (view) => {
      businessCardsContainer.innerHTML = ""; // Clear existing content
      members.forEach((member) => {
        const card = createBusinessCard(member);
        businessCardsContainer.appendChild(card);
      });

      if (view === "list") {
        businessCardsContainer.classList.add("list-view");
        businessCardsContainer.classList.remove("grid-view");
      } else {
        businessCardsContainer.classList.add("grid-view");
        businessCardsContainer.classList.remove("list-view");
      }
    };

    // Initial display in grid view
    displayMembers("grid");

    // Event listeners for view toggle buttons
    gridButton.addEventListener("click", () => displayMembers("grid"));
    listButton.addEventListener("click", () => displayMembers("list"));
  } catch (error) {
    console.error("Error loading members:", error);
    businessCardsContainer.innerHTML =
      "<p>Error loading member information. Please try again later.</p>";
  }
});
