const path = require("path")
const { askQuestion } = require("../Common/CommonFunctions");
const { PrisonerService, GuardService } = require("../Services")
const { PrisonerDataReader, GuardDataReader } = require("../DataLayer")
const _prisonerDataReader = new PrisonerDataReader(path.join(__dirname, "../../JSONData/Prisoners.json"))
const _guardDataReader = new GuardDataReader(path.join(__dirname, "../../JSONData/Guards.json"))
const _prisonerService = new PrisonerService(_prisonerDataReader, _guardDataReader)
const _guardService = new GuardService(_guardDataReader, _prisonerDataReader)


module.exports = async function lookUpPrisonerMenu() {
    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Search by Name if unsure of Prisoner ID");
        console.log("[2] Enter Prisoner ID");
        console.log("[3] Go Back")
        console.log("[3] Exit");
        let answer = await askQuestion("Please select an option from above: ");
        console.log();
        switch (answer) {
            case "1":
                //search for prisoners
                let searchTerm = await askQuestion("Please enter Prisoner Name: ");
                let matchingPrisoners = _prisonerService.searchByName(searchTerm);
                console.table(matchingPrisoners, ["firstName", "lastName", "age", "id"]);
                break;
            case "2":
                //use ID
                let prisonerId = await askQuestion("Please enter Prisoner ID: ");
                // let prisoner = _prisonerService.getPrisoner(prisonerId);
                console.log("you have selected the following prisoner")
                console.log(_prisonerService.getPrisoner(prisonerId))
                // console.table(prisoner, ["firstName", "lastName", "age"]);
                console.log("[1] Check Crimes");
                console.log("[2] Look Up Supervising Guard");
                console.log("[3] Update Prisoner Information");
                console.log("[4] Remove Prisoner");
                console.log("[5] Go Back to Prisoner Menu");
                let option = await askQuestion("Please select an option from above: ");
                switch (option) {
                    case "1":
                        //check crimes
                        console.log(`${prisoner.firstName} ${prisoner.lastName} has commited the following crimes: `)
                        console.table(prisoner, ["crimes"]);
                        break;
                    case "2":
                        //check supervising guard
                        let supervisingGuard = _guardService.getGuard(prisoner.guardId);
                        console.log(`The guard that is supervising ${prisoner.firstName} ${prisoner.lastName} is:`);
                        console.table(supervisingGuard, ["firstName", "lastName", "age"]);
                        break;
                    case "3":
                        //update information
                        console.log(prisoner);
                        console.log("");
                        console.log("Please enter new details: ")
                        let updatedPrisonerFirstName = await askQuestion("Enter Prisoner First Name: ");
                        let updatedPrisonerLastName = await askQuestion("Enter Prisoner Last Name: ");
                        let updatedPrisonerAge = await askQuestion("Enter Prisoner Age: ");
                        let parsedUpdatedPrisonerAge = parseInt(updatedPrisonerAge);
                        let updatedCrimes = await askQuestion("Enter Crimes (separated with a comma): ");
                        let parsedUpdatedCrimes = updatedCrimes.split(",");
                        let updatedPrisoner = new Prisoner(
                            updatedPrisonerFirstName,
                            updatedPrisonerLastName,
                            parsedUpdatedPrisonerAge,
                            parsedUpdatedCrimes,
                            guardId,
                            PrisonerId
                        );
                        _prisonerService.updatePrisoner(updatedPrisoner);
                        console.log("");
                        console.log(updatedPrisoner)
                        console.log("this is the updated Prisoner Information");
                        console.log("");
                        break;
                    case "4":
                        //delete prisoner
                        console.table(prisoner, ["firstName", "lastName", "age", "crimes"]);
                        _prisonerService.deletePrisoner(prisoner);
                        console.log("This Prisoner is now marked as deceased or released");
                        console.log("");
                        break;
                    case "5":
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
            case "4":
                //hardexit
                return false;
            default:
                //wrong selection
                console.log("Please enter a valid option");
                console.log();
                break;
        }
    }
    return true;
}