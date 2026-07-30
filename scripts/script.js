import { Brother } from "./classes.js";
import { updateInstructionalText } from "./instructional-text.js";
import { units } from "./units.js";

let instructionalText = document.querySelector(".js_instructional-text");
let teamSelector = document.querySelector(".js_team-selector");
let cardHolder = document.querySelector(".js_card-holder");
let teamBtns = document.querySelectorAll(".js_team-btn");
let cards = document.querySelectorAll(".js_card-select");
let confirmUnitsBtn = document.querySelector(".js_confirm-units");
let mainStreet = document.querySelector(".js_main-street");
let confirmLocationsBtn = document.querySelector(".js_confirm-locations");

let playerOneTeam = "";
let playerOneUnitsSelected = 0;
let playerTwoTeam = "";
let playerTwoUnitsSelected = 0;
let playerOneTeamArray = [];

let brother = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_brother.png");
let bruiser = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_bruiser.png");
let captainBlythe = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_captain-blythe.png");
let crazyCarl = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_crazy-carl.png");
let danOMite = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_dan-o-mite.png");
let sister = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_sister.png");
let snake = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_snake.png");
let sniper = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_sniper.png");

let bandits = [brother, bruiser, captainBlythe, crazyCarl, danOMite, sister, snake, sniper];

console.log(brother);
brother.takeDamage();
brother.attack();

function init() {
    playerOneChooseTeam();
}

function playerOneChooseTeam() {
    updateInstructionalText("Player 1: Choose your team.");
    teamSelector.classList.remove("hidden");
}

teamBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let team = btn.dataset.team;
        if (team === "bandit") {
            playerOneTeam = team;
            playerTwoTeam = "law";
        }
        if (team === "law") {
            playerOneTeam = team;
            playerTwoTeam = "bandit";
        }
        
        console.log("Player 1's team is: " + playerOneTeam + ".");
        console.log("Player 2's team is: " + playerTwoTeam + ".");

        teamSelector.classList.add("hidden");
        
        playerOnePickUnits();
    });
});

function playerOnePickUnits() {
    cardHolder.classList.remove("hidden");
    updateInstructionalText("Player 1: Choose the 4 units you want to deploy.");
}

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('card--selected')) {
            card.classList.remove('card--selected');
            playerOneUnitsSelected--;
        } else if (playerOneUnitsSelected < 4) {
            card.classList.add('card--selected');
            playerOneUnitsSelected++;
        }
        if (playerOneUnitsSelected === 4) {
            confirmUnitsBtn.disabled = false;
        }
        if (playerOneUnitsSelected !== 4) {
            confirmUnitsBtn.disabled = true;
        }
    });
});

confirmUnitsBtn.addEventListener('click', () => {
    confirmUnits();
    placeUnits("Player 1", playerOneTeamArray);
})

function confirmUnits() {
    let deployedCards = document.querySelectorAll(".card--selected");

    deployedCards.forEach(card => {
        let name = card.dataset.name;

        units.forEach(unit => {
            if (unit.name === name) {
                playerOneTeamArray.push(unit);
            }
        })

        // playerOneTeamArray.push(name);
    })

    console.log(playerOneTeamArray);
}

function placeUnits(player, teamArray) {
    cardHolder.classList.add("hidden");
    mainStreet.classList.remove("hidden");
    updateInstructionalText("Choose the locations for your units.");
    let num = 0;

    teamArray.forEach(unit => {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <img src="${unit.src}">
            <div class="location-selection-container">
                <input type="radio" id="roof-${num}" name="location-${num}" value="Roof" data-name="${unit.name}">
                <label for="roof-${num}">Roof</label><br>

                <input type="radio" id="building-${num}" name="location-${num}" value="Building" data-name="${unit.name}">
                <label for="building-${num}">Building</label><br>

                <input type="radio" id="street-${num}" name="location-${num}" value="Street" data-name="${unit.name}">
                <label for="street-${num}">Street</label>
            </div>
        `

        document.querySelector(".main-street .bandit-holder").prepend(newDiv)
        num++;

        // let newImg = document.createElement('img');
        // newImg.src = unit.src;
        // newImg.classList.add("card");

        // mainStreet.appendChild(newImg);

        // units.forEach(unit => {
        //     if (unit.name === unitName) {
        //         let src = unit.src;
        //         let newImg = document.createElement('img');
        //         newImg.src = src;
        //         newImg.classList.add("card");

        //         mainStreet.appendChild(newImg);
        //     }
        // })
    })
}

confirmLocationsBtn.addEventListener('click', () => {
    // 1. Select all checked radio buttons
    let checkedRadios = document.querySelectorAll('input[type="radio"]:checked');
    if (checkedRadios.length < 4) return;
    checkedRadios.forEach(radio => {
        let unitName = radio.getAttribute('data-name');
        let location = radio.getAttribute('value');
        
        playerOneTeamArray.forEach(unit => {
            if (unit.name === unitName) {
                unit.location = location;
            }
        })
    })

    console.log(playerOneTeamArray);
})

init();