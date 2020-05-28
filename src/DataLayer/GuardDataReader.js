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

    
}