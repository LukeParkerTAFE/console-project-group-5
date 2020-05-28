module.exports = class GuardService {
    constructor(guardDataReader, prisonerDataReader) {
        this.guardDataReader = guardDataReader;
        this.prisonerDataReader = prisonerDataReader;
    }

    getGuard(id) {
        return this.guardDataReader.getGuard(id);
    }

    deleteGuard(id) {
        let guard = this.getGuard(id);
        if (!guard) {
            console.log("Error: No Matching Guard Found");
        } else {
            this.guardDataReader.deleteGuard(id);
        }
    }

    updateGuard(guard) {
        let dataGuard = this.getGuard(guard.id);
        if (!dataGuard) {
            console.log("Error: No Matching Guard Found");
        } else if (this.validateGuard(guard)) {
            this.guardDataReader.updateGuard(guard);
        } else {
            console.log("Error: Guard object was invalid");
        }
    }

    addGuard(guard) {
        let dataGuard = this.getGuard(guard.id);
        if (dataGuard) {
            console.log("Error: Guard Already Found With id: " + guard.id);
        } else if (this.validateGuard(guard)) {
            this.guardDataReader.addGuard(guard);
        } else {
            console.log("Error: Guard object was invalid");
        }
    }

    searchByName(searchTerm) {
        let guardData = this.guardDataReader.getArrayFromFile();
        let matchingNames = [];
        for (let i = 0; i < guardData.length; i++) {
            const guard = guardData[i];
            let guardFullName = `${guard.firstName} ${guard.lastName}`.toLowerCase();
            if (guardFullName.includes(searchTerm.toLowerCase())) {
                matchingNames.push(guard);
            }
        }
        return matchingNames;
    }

    doesGuardExist(id) {
        let prisoner = this.prisonerDataReader.getPrisoner(id);
        if (guard) {
            return true;
        } else {
            return false;
        }
    }

    validatePrisoner(guard) {
        if (!this.doesGuardExist(guard.prisonerId)) {
            console.log("Error: Could not find matching Guard for given guardId")
            return false;
        }
        if (isNaN(guard.age)) {
            return false;
        }
        return true;
    }
}