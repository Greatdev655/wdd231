import { membershipData } from "./membership_data.mjs";

document.addEventListener("DOMContentLoaded", () => {

    // NAVIGATION
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

    



    // MEMBERSHIP CARDS
    const displayMembers = (members) => {
        

        const container = document.querySelector(".membership_container");

        container.innerHTML = "";

        members.forEach(member => {

            const card = document.createElement("div");

            card.classList.add("membership-card");

            card.innerHTML = `
                <h2>${member.name}</h2>

                <p class="membership-level ${member.level.toLowerCase()}">
                    ${member.level} Member
                </p>

                <p>${member.price}</p>

                <p>${member.description}</p>

                <button class="modalBtn"  data-level="${member.level}">
                    See Benefits
                </button>
            `;

            container.appendChild(card);

            card.querySelector(".modalBtn").addEventListener("click", () => {
                const modal = document.getElementById(`${member.level.toLowerCase()}-modal`);
                if (modal) {
                    modal.showModal();
                } else {
                    console.error(`Modal with id ${member.level.toLowerCase()}-modal not found.`);
                }


            });

            const closeButtons = document.querySelectorAll(".close-modal");

            closeButtons.forEach(button => {
                button.addEventListener("click", () => {
                    const modal = button.closest("dialog");
                    if (modal) {
                        modal.close();
                    }
                });
            });

        });

        
    };

    displayMembers(membershipData);

   

});