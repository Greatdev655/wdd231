const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json"
const cards = document.getElementById("cards");

async function getProphetData(){
   try{
        const response = await fetch(url);
        const data = await response.json();
        // console.table(data);
        displayProphets(data.prophets);
   } catch(error){
    console.error("error fetching data:", error)

   }

}
getProphetData();


const displayProphets = (prophets) =>{
    prophets.forEach((prophet) => {
        const card = document.createElement("section");
        const fullName = document.createElement("h2");
        const portrait = document.createElement("img");
        const birthDate = document.createElement("p");
        const birthPlace = document.createElement("p");
        
        fullName.innerHTML = `${prophet.name} ${prophet.lastName}`
        birthDate.innerHTML = `Birth Date: ${prophet.birthdate}`
        birthPlace.innerHTML = `Birth Place: ${prophet.birthplace}`
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `portrait of ${prophet.fullName}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width","340");
        portrait.setAttribute("height", "440");

        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        // append card to the main cards 

        cards.appendChild(card)

        
    });
}

