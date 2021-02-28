/** Feature to unlock the puzzles for the new page */
var unlockPuzzles = 0;

function readyPuzzles(){
    arrowsUnlocked = true;
    alert("What? There is no lock on this page?\n\nAt Travel Agency we believe in exploring. Try heading North, South, more South, West, then North again. There you will find the key to the next page.\n\nRemember, to see this message again just type in all 10's!");
}

document.addEventListener("keydown", function(e){
    var y = e.key;
        switch (y) {
        case "1":
            if (unlockPuzzles == 0 || unlockPuzzles == 2 || unlockPuzzles == 4) {
                unlockPuzzles += 1;
            }
            break;
        case "0":
            if (unlockPuzzles == 1 || unlockPuzzles == 3) {
                unlockPuzzles += 1;
            }
            if (unlockPuzzles == 5) {
                readyPuzzles();
            }
            break;
        default:
            unlockPuzzles = 0;
            break;
    }
});


/**ArrowKey Puzzle */
var solveArrows = 0;
var arrowsUnlocked = false;

function solveAboutUs() {
    alert("You solved the About Us page!");
    alert("Unlock the next page by typing '1820'.");
}

document.addEventListener("keydown", function(e){
    var z = e.key;
    if (arrowsUnlocked){
        switch (z) {
        case "ArrowUp":
            if (solveArrows == 0) {
                solveArrows += 1;
            }
            if (solveArrows == 4){
                solveAboutUs();
            }
            break;
        case "ArrowLeft":
            if (solveArrows == 3) {
                solveArrows += 1;
            }
            break;
        case "ArrowDown":
            if (solveArrows == 1 || solveArrows == 2) {
                solveArrows += 1;
            }
            break;
        default:
            solveArrows = 0;
            break;
        }
    }});

/** The "Give Up" feature */
var unlockAll = 0;

function autoSolve(){
    alert("Because you gave up, \nI unlocked everything for you."); // displays cheat message.
    revealHomeLock()  // unlocks HomePage comboLock
}

document.addEventListener("keydown", function(e){
    var x = e.key;
        switch (x) {
        case "i":
            if (unlockAll == 0 || unlockAll == 2) {
                unlockAll += 1;
            }
            break;
        case "g":
            if (unlockAll == 1) {
                unlockAll += 1;
            }
            break;
        case "v":
            if (unlockAll == 3) {
                unlockAll += 1;
            }
            break;
        case "e":
            if (unlockAll == 4) {
                unlockAll += 1;
            }
            break;
        case "u":
            if (unlockAll == 5) {
                unlockAll += 1;
            }
            break;
        case "p":
            if (unlockAll == 6) {
                autoSolve();
            }
            break;
        default:
            unlockAll = 0;
            break;
    }
});