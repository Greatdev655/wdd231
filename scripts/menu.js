const hamburger = document.getElementById("nav-btn");
const mainNav = document.getElementById("nav-bar");

if (hamburger && mainNav) {                       // guard: only run if both elements exist
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("show");
        mainNav.classList.toggle("show");
        const isExpanded = mainNav.classList.contains("show");
        hamburger.setAttribute("aria-expanded", isExpanded);
    });
} else {
    console.warn("Nav elements not found — check IDs 'nav-btn' and 'nav-bar'");
}

