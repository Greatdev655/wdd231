const hamburger = document.getElementById("nav-btn");
const mainNav = document.getElementById("nav-bar");
const dialog = document.getElementById("courseInfo");
const dialogTittle = document.getElementById("courseTitle");
const dialogDescription = document.getElementById("courseDescription");
const closeBtn = document.getElementById("closeDialog");

const course1 = document.getElementById("course1");
const course2 = document.getElementById("course2");
const course3 = document.getElementById("course3");

course1.addEventListener("click", ()=>{
    dialog.show();

    displaycourse1();
})

course2.addEventListener("click", ()=>{
    dialog.show();

    displaycourse2();
})

course3.addEventListener("click", ()=>{
    dialog.show();

    displaycourse3();
})


function displaycourse1(){
    dialogTittle.innerHTML = `WDD130`;
    dialogDescription.textContent = "learnt about the basic foundations of frontend development!"
}

function displaycourse2(){
    dialogTittle.innerHTML = `WDD131`;
    dialogDescription.textContent = "Going deeper in  frontend development!"
}

function displaycourse3(){
    dialogTittle.innerHTML = `WDD231`;
    dialogDescription.textContent = "learning and mastering the core point of JS in frontend development"
}

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

closeBtn.addEventListener("click", ()=>{
    dialog.close();
})

