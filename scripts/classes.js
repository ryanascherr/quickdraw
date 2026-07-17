
class Card {
    constructor(name, ammoValue, team, attackAmmo) {
        this.name = name;
        this.ammoValue = ammoValue;
        this.team = team;
        this.attackAmmo = attackAmmo;
        this.isDamaged = false;
        this.isOnRoof = false;
        this.isInBuilding = false;
        this.isInStreet = false;
    }
    takeDamage() {
        console.log(this.name + " takes damage!")
    }
    attack() {
        let target = this.chooseTarget();
        let ammoNeeded = this.attackAmmo;
        let isTargetInBuilding = false;

        if (!this.isOnRoof) {
            isTargetInBuilding = this.checkTargetLocation(target);
            if (target.isInBuilding) {
                ammoNeeded++;
            }
        }

        console.log(this.name + " needs " + ammoNeeded + " to hit " + target + ".");
    }
    chooseTarget() {
        console.log(this.name + " must choose a target.");
        let target = "Bobby";
        return target;
    }
    checkTargetLocation(target) {
        if (target.isInBuilding) {
            return true;
        } else {
            return false;
        }
    }
}

export class Brother extends Card {
    // attack() {
    //     console.log("attacking!");
    // }
}