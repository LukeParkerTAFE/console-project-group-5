const path = require("path")
const { askQuestion } = require("../Common/CommonFunctions");
const Guard = require("../Model/Guards")
const { PrisonerService, GuardService } = require("../Services")
const { PrisonerDataReader, GuardDataReader } = require("../DataLayer")
const _prisonerDataReader = new PrisonerDataReader(path.join(__dirname, "../../JSONData/Prisoners.json"))
const _guardDataReader = new GuardDataReader(path.join(__dirname, "../../JSONData/Guards.json"))
const _prisonerService = new PrisonerService(_prisonerDataReader, _guardDataReader)
const _guardService = new GuardService(_guardDataReader, _prisonerDataReader)
const { getRandomGivenName, getRandomLastName, getRandomNumber } = require("../Common/Random");

module.exports = async function lookUpGuardMenu() {
    let shouldLoop = true;
    while (shouldLoop) {
        console.log();
        console.log("GUARD LOOKUP")
        console.log();
        console.log("[1] Search by Name if unsure of Guard ID");
        console.log("[2] Enter Guard ID");
        console.log("[3] Go Back");
        let answer = await askQuestion("Please select an option from above: ");
        console.log();
        switch (answer) {
            case "1":
                //search for guards
                let searchTerm = await askQuestion("Please enter Guard Name: ");
                let matchingGuards = _guardService.searchByName(searchTerm);
                console.table(matchingGuards, ["firstName", "lastName", "age", "id"]);
                break;
            case "2":
                //use ID
                let guardId = await askQuestion("Please enter Guard ID: ");
                let guard = _guardService.getGuard(guardId);
                if (guard === undefined) {
                    shouldLoop = false;
                    break;
                }
                console.log("you have selected the following Guard")
                console.table(guard);
                console.log("[1] Update Guard Information");
                console.log("[2] Dismiss Guard");
                console.log("[3] Return to Look Up Menu");
                let option = await askQuestion("Please select an option from above: ");
                switch (option) {
                    case "1":
                        //update information
                        console.log(guard);
                        console.log("");
                        console.log("Please enter new details: ")
                        let updatedGuardFirstName = await askQuestion("Enter Guard First Name: ");
                        let updatedGuardLastName = await askQuestion("Enter Guard Last Name: ");
                        let updatedGuardAge = await askQuestion("Enter Guard Age: ");
                        let parsedUpdatedGuardAge = parseInt(updatedGuardAge);
                        let updatedGuard = new Guard(
                            updatedGuardFirstName,
                            updatedGuardLastName,
                            parsedUpdatedGuardAge,
                            guard.id
                        );
                        _guardService.updateGuard(updatedGuard);
                        console.log("");
                        console.log(updatedGuard)
                        console.log("this is the updated Guard Information");
                        console.log("");
                        break;
                    case "2":
                        //delete guard
                        console.table(guard);
                        _guardService.deleteGuard(guardId);
                        console.log("This Guard has now been fired. Final paycheck will be posted next week.");
                        console.log("");
                        break;
                    case "3":
                        //return
                        shouldLoop = false;
                        break;
                    default:
                        //wrong selection
                        console.log("Please enter a valid option");
                        console.log();
                        break;
                }
            case "3":
                //go back
                shouldLoop = false;
                break;
            default:
                //wrong selection
                console.log("Please enter a valid option");
                console.log();
                break;
        }
    }
}