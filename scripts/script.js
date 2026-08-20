import { Brother } from "./classes.js";
import { updateInstructionalText } from "./instructional-text.js";
import { units } from "./units.js";

// Steps
// Player 1 chooses team, then units, then locations
// Player 2 chooses units, then locations

let teamSelector = document.querySelector(".js_team-selector");
let unitSelector = document.querySelector(".js_unit-select");
let teamBtns = document.querySelectorAll(".js_team-btn");
let cards = document.querySelectorAll(".js_card-select");
let confirmUnitsBtn = document.querySelector(".js_confirm-units");
let locationSelector = document.querySelector(".js_location-select");
let arena = document.querySelector(".js_arena");
let confirmLocationsBtn = document.querySelector(".js_confirm-locations");
let activePlayer = "Player 1";

let playerOneObject = {
    name: "Player 1",
    team: "",
    unitsSelected: 0,
    units: [],
    ammo: []
}

let playerTwoObject = {
    name: "Player 2",
    team: "",
    unitsSelected: 0,
    units: [],
    ammo: []
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

// CHOOSE TEAM START

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

// CHOOSE TEAM END
// CHOOSE UNITS START

function pickUnits() {
    unitSelector.classList.remove("hidden");
    let playerObject;

    if (activePlayer === "Player 1") {
        playerObject = playerOneObject;
    } else {
        playerObject = playerTwoObject;
    }

    if (playerObject.team === "Bandits") {
        document.querySelector(".unit-select__law").classList.remove("unit-select__law--visible");
        document.querySelector(".unit-select__bandits").classList.add("unit-select__bandits--visible");
    } else {
        document.querySelector(".unit-select__bandits").classList.remove("unit-select__bandits--visible");
        document.querySelector(".unit-select__law").classList.add("unit-select__law--visible");
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
            if (card.classList.contains('card--selected')) {
                card.classList.remove('card--selected');
                playerTwoObject.unitsSelected--;
            } else if (playerTwoObject.unitsSelected < 4) {
                card.classList.add('card--selected');
                playerTwoObject.unitsSelected++;
            }
            if (playerTwoObject.unitsSelected === 4) {
                confirmUnitsBtn.disabled = false;
            }
            if (playerTwoObject.unitsSelected !== 4) {
                confirmUnitsBtn.disabled = true;
            }
        }
    });
});

confirmUnitsBtn.addEventListener('click', () => {
    confirmAmmo();
    confirmUnits();
    placeUnits();
    confirmUnitsBtn.disabled = true;
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

function confirmAmmo() {
    let team = "";
    if (activePlayer === "Player 1") {
        team = playerOneObject.team.toLowerCase();
    }
    if (activePlayer === "Player 2") {
        team = playerTwoObject.team.toLowerCase();
    }

    let ammoCards = document.querySelectorAll(`.unit-select__${team} .card:not(.card--selected)`);

    ammoCards.forEach(card => {
        let name = card.dataset.name;

        units.forEach(unit => {
            if (unit.name === name) {
                if (activePlayer === "Player 1") {
                    console.log("Player 1", name);
                    playerOneObject.ammo.push(unit);
                }
                if (activePlayer === "Player 2") {
                    console.log("Player 2", name);
                    playerTwoObject.ammo.push(unit);
                }
            }
        })
    })
}

// CHOOSE UNITS END
// CHOOSE LOCATIONS START

function placeUnits() {
    unitSelector.classList.add("hidden");
    locationSelector.classList.remove("hidden");
    updateInstructionalText("Choose the locations for your units. Up to 2 units can be in the street, up to 2 units can be in the building, and up to 1 unit can be on the roof.");
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
        document.querySelector(".location-select__law").classList.remove("location-select__law--visible");
        document.querySelector(".location-select__bandits").classList.add("location-select__bandits--visible");
    }
    if (teamArray.team === "Law") {
        document.querySelector(".location-select__bandits").classList.remove("location-select__bandits--visible");
        document.querySelector(".location-select__law").classList.add("location-select__law--visible");
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
            document.querySelector(".location-select__bandits").append(newDiv);
        } else {
            document.querySelector(".location-select__law").append(newDiv);
        }
        num++;
    })

    let tempTeam = teamArray.team.toLowerCase();
    addSelectEventLisenters(tempTeam);
}

function addSelectEventLisenters(team) {
    const selects = document.querySelectorAll(`.location-select__${team} .locations-select`);

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
                    updateInstructionalText("Choose the locations for your units. Up to 2 units can be in the street, up to 2 units can be in the building, and up to 1 unit can be on the roof.");
                    confirmLocationsBtn.disabled = true;
                }
            })
        });
    });
}

confirmLocationsBtn.addEventListener('click', () => {
    confirmLocationsBtn.disabled = true;
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

    let selects = document.querySelectorAll(`.location-select .location-select__${team.toLowerCase()} .locations-select`);

    selects.forEach(select => {
        let value = select.value;
        let name = select.dataset.name;

        playerArray.forEach(unit => {
            if (unit.name === name) {
                unit.location = value;
            }
        })
    })

    locationSelector.classList.add("hidden");

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

// CHOOSE LOCATIONS END
// PLACE UNITS START

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
            let myDiv = document.createElement('div');
            myDiv.classList.add("img-container");

            let myImage = document.createElement('img');
            myImage.src = unit.src;
            myImage.alt = '';

            let ammoImage = document.createElement('img');
            ammoImage.classList.add("ammo");
            ammoImage.src = "./img/bandit_card-back.png";
            ammoImage.alt = '';

            myDiv.appendChild(myImage);
            myDiv.appendChild(ammoImage);

            if (unit.location === "Street") {
                street.appendChild(myDiv);
            }
            if (unit.location === "Building") {
                building.appendChild(myDiv);
            }
            if (unit.location === "Roof") {
                roof.appendChild(myDiv);
            }
        })
    }

    if (team === "Law") {
        let street = document.querySelector(".locations-container__law .street");
        let building = document.querySelector(".locations-container__law .building");
        let roof = document.querySelector(".locations-container__law .roof");

        array.forEach(unit => {
            let myDiv = document.createElement('div');
            myDiv.classList.add("img-container");

            let myImage = document.createElement('img');
            myImage.src = unit.src;
            myImage.alt = '';

            let ammoImage = document.createElement('img');
            ammoImage.classList.add("ammo");
            ammoImage.src = "./img/law_card-back.png";
            ammoImage.alt = '';

            myDiv.appendChild(myImage);
            myDiv.appendChild(ammoImage);

            if (unit.location === "Street") {
                street.appendChild(myDiv);
            }
            if (unit.location === "Building") {
                building.appendChild(myDiv);
            }
            if (unit.location === "Roof") {
                roof.appendChild(myDiv);
            }
        })
    }
}

// PLACE UNITS END
// BEGIN DUEL START

function beginFight() {
    activePlayer = determineFirstPlayer();
    updateInstructionalText("Get ready for a duel!");

    console.log(playerOneObject);
    console.log(playerTwoObject);
}

function determineFirstPlayer() {
    let isMysteriousStrangerInPlay = false;

    playerOneObject.units.forEach(unit => {
        if (unit.name === "Mysterious Stranger") {
            isMysteriousStrangerInPlay = true;
        }
    });

    playerTwoObject.units.forEach(unit => {
        if (unit.name === "Mysterious Stranger") {
            isMysteriousStrangerInPlay = true;
        }
    });

    if (isMysteriousStrangerInPlay) {
        console.log("Mysterious Stranger is in play. Law goes first.");
        if (playerOneObject.team === "Bandits") {
            activePlayer = "Player 2";
            console.log("Player 2 goes first.");
        } else {
            activePlayer = "Player 1";
            console.log("Player 1 goes first.");
        }
    } else {
        console.log("Mysterious Stranger is not in play. Bandits goes first.");
        if (playerOneObject.team === "Bandits") {
            activePlayer = "Player 1";
            console.log("Player 1 goes first.");
        } else {
            activePlayer = "Player 2";
            console.log("Player 2 goes first.");
        }
    }
};

function takeTurn() {

}

init();