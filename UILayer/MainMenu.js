const { askQuestion } = require ("../Common/CommonFunctions")

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