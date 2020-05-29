const path = require("path")
const { askQuestion } = require("../Common/CommonFunctions");
const lookUpGuardMenu = require("./LookUpGuardMenu");
const { PrisonerService, GuardService } = require("../Services")
const { PrisonerDataReader, GuardDataReader } = require("../DataLayer")
const _prisonerDataReader = new PrisonerDataReader(path.join(__dirname, "../../JSONData/Prisoners.json"))
const _guardDataReader = new GuardDataReader(path.join(__dirname, "../../JSONData/Guards.json"))
const _prisonerService = new PrisonerService(_prisonerDataReader, _guardDataReader)
const _guardService = new GuardService(_guardDataReader, _prisonerDataReader)

module.exports = async function guardMenu() {
    let shouldLoop = true;
    while (shouldLoop) {
        console.log();
        console.log("GUARD MENU");
        console.log();
        console.log("[1] Look Up a Guard");
        console.log("[2] Hire New Guard(s)");
        console.log("[3] Go Back");
        let answer = await askQuestion("Please select an option from above: ");
        console.log();
        switch (answer) {
            case "1":
                await lookUpGuardMenu()
                break;
            case "2":
                //add new guard code
                let numberofGuards = await askQuestion("How Many New Guards do you want to hire: ");
                _guardService.hireNewGuard(numberofGuards);
                console.log("");
                console.log("New Guard(s) has been added")
                console.log("");
                break;
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
    return true;
}