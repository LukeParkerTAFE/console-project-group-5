const { writeFileSync, readFileSync } = require("fs");
const  Prisoner  = require("../Model/Prisoner");

module.exports = class PrisonerDataReader {
    constructor(fileName) {
        this.fileName = fileName;
    }

    getArrayFromFile() {
        return JSON.parse(readFileSync(this.fileName).toString()).map(prisonerRaw => new Prisoner(
            prisonerRaw.firstName,
            prisonerRaw.lastName,
            prisonerRaw.age,
            prisonerRaw.crimes,
            prisonerRaw.id,
        ));
    }

    writeArrayToFile(arrayValue) {
        writeFileSync(this.fileName, JSON.stringify(arrayValue));
    }

    getPrisoner(id) {
        return this.getArrayFromFile().find(p => p.id == id);
    }

    updatePrisoner(prisoner) {
        this.writeArrayToFile(this.getArrayFromFile().map(p => {
            if (p.id == prisoner.id) {
                return prisoner;
            } else {
                return p;
            }
        }));
    }

    deletePrisoner(id) {
        this.writeArrayToFile(this.getArrayFromFile().filter(p => p.id != id));
    }

    addPrisoner(prisoner) {
        this.writeArrayToFile(this.getArrayFromFile().concat([prisoner]));
    }

    // WARNING: THIS WILL OVERRIDE ANY DATA CURRENTLY IN THE "Students.json" FILE
    // generateRandomPrisoner(id) {
    //     this.writeArrayToFile(Student.generateRandomPrisoners(200, id));
    // }
    // Not finished

    
}
