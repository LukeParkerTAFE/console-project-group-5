const { writeFileSync, readFileSync } = require("fs");
const  Guards  = require("../Model/Guards");

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

    writeArrayToFile() {
        writeFileSync(this.fileName, JSON.stringify(arrayValue));
    }

    getGuard(id) {
        return this.getArrayFromFile().find(g => g.id = id);
    }

    updatePrisoner(guard) {
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

    addGuard(guard) {
        this.writeArrayToFile(this.getArrayFromFile().concat([guard]));
    }

    // WARNING: THIS WILL OVERRIDE ANY DATA CURRENTLY IN THE "Students.json" FILE
    // generateRandomGuard(id) {
    //     this.writeArrayToFile(Guard.generateRandomGuard(200, id));
    // } // Not finished


}