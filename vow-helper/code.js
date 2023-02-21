/**
 * Keep track of symbol names
 */
let symbol1, symbol2, symbol3;

/**
 * Link symbol images to their names names
 */
const images = new Map([
    ['pyramid', 'url(./Images/pyramid.png)'],
    ['give', 'url(./Images/give.png)'],
    ['darkness', 'url(./Images/darkness.png)'],
    ['traveler', 'url(./Images/traveler.png)'],
    ['worship', 'url(./Images/worship.png)'],
    ['light', 'url(./Images/light.png)'],
    ['stop', 'url(./Images/stop.png)'],
    ['guardian', 'url(./Images/guardian.png)'],
    ['kill', 'url(./Images/kill.png)']
]);

/**
 * Link symbol descriptions to their names
 */
const descriptions = new Map([
    ['pyramid', 'Drop down after you have seen your symbols. Once down, turn back and you will see the door with the button to the left'],
    ['give', 'Right after the lore room (the one with all the symbols, that gives you the lore pieces). Go out the normal way and you should see the door across the next room with the button above'],
    ['darkness', 'Go into the first encounter and look left. Between the "paws" of the statue is the button. The door is on the wall right next to it'],
    ['traveler', 'In the room just before the Caretaker (second encounter). Instead of going into the encounter, go up the wall to the ledge where the statues are. Behind the middle one is the button.'],
    ['worship', 'In the same room you end Caretaker\'s encounter, on the left is the button and on the right, the door'],
    ['light', 'In the first room of enemies of the jump puzzle. Look up left and you should see the button. The door is on the same wall nearby'],
    ['stop', 'Right after the second secret chest. Drop down and tunr back. The button should be in the corner. the door is to the left of the button'],
    ['guardian', 'After the third encounter, take the left path and go outside (around the wall) to the button. Then go back to the stairs, the door is behind the pillar above them'],
    ['kill', 'In the climb to the last encounter. When you get to the final floor, look behind and up and you sould see the button. The door is in the floor you are on, in one of the sides']
]);

/**
 * Array with the symbols in order of appearence in the raid
 */
const symbolOrder = [
    'pyramid',
    'give',
    'darkness',
    'traveler',
    'worship',
    'light',
    'stop',
    'guardian',
    'kill'
];

/**
 * Set the symbol clicked to the first empty symbol slot in the left
 * @param {String} symbolName Name of the clicked symbol
 * @returns void
 */
function setSymbol(symbolName) {
    // If all 3 are set, do nothing
    if (symbol1 && symbol2 && symbol3)
        return;

    // If the symbol clicked is arleady selected, do nothing
    if (symbol1 == symbolName ||
         symbol2 == symbolName ||
         symbol3 == symbolName)
        return;

    // Check the first selected symbol, if it is empty, set it
    // If the first symbol is set, check the second
    // If both previous are set, check the third
    if (!symbol1) {
        symbol1 = symbolName; // Set the name of the first symbol
        var pillarSymbol = document.getElementById("pillar-symbol-1"); // Get the element with Id pillar-symbol-1
        pillarSymbol.style.backgroundImage = images.get(symbolName); // Set the background image to the selected symbol
        pillarSymbol.style.cursor = "pointer"; // Change the cursor to pointer
        pillarSymbol.onclick = function() {clearSymbol(1);}; // Set the onclick function to {clearSymbol()}
    }
    else if (!symbol2) {
        symbol2 = symbolName; // Set the name of the second symbol
        var pillarSymbol = document.getElementById("pillar-symbol-2"); // Get the element with Id pillar-symbol-2
        pillarSymbol.style.backgroundImage = images.get(symbolName); // Set the background image to the selected symbol
        pillarSymbol.style.cursor = "pointer"; // Change the cursor to pointer
        pillarSymbol.onclick = function() {clearSymbol(2);}; // Set the onclick function to {clearSymbol()}
    }
    else if (!symbol3) {
        symbol3 = symbolName; // Set the name of the third symbol
        var pillarSymbol = document.getElementById("pillar-symbol-3"); // Get the element with Id pillar-symbol-3
        pillarSymbol.style.backgroundImage = images.get(symbolName); // Set the background image to the selected symbol
        pillarSymbol.style.cursor = "pointer"; // Change the cursor to pointer
        pillarSymbol.onclick = function() {clearSymbol(3);}; // Set the onclick function to {clearSymbol()}
    }

    // If all three symbols are selected, enable the "next" button
    if (symbol1 && symbol2 && symbol3)
        document.getElementById("next").classList.remove("disabled");
}

/**
 * Clear the selected symbol from the clicked slot
 * @param {number} Id Number representing the slot clicked
 */
function clearSymbol(Id) {
    // Clear the name of the clicked symbol
    if (Id == 1) {
        symbol1 = null;
    }
    else if (Id == 2) {
        symbol2 = null;
    }
    else if (Id == 3) {
        symbol3 = null;
    }

    var pillarSymbol = document.getElementById("pillar-symbol-" + Id); // Get the slot
    pillarSymbol.style.backgroundImage = "url(./Images/blank.png)"; // Change the background image to the blank symbol
    pillarSymbol.style.cursor = "default"; // Set the cursor on hover to default
    pillarSymbol.onclick = null; // Clear the onclick function

    document.getElementById("next").classList.add("disabled"); // Disable the "next" button
}

/**
 * Show the locations of the selected symbols
 * @returns 
 */
function showInfo() {
    // If any of the slots is empty, do nothing
    if (!symbol1 || !symbol2 || !symbol3)
        return;

    const selection = document.querySelector(".selection.container"); // Get the symbols container
    const info = document.querySelector(".info.container"); // Get the info container
    selection.classList.remove("current"); // Remove from the symbols the class "current" that makes it be active and centered
    selection.classList.add("before"); // Add to the symbols the class "before" that makes it disappear to the left
    info.classList.remove("after"); // Remove from the info the class "after" that makes it be hidden to the right
    info.classList.add("current"); // Add to the info the class "current" that makes it be active and centered
    document.getElementById("next").hidden = true; // Hide the "next" button
    document.getElementById("reset").classList.remove("disabled"); // Show the "reset" button
    document.getElementById("step1").classList.remove("disabled"); // Enable the step 1 selector
    document.getElementById("step2").classList.add("disabled"); // Disable step 2 selector

    // Loop to re-order the selected symbols
    // This makes the info to always appear in the order it is supposed to
    var count = 0; // Iteration counter
    for (var index in symbolOrder) {
        var symbol = symbolOrder[index]; // Get next symbol name in the list
        // If symbol in array matches any selected, set the info to the first empty panel
        if (symbol == symbol1 ||
            symbol == symbol2 ||
            symbol == symbol3) {
            count++; // Up the counter
            document.querySelector(".info-" + count + " .image").style.backgroundImage = images.get(symbol); // Set the background image to the symbol image
            document.querySelector(".info-" + count + " .info-wrapper .title h3").innerText = symbol.substring(0, 1).toUpperCase() + symbol.substring(1); // Set the title of the panel to the symbol's name
            document.querySelector(".info-" + count + " .info-wrapper .desc span").innerText = descriptions.get(symbol); // Set the description of the symbol
            if (count >= 3) break; // Once three symbols have been set up, exit the loop
        }
    }
}

/**
 * Check a symbol as triggered
 * @param {number} Id Id of the symbol to check in the info panel
 */
function checkSymbol(Id) {

    var descToHide = document.querySelector(".info-" + Id + " .desc");
    var title = document.querySelector(".info-" + Id + " .title"); 

    descToHide.classList.add("fade-out");
    title.classList.add("disabled");
    title.onclick = function() {uncheckSymbol(Id);};
}

/**
 * Unckecks a symbol
 * @param {number} Id Id of the symbol to unckeck in the info panel
 */
function uncheckSymbol(Id) {
    var descToHide = document.querySelector(".info-" + Id + " .desc");
    var title = document.querySelector(".info-" + Id + " .title");

    descToHide.classList.remove("fade-out");
    title.classList.remove("disabled");
    title.onclick = function() {checkSymbol(Id);};
}

/**
 * Return to the selection panel
 */
function showSymbolSelection() {
    const selection = document.querySelector(".selection.container"); // Get the symbols container
    const info = document.querySelector(".info.container"); // Get the info container
    selection.classList.add("current"); // Remove from the symbols the class "current" that makes it be active and centered
    selection.classList.remove("before"); // Add to the symbols the class "before" that makes it disappear to the left
    info.classList.add("after"); // Remove from the info the class "after" that makes it be hidden to the right
    info.classList.remove("current"); // Add to the info the class "current" that makes it be active and centered
    document.getElementById("next").hidden = false; // Hide the "next" button
    document.getElementById("reset").classList.add("disabled"); // Show the "reset" button
    document.getElementById("step1").classList.add("disabled"); // Enable the step 1 selector
    document.getElementById("step2").classList.remove("disabled"); // Disable step 2 selector
}

/**
 * Clears all symbol selections and returns to the selection panel
 */
function reset() {
    clearSymbol(1);
    clearSymbol(2);
    clearSymbol(3);
    uncheckSymbol(1);
    uncheckSymbol(2);
    uncheckSymbol(3);
    showSymbolSelection();
}