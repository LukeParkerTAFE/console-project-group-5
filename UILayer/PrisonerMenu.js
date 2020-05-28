const { askQuestion } = require ("../Common/CommonFunctions")

module.exports = async function PrisonerMenu() {
    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Look Up a Prisoner");
        console.log("[2]")
        console.log("[3] Guard Menu");
        console.log("[4] Exit");
        let answer = await askQuestion("Please select an option from above: ");
        console.log();
        switch (answer) {
            case "1":
                await prisonMenu()
                break;
            case "2":
                await guardMenu()
                break;
            case "3":
                shouldLoop = false;
                break;
            default:
                console.log("Please enter a number between 1 and 3");
                console.log();
                break;
        }
    }
    console.log("Thank you for using the Wentworth Prison Services.");
}