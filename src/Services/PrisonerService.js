module.exports = class PrisonerService {
    constructor(prisonerDataReader, guardDataReader) {
        this.prisonerDataReader = prisonerDataReader;
        this.guardDataReader = guardDataReader;
    }

    getPrisoner(id) {
        return this.prisonerDataReader.getPrisoner(id);
    }

    deletePrisoner(id) {
        let prisoner = this.getPrisoner(id);
        if (!prisoner) {
            console.log("Error: No Matching Prisoner Found");
        } else {
            this.prisonerDataReader.deletePrisoner(id);
        }
    }

    updatePrisoner(prisoner) {
        let dataPrisoner = this.getPrisoner(prisoner.id);
        if (!dataPrisoner) {
            console.log("Error: No Matching Prisoner Found");
        } else if (this.validatePrisoner(prisoner)) {
            this.prisonerDataReader.updatePrisoner(prisoner);
        } else {
            console.log("Error: Prisoner object was invalid");
        }
    }

    addPrisoner(prisoner) {
        let dataPrisoner = this.getPrisoner(prisoner.id);
        if (dataPrisoner) {
            console.log("Error: Prisoner Already Found With id: " + prisoner.id);
        } else if (this.validatePrisoner(prisoner)) {
            this.prisonerDataReader.addPrisoner(prisoner);
        } else {
            console.log("Error: Prisoner object was invalid");
        }
    }

    searchByName(searchTerm) {
        let prisonerData = this.prisonerDataReader.getArrayFromFile();
        let matchingNames = [];
        for (let i = 0; i < prisonerData.length; i++) {
            const prisoner = prisonerData[i];
            let prisonerFullName = `${prisoner.firstName} ${prisoner.lastName}`.toLowerCase();
            if (prisonerFullName.includes(searchTerm.toLowerCase())) {
                matchingNames.push(prisoner);
            }
        }
        return matchingNames;
    }

    doesGuardExist(id) {
        let guard = this.guardDataReader.getGuard(id);
        if (guard) {
            return true;
        } else {
            return false;
        }
    }

    validatePrisoner(prisoner) {
        if (!this.doesGuardExist(prisoner.guardId)) {
            console.log("Error: Could not find matching Guard for given guardId")
            return false;
        }
        if (isNaN(prisoner.age)) {
            return false;
        }
        return true;
    }
}
