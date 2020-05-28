const mainMenu = require("./UILayer/MainMenu")

async function Program(){
    // Your Code Goes Here...
    await mainMenu()
}    // Your Code DOES NOT Go Past Here...

Program().then(() => {
    process.exit(0);
});
