const { askQuestion } = require("../Common/CommonFunctions");
// const { PrisonerService } = require("../Services/PrisonerService");
const lookUpPrisonerMenu = require("./LookUpPrisonerMenu");
const mainMenu = require("./MainMenu");

module.exports = async function prisonerMenu() {
    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Look Up a Prisoner");
        console.log("[2] Add New Prisoner");
        console.log("[3] Go Back")
        console.log("[4] Exit");
        let answer = await askQuestion("Please select an option from above: ");
        console.log();
        switch (answer) {
            case "1":
                await lookUpPrisonerMenu()
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
                PrisonerService.addPrisoner(prisoner);
                console.log("");
                console.table(prisoner)
                console.log("New Prisoner has been added")
                console.log("");
                break;
            case "3":
                //go back
                await mainMenu()
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