import { Brother } from "./classes.js";
import { updateInstructionalText } from "./instructional-text.js";
import { units } from "./units.js";

// Steps
// Player 1 chooses team, then units, then locations
// Player 2 chooses units, then locations

let instructionalText = document.querySelector(".js_instructional-text");
let teamSelector = document.querySelector(".js_team-selector");
let cardHolder = document.querySelector(".js_card-holder");
let teamBtns = document.querySelectorAll(".js_team-btn");
let cards = document.querySelectorAll(".js_card-select");
let confirmUnitsBtn = document.querySelector(".js_confirm-units");
let mainStreet = document.querySelector(".js_main-street");
let arena = document.querySelector(".js_arena");
let confirmLocationsBtn = document.querySelector(".js_confirm-locations");

let playerOneTeam = "";
let playerOneUnitsSelected = 0;
let playerTwoTeam = "";
let playerTwoUnitsSelected = 0;
let playerOneTeamArray = [];
let isPlayerOneSetup = true;
let isPlayerTwoSetup = false;
let activePlayer = "Player 1";

let playerOneObject = {
    name: "Player 1",
    team: "",
    unitsSelected: 0,
    units: []
}

let playerTwoObject = {
    name: "Player 2",
    team: "",
    unitsSelected: 0,
    units: []
}

// let brother = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_brother.png");
// let bruiser = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_bruiser.png");
// let captainBlythe = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_captain-blythe.png");
// let crazyCarl = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_crazy-carl.png");
// let danOMite = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_dan-o-mite.png");
// let sister = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_sister.png");
// let snake = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_snake.png");
// let sniper = new Brother("Brother", 3, "Bandit", 5, "./img/bandit_sniper.png");

// let bandits = [brother, bruiser, captainBlythe, crazyCarl, danOMite, sister, snake, sniper];

// console.log(brother);
// brother.takeDamage();
// brother.attack();

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
        if (team === "Bandits") {
            playerOneObject.team = team;
            playerTwoObject.team = "Law";
        }
        if (team === "Law") {
            playerOneObject.team = team;
            playerTwoObject.team = "Bandits";
        }
        
        console.log("Player 1's team is: " + playerOneObject.team + ".");
        console.log("Player 2's team is: " + playerTwoObject.team + ".");

        teamSelector.classList.add("hidden");
        
        pickUnits();
    });
});

function pickUnits() {
    cardHolder.classList.remove("hidden");
    let playerObject;

    if (activePlayer === "Player 1") {
        playerObject = playerOneObject;
    } else {
        playerObject = playerTwoObject;
    }

    if (playerObject.team === "Bandits") {
        cardHolder.classList.remove("law");
        cardHolder.classList.add("bandits");
    } else {
        cardHolder.classList.remove("bandits");
        cardHolder.classList.add("law");
    }
    updateInstructionalText(playerObject.name + ": Choose the 4 units you want to deploy The other 4 will be used for their Ammo Value.");
}

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (activePlayer === "Player 1") {
            if (card.classList.contains('card--selected')) {
                card.classList.remove('card--selected');
                playerOneObject.unitsSelected--;
            } else if (playerOneObject.unitsSelected < 4) {
                card.classList.add('card--selected');
                playerOneObject.unitsSelected++;
            }
            if (playerOneObject.unitsSelected === 4) {
                confirmUnitsBtn.disabled = false;
            }
            if (playerOneObject.unitsSelected !== 4) {
                confirmUnitsBtn.disabled = true;
            }
        }
        if (activePlayer === "Player 2") {
            console.log("here we go!");
            console.log(playerTwoObject.unitsSelected);
            if (card.classList.contains('card--selected')) {
                card.classList.remove('card--selected');
                playerTwoObject.unitsSelected--;
                console.log("subtracting!");
                console.log(playerTwoObject.unitsSelected);
            } else if (playerTwoObject.unitsSelected < 4) {
                card.classList.add('card--selected');
                playerTwoObject.unitsSelected++;
                console.log("adding! less than ");
                console.log(playerTwoObject.unitsSelected);
            }
            if (playerTwoObject.unitsSelected === 4) {
                confirmUnitsBtn.disabled = false;
                console.log("4!");
                console.log(playerTwoObject.unitsSelected);
            }
            if (playerTwoObject.unitsSelected !== 4) {
                confirmUnitsBtn.disabled = true;
                console.log("not 4");
                console.log(playerTwoObject.unitsSelected);
            }
        }
    });
});

confirmUnitsBtn.addEventListener('click', () => {
    confirmUnits();
    placeUnits();
})

function confirmUnits() {
    let deployedCards = document.querySelectorAll(".card--selected");

    deployedCards.forEach(card => {
        let name = card.dataset.name;

        units.forEach(unit => {
            if (unit.name === name) {
                if (activePlayer === "Player 1") {
                    console.log("Player 1", name);
                    playerOneObject.units.push(unit);
                }
                if (activePlayer === "Player 2") {
                    console.log("Player 2", name);
                    playerTwoObject.units.push(unit);
                }
            }
        })
    })

    cards.forEach(card => {
        card.classList.remove("card--selected");
    });
}

function placeUnits() {
    cardHolder.classList.add("hidden");
    mainStreet.classList.remove("hidden");
    updateInstructionalText("Choose the locations for your units.");
    let num = 0;
    let player = "";

    let teamArray = [];
    if (activePlayer === "Player 1") {
        teamArray = playerOneObject;
        player = "player-1";
    }
    if (activePlayer === "Player 2") {
        teamArray = playerTwoObject;
        player = "player-2";
    }

    if (teamArray.team === "Bandits") {
        mainStreet.classList.remove("law");
        mainStreet.classList.add("bandits");
    }
    if (teamArray.team === "Law") {
        mainStreet.classList.remove("bandits");
        mainStreet.classList.add("law");
    }
    
    let units = teamArray.units
    units.forEach(unit => {
        let newDiv = document.createElement('div');

        newDiv.innerHTML = `
            <img src="${unit.src}">
            <label class="sr-only" for="locations-${num}-${player}">${unit.name} location</label>
            <select class="locations-select" name="locations-${num}-${player}" id="locations-${num}-${player}" data-name="${unit.name}">
                <option value="Choose" selected>Choose an option</option>
                <option value="Street">Street</option>
                <option value="Building">Building</option>
                <option value="Roof">Roof</option>
            </select>
        `;

        newDiv.classList.add("locations-img-select-holder")

        if (unit.team === "Bandits") {
            document.querySelector(".main-street .bandits-location-container").append(newDiv);
        } else {
            document.querySelector(".main-street .law-location-container").append(newDiv);
        }
        num++;
    })

    let tempTeam = teamArray.team.toLowerCase();
    addSelectEventLisenters(tempTeam);
}

function addSelectEventLisenters(team) {
    const selects = document.querySelectorAll(`.main-street .${team}-location-container .locations-select`);

    let streetNumber = 0;
    let buildingNumber = 0;
    let roofNumber = 0;

    selects.forEach(select => {
        select.addEventListener('change', () => {
            let allValues = Array.from(selects).map(s => s.value);

            streetNumber = 0;
            buildingNumber = 0;
            roofNumber = 0;

            allValues.forEach(value => {
                if (value === "Street") {
                    streetNumber++;
                }
                if (value === "Building") {
                    buildingNumber++;
                }
                if (value === "Roof") {
                    roofNumber++;
                }
            
                if (streetNumber >= 3) {
                    updateInstructionalText("You can't have more than 2 units in the Street.");
                    confirmLocationsBtn.disabled = true;
                } else if (buildingNumber >= 3) {
                    updateInstructionalText("You can't have more than 2 units in the Building.");
                    confirmLocationsBtn.disabled = true;
                } else if (roofNumber >= 2) {
                    updateInstructionalText("You can't have more than 1 unit on the Roof.");
                    confirmLocationsBtn.disabled = true;
                } else if ((streetNumber + buildingNumber + roofNumber) === 4) {
                    confirmLocationsBtn.disabled = false;
                    updateInstructionalText("Looking good! Choose confirm when ready.");
                } else {
                    updateInstructionalText("Choose the locations for your units.");
                    confirmLocationsBtn.disabled = true;
                }
            })
        });
    });
}

confirmLocationsBtn.addEventListener('click', () => {
    let playerArray = [];
    let team = "";

    if (activePlayer === "Player 1") {
        team = playerOneObject.team;
        playerArray = playerOneObject.units;
    }
    if (activePlayer === "Player 2") {
        team = playerTwoObject.team;
        playerArray = playerTwoObject.units;
    }

    console.log(playerArray);

    let selects = document.querySelectorAll(`.main-street .${team.toLowerCase()}-location-container .locations-select`);

    selects.forEach(select => {
        let value = select.value;
        let name = select.dataset.name;

        playerArray.forEach(unit => {
            if (unit.name === name) {
                unit.location = value;
            }
        })
    })

    mainStreet.classList.add("hidden");

    if (activePlayer === "Player 1") {
        activePlayer = "Player 2";
        pickUnits();
    } else {
        arena.classList.remove("hidden");
        placeInLocations("Player 1");
        placeInLocations("Player 2");
        beginFight();
    }
})

function placeInLocations(player) {
    let team = "";
    let array = [];
    if (player === "Player 1") {
        team = playerOneObject.team;
        array = playerOneObject.units;
    }
    if (player === "Player 2") {
        team = playerTwoObject.team;
        array = playerTwoObject.units;
    }

    if (team === "Bandits") {
        let street = document.querySelector(".locations-container__bandits .street");
        let building = document.querySelector(".locations-container__bandits .building");
        let roof = document.querySelector(".locations-container__bandits .roof");

        array.forEach(unit => {
            let myImage = document.createElement('img');
            myImage.src = unit.src;
            myImage.alt = '';

            if (unit.location === "Street") {
                street.appendChild(myImage);
            }
            if (unit.location === "Building") {
                building.appendChild(myImage);
            }
            if (unit.location === "Roof") {
                roof.appendChild(myImage);
            }
        })
    }

    if (team === "Law") {
        let street = document.querySelector(".locations-container__law .street");
        let building = document.querySelector(".locations-container__law .building");
        let roof = document.querySelector(".locations-container__law .roof");

        array.forEach(unit => {
            let myImage = document.createElement('img');
            myImage.src = unit.src;
            myImage.alt = '';

            if (unit.location === "Street") {
                street.appendChild(myImage);
            }
            if (unit.location === "Building") {
                building.appendChild(myImage);
            }
            if (unit.location === "Roof") {
                roof.appendChild(myImage);
            }
        })
    }
}

function beginFight() {
    activePlayer = determineFirstPlayer();
    updateInstructionalText("Get ready for a duel!");
}

function determineFirstPlayer() {
    return "Player 1";
};

function takeTurn() {

}

init();