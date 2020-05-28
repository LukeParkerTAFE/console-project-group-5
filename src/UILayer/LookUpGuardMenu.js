const { askQuestion } = require("../Common/CommonFunctions");
const guardMenu = require("./GuardMenu");
// const { GuardService } = require("../Services/")

module.exports = async function lookUpGuardMenu() {
    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Search by Name if unsure of Guard ID");
        console.log("[2] Enter Guard ID");
        console.log("[3] Go Back")
        console.log("[4] Exit");
        let answer = await askQuestion("Please select an option from above: ");
        console.log();
        switch (answer) {
            case "1":
                //search for guards
                let searchTerm = await askQuestion("Please enter Guard Name: ");
                let matchingGuards = GuardService.searchByName(searchTerm);
                console.table(matchingGuards, ["firstName", "lastName", "age", "id"]);
                break;
            case "2":
                //use ID
                let guardId = await askQuestion("Please enter Guard ID: ");
                let guard = GuardService.getGuard(guardId);
                console.log("you have selected the following Guard")
                console.table(guard, ["firstName", "lastName", "age"]);
                console.log("[1] List Assigned Prisoners");
                console.log("[2] Update Guard Information");
                console.log("[3] Dismiss Guard");
                console.log("[4] Exit");
                let option = await askQuestion("Please select an option from above: ");
                switch (option) {
                    case "2":
                        //check assigned prisoners
                        let prisoners = GuardService.getPrisoners(guardId);
                        console.log(`${guard.firstName} ${guard.lastName} is in charge of the following prisoners: `)
                        console.table(prisoners ["firstName", "lastName", "id"])
                        break;
                    case "3":
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
                            GuardId
                        );
                        GuardService.updateGuard(updatedGuard);
                        console.log("");
                        console.log(updatedGuard)
                        console.log("this is the updated Guard Information");
                        console.log("");
                        break;
                    case "4":
                        //delete guard
                        console.table(guard, ["firstName", "lastName", "age"]);
                        GuardService.deleteGuard(guard);
                        console.log("This Guard has now been fired. Final paycheck will be posted next week");
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
                await guardMenu()
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