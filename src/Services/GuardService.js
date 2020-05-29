module.exports = class GuardService {
    constructor(guardDataReader, prisonerDataReader) {
        this.guardDataReader = guardDataReader;
        this.prisonerDataReader = prisonerDataReader;
    }

    getGuard(id) {
        return this.guardDataReader.getGuard(id);
    }
    getGuardCheck(id) {
        let guard = this.getGuard(id);
        if (!guard) {
            console.log("Error: No Matching Guard Found");
        } else {
            return this.guardDataReader.getGuard(id);

        }
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
        this.guardDataReader.updateGuard(guard);

        // if (!dataGuard) {
        //     console.log("Error: No Matching Guard Found");
        // } else if (this.validateGuard(guard)) {
        // } else {
        //     console.log("Error: Guard object was invalid");
        // }
    }

    hireNewGuard(numberOfGuards) {
        let guards = this.guardDataReader.getRandomGuard(numberOfGuards)
        console.log(guards)
        this.guardDataReader.hireNewGuard(guards)
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
        let guard = this.prisonerDataReader.getPrisoner(id);
        if (guard) {
            return true;
        } else {
            return false;
        }
    }

    // validateGuard(guard) {
    //     if (!this.doesGuardExist(guard.prisonerId)) {
    //         console.log("Error: Could not find matching Guard for given guardId")
    //         return false;
    //     }
    //     if (isNaN(guard.age)) {
    //         return false;
    //     }
    //     return true;
    // }
}