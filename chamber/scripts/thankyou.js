document.addEventListener("DOMContentLoaded", () => {

    // Read URL parameters
    const params = new URLSearchParams(window.location.search);

    // Display each value
    document.getElementById("display-firstName").textContent = params.get("firstName");
    document.getElementById("display-lastName").textContent = params.get("lastName");
    document.getElementById("display-email").textContent = params.get("email");
    document.getElementById("display-phone").textContent = params.get("phone");
    document.getElementById("display-businessName").textContent = params.get("businessName");
    document.getElementById("display-timestamp").textContent = params.get("timestamp");

    // Footer year
    document.getElementById("currentYear").textContent = new Date().getFullYear();

});