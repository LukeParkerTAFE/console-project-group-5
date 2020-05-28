const uuid = require("uuid");
const { writeFileSync, readFileSync } = require("fs");
const path = require("path");
const GUARDS_FILE_PATH = (path.join(__dirname, "../../JSONDATA/Guards.json"));
console.log(GUARDS_FILE_PATH)
const { getRandomGivenName, getRandomLastName, getRandomNumber } = require("../Common/Random");

class Guard {
    constructor(firstName, lastName, age, id = uuid.v4()) {
        this.firstName = firstName, 
        this.lastName = lastName,
        this.age = age,
        this.id = id
    }

    static getRandomGuard(numberOfGuards) {
        let randomGuards = [];
        for (let i = 0; i < numberOfGuards; i++) {
            // Generate random guard
            let randomGuard = new Guard(
                getRandomGivenName(),
                getRandomLastName(),
                getRandomNumber(71) + 18
            );
            randomGuards.push(randomGuard);
        }
        return randomGuards
    }
}

let guards = Guard.getRandomGuard(30)

writeFileSync(GUARDS_FILE_PATH, JSON.stringify(guards));
