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

