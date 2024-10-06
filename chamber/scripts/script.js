// Last modified
document.getElementById("last-modified").innerText = document.lastModified;

// hamburger button
document.getElementById("hamburger").addEventListener("click", function () {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", async () => {
  const businessCardsContainer = document.getElementById("business-cards");
  const spotlightMembersContainer =
    document.getElementById("spotlight-members");
  const gridButton = document.getElementById("grid");
  const listButton = document.getElementById("list");

  try {
    const response = await fetch("./data/members.json");
    const members = await response.json();

    // Silver (membershipLevel 2) 및 Gold (membershipLevel 3) 레벨의 멤버만 필터링
    const spotlightMembers = members.filter(
      (member) => member.membershipLevel === 2 || member.membershipLevel === 3
    );

    // 랜덤으로 2~3명의 멤버를 선택
    const getRandomMembers = (members, count) => {
      const shuffled = members.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    // 2 또는 3명의 랜덤 멤버를 선택
    const selectedSpotlightMembers = getRandomMembers(
      spotlightMembers,
      Math.floor(Math.random() * 2) + 2
    );

    // 각 스팟라이트 멤버 카드 생성
    selectedSpotlightMembers.forEach((member) => {
      const spotlightCard = document.createElement("div");
      spotlightCard.classList.add("spotlight-card");
      spotlightCard.innerHTML = `
        <h3>${member.name}</h3>
        <img src="./images/${member.image}" alt="${member.name} Logo" />
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${
          member.website
        }" target="_blank">${member.website}</a></p>
        <p><strong>Membership Level:</strong> ${
          member.membershipLevel === 2 ? "Silver" : "Gold"
        }</p>
      `;
      spotlightMembersContainer.appendChild(spotlightCard);
    });

    // Function to create a card for each member
    const createBusinessCard = (member) => {
      const card = document.createElement("div");
      card.classList.add("business-card");
      card.innerHTML = `
                <h2>${member.name}</h2>
                <p class="business-tag">${member.description}</p>
                <img src="./images/${member.image}" alt="${member.name}" />
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
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
