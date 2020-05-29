const uuid = require("uuid")
const fs = require("fs")
const path = require("path")
const PRISONERS_FILE_PATH = (path.join(__dirname, "../../JSONData/Prisoners.json"));
const { getRandomGivenName, getRandomLastName, getRandomCrimes, getRandomNumber } = require("../Common/Random");

class Prisoner {
    constructor(firstName, lastName, age, crimes, prisonWing, id = uuid.v4()) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.crimes = crimes;
        this.id = id
    }

    static generateRandomPrisoners(numberOfPrisoners) {
        let randomPrisoners = [];
        for (let i = 0; i < numberOfPrisoners; i++) {
            // Generate a random person
            let randomPrisoner = new Prisoner(
                getRandomGivenName(),
                getRandomLastName(),
                getRandomNumber(90) + 18,
                this.generateRandomCrimes(),
            );
            randomPrisoners.push(randomPrisoner);
        }
        return randomPrisoners;
    }

    static generateRandomCrimes() {
        let numberofCrimes = getRandomNumber(5)+1;
        let crimes = [];
        for (let i = 0; i < numberofCrimes; i++) {
            crimes.push(getRandomCrimes());
        }
        let filteredCrimes = [...new Set(crimes)];
    
        return filteredCrimes;
    }
}

// let prisoners = Prisoner.generateRandomPrisoners(200)
// fs.writeFileSync(PRISONERS_FILE_PATH, JSON.stringify(prisoners))

module.exports = Prisoner;