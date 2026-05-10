const currentYear = document.getElementById("current-year");
const modifiedDate = document.getElementById("lastModified");

const today =  new Date();

modifiedDate.innerHTML = today.getFullYear()

currentYear.innerHTML = today.getFullYear();

const lastModified = new Date(document.lastModified);

modifiedDate.innerHTML = lastModified.toDateString();