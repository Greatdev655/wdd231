const spotlightSection = document.getElementById("spotlight-section");
const spotlightContainer = document.getElementById("spotlight-container");

async function fetchSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        const eligible = data.members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
        const shuffled = shuffle(eligible);
        const selected = shuffled.slice(0, 3);
        displaySpotlights(selected);
    } catch (error) {
        console.error("Error fetching spotlight data:", error);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displaySpotlights(members) {
    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";

    members.forEach(member => {
        const level = member.membershipLevel === 3 ? "Gold" : "Silver";
        
        const card = document.createElement("div");
        card.classList.add("spotlight-card");
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p><i class="fa-solid fa-location-dot"></i> ${member.address}</p>
            <p><i class="fa-solid fa-phone"></i>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-level ${level.toLowerCase()}">${level} Member</p>
        `;
        container.appendChild(card);
    });
}

fetchSpotlights();