const { askQuestion } = require("../Common/CommonFunctions");
const prisonerMenu = require("./PrisonerMenu");
// const { PrisonerService, GuardService } = require("../Services/")

module.exports = async function lookUpPrisonerMenu() {
    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Search by Name if unsure of Prisoner ID");
        console.log("[2] Enter Prisoner ID");
        console.log("[3] Go Back")
        console.log("[4] Exit");
        let answer = await askQuestion("Please select an option from above: ");
        console.log();
        switch (answer) {
            case "1":
                //search for prisoners
                let searchTerm = await askQuestion("Please enter Prisoner Name: ");
                let matchingPrisoners = PrisonerService.searchByName(searchTerm);
                console.table(matchingPrisoners, ["firstName", "lastName", "age", "id"]);
                break;
            case "2":
                //use ID
                let prisonerId = await askQuestion("Please enter Prisoner ID: ");
                let prisoner = PrisonerService.getPrisoner(prisonerId);
                console.log("you have selected the following prisoner")
                console.table(prisoner, ["firstName", "lastName", "age"]);
                console.log("[1] Check Crimes");
                console.log("[2] Look Up Supervising Guard");
                console.log("[3] Update Prisoner Information");
                console.log("[4] Remove Prisoner");
                console.log("[5] Exit");
                let option = await askQuestion("Please select an option from above: ");
                switch (option) {
                    case "1":
                        //check crimes
                        console.log(`${prisoner.firstName} ${prisoner.lastName} has commited the following crimes: `)
                        console.table(prisoner, ["crimes"]);
                        break;
                    case "2":
                        //check supervising guard
                        let supervisingGuard = GuardService.getGuard(prisoner.guardId);
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
                        PrisonerService.updatePrisoner(updatedPrisoner);
                        console.log("");
                        console.log(updatedPrisoner)
                        console.log("this is the updated Prisoner Information");
                        console.log("");
                        break;
                    case "4":
                        //delete prisoner
                        console.table(prisoner, ["firstName", "lastName", "age", "crimes"]);
                        PrisonerService.deletePrisoner(prisoner);
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
                await prisonerMenu()
                break;
            case "4":
                //exit
                shouldLoop = false;
            default:
                //wrong selection
                console.log("Please enter a valid option");
                console.log();
                break;
        }
    }
}