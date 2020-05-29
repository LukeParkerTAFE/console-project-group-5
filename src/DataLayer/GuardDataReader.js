const { writeFileSync, readFileSync } = require("fs");
const  Guard  = require("../Model/Guards");
const { getRandomGivenName, getRandomLastName, getRandomNumber } = require("../Common/Random");


module.exports = class GuardDataReader {
    constructor(fileName) {
        this.fileName = fileName
    }

    getArrayFromFile() {
        return JSON.parse(readFileSync(this.fileName).toString()).map(guardRaw => new Guard(
            guardRaw.firstName,
            guardRaw.lastName,
            guardRaw.age,
            guardRaw.id
        ));
    }

    writeArrayToFile(arrayValue) {
        writeFileSync(this.fileName, JSON.stringify(arrayValue));
    }

    getGuard(id) {
        return this.getArrayFromFile().find(g => g.id == id);
    }

    updateGuard(guard) {
        this.writeArrayToFile(this.getArrayFromFile().map(g => {
            if (g.id == guard.id) {
                return guard;
            } else {
                return g;
            }
        }));
    }

    deleteGuard(id) {
        this.writeArrayToFile(this.getArrayFromFile().filter(g => g.id != id));
    }

    hireNewGuard(guards) {
        this.writeArrayToFile(this.getArrayFromFile().concat([guards]));
    }

     getRandomGuard(numberOfGuards){
       return Guard.getRandomGuard(numberOfGuards)
    }
}