const path = require("path");
const { askQuestion } = require("../Common/CommonFunctions");
const lookUpPrisonerMenu = require("./LookUpPrisonerMenu");
const { PrisonerService, GuardService } = require("../Services")
const { PrisonerDataReader, GuardDataReader } = require("../DataLayer")
const _prisonerDataReader = new PrisonerDataReader(path.join(__dirname, "../../JSONData/Prisoners.json"))
const _guardDataReader = new GuardDataReader(path.join(__dirname, "../../JSONData/Guards.json"))
const _prisonerService = new PrisonerService(_prisonerDataReader, _guardDataReader)
const _guardService = new GuardService(_guardDataReader, _prisonerDataReader)

module.exports = async function prisonerMenu() {
    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Look Up a Prisoner");
        console.log("[2] Add New Prisoner");
        console.log("[3] Go Back");
        console.log("[4] Exit")
        let answer = await askQuestion("Please select an option from above: ");
        console.log();
        switch (answer) {
            case "1":
                shouldLoop = await lookUpPrisonerMenu()
                break;
            case "2":
                //add new prisoner code
                let prisonerFirstName = await askQuestion("Enter Prisoner First Name: ");
                let prisonerLastName = await askQuestion("Enter Prisoner Last Name: ");
                let prisonerAge = await askQuestion("Enter Prisoner Age: ");
                let parsedPrisonerAge = parseInt(prisonerAge);
                let crimes = await askQuestion("Enter Crimes (separated with a comma): ");
                let parsedCrimes = crimes.split(",");
                let newPrisoner = new Prisoner(
                    prisonerFirstName,
                    prisonerLastName,
                    parsedPrisonerAge,
                    parsedCrimes,
                    guardId,
                );
                _prisonerService.addPrisoner(newPrisoner);
                console.log("");
                console.table(prisoner)
                console.log("New Prisoner has been added")
                console.log("");
                break;
            case "3":
                //go back
                shouldLoop = false;
                break;
            case "4":
                //hard exit
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