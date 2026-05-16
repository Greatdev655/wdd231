document.addEventListener('DOMContentLoaded', () => {
    const currentYear = document.getElementById("currentyear");
    const modifiedDate = document.getElementById("lastModified");

    const today = new Date();
    currentYear.innerHTML = today.getFullYear();
    const lastModified = new Date(document.lastModified);
    modifiedDate.innerHTML = lastModified.toDateString();

    // hamburger & nav menu 

    const nav = document.querySelector("nav ul");
    const hambugger = document.getElementById("menu-btn");
    const icon = hambugger.querySelector("i");

    hambugger.addEventListener("click", () => {
        nav.classList.toggle("open");
        if (icon.classList.contains("fa-bars")) {

            icon.classList.replace("fa-bars", "fa-xmark")
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }
    });

    displayMembers = (members) => {
        const container = document.getElementById("directory-container");
        container.innerHTML = '';

        members.forEach((member) => {
            const card = document.createElement("div");

            let badgeClass;
            let badgeLabel;
            let cardClass;

            if (member.membershipLevel === 3) {
                badgeClass = 'badge badge-gold';
                badgeLabel = 'Gold Member';
                cardClass = 'gold-card';
            } else if (member.membershipLevel === 2) {
                badgeClass = 'badge badge-silver';
                badgeLabel = 'Silver Member';
                cardClass = 'silver-card';
            } else {
                badgeClass = 'badge badge-member';
                badgeLabel = 'Member';
                cardClass = 'member-card';
            }

            card.classList.add('card', cardClass);

            card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <span class="${badgeClass}">${badgeLabel}</span>
        `;

            container.appendChild(card);
        });
    }

    const gridBtn = document.getElementById("grid-btn");
    const listBtn = document.getElementById("list-btn");
    const directoryContainer = document.getElementById("directory-container");

    gridBtn.addEventListener("click", () => {
        directoryContainer.classList.remove("list");
        directoryContainer.classList.add("grid");
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener("click", () => {
        directoryContainer.classList.remove("grid");
        directoryContainer.classList.add("list");
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });

    // fetch data using fetch API

    async function getMembersData() {
        try {
            const response = await fetch("data/members.json");
            const data = await response.json();
            // console.table(data);
            displayMembers(data.members);
        } catch (error) {
            console.error("error fetching data:", error)

        }

    }
    getMembersData();



});