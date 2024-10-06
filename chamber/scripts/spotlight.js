// Document ready event
document.addEventListener("DOMContentLoaded", async () => {
  const spotlightMembersContainer =
    document.getElementById("spotlight-members");

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
  } catch (error) {
    console.error("Error loading members:", error);
    spotlightMembersContainer.innerHTML =
      "<p>Error loading member information. Please try again later.</p>";
  }
});
