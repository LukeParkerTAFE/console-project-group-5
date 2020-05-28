const { askQuestion } = require ("../Common/CommonFunctions");
const prisonerMenu = require("./PrisonerMenu");
const guardMenu = require("./GuardMenu");

module.exports = async function mainMenu() {
    console.log("Welcome to Wentworth Prison Services.")
    let shouldLoop = true;
    while (shouldLoop) {
        console.log("MAIN MENU");
        console.log("[1] Prisoner Menu");
        console.log("[2] Guard Menu");
        console.log("[3] Exit");
        let answer = await askQuestion("Please select an option from above: ");
        console.log();
        switch (answer) {
            case "1":
                //prisoner
                await prisonerMenu()
                break;
            case "2":
                //guard
                await guardMenu()
                break;
            case "3":
                //exit
                shouldLoop = false;
                break;
            default:
                //wrong selection
                console.log("Please enter a valid option");
                console.log();
                break;
        }
    }
    console.log("Thank you for using the Wentworth Prison Services.");
}