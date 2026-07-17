import { Brother } from "./classes.js";

let instructionalText = document.querySelector(".js_instructional-text");
let teamSelector = document.querySelector(".js_team-selector");
let cardHolder = document.querySelector(".js_card-holder");
let teamBtns = document.querySelectorAll(".js_team-btn");
let cards = document.querySelectorAll(".js_card-select");

let playerOneTeam = "";
let playerOneUnitsSelected = 0;
let playerTwoTeam = "";
let playerTwoUnitsSelected = 0;

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
    instructionalText.textContent = "Player 1: Choose your team.";
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
    instructionalText.textContent = "Player 1: Choose the 4 units you want to deploy.";
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
        
        let confirmUnitsBtn = document.querySelector(".js_confirm-units");
        if (playerOneUnitsSelected === 4) {
            confirmUnitsBtn.disabled = false;
        }
        if (playerOneUnitsSelected !== 4) {
            confirmUnitsBtn.disabled = true;
        }
    });
});

init();