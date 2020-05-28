const { askQuestion } = require ("../Common/CommonFunctions")
// const { GuardService } = require("../Services/GuardService")
const lookUpGuardMenu = require("./LookUpGuardMenu");
const mainMenu = require("./MainMenu");

module.exports = async function guardMenu() {
    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Look Up a Guard");
        console.log("[2] Hire New Guard(s)");
        console.log("[3] Go Back")
        console.log("[4] Exit");
        let answer = await askQuestion("Please select an option from above: ");
        console.log();
        switch (answer) {
            case "1":
                await lookUpGuardMenu()
                break;
            case "2":
                //add new guard code
                let numberofGuards = await askQuestion("How Many New Guards do you want to hire: ");
                guardService.hireNewGuard(numberofGuards);
                console.log("");
                console.log("New Guard(s) has been added")
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