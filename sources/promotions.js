

/** The List Puzzle */
var listContents = [
    "I like to eat as much as I can when I'm on vacation. Those calories don't count!", // 0
    "Don't bring your kids. If you have to bring them, establish clear ground rules.", // 1
    "If you don't want to go anywhere, stay at home and play boardgames.", // 2
    "Vacation? Just code. Keep coding.", // 3
    "Spend lots of money. This is our unbiased opinion.", // 4
    "Do you ever feel like most of this text is just filler?", // 5
    "Just. Make. The. Most. Of. It.", // 6
    "The letters 'M', 'T', 'W', 'R', and 'F' all correspond to a day of the week.", // 7 (Clue)
    "It can be hard to find those 'treasured' moments during the work week. But if you search hard enough you can find them! ", // 8 (Clue)
    "Remember when looking for treasure, a big yellow 'x' marks the spot.", // 9 (Clue)
    "Try marking the calendar. How should you mark it?", // 10 (Clue)
]

var listItems = document.getElementsByClassName("listPuzzle");
var listShuffle = 0;
var shuffleLock = false;

function initList() {
    for (var i=0; i < 8; i++) {
    listItems[i].textContent = listContents[i]
    }
}

function shuffleList(){
    listShuffle += 1;
    if (listShuffle > 3){
        listShuffle = 0;
    }
    switch(listShuffle){
        case 0:
            initList();
            break;
        case 1:
            listItems[0].textContent = listContents[4]
            listItems[1].textContent = listContents[8]
            listItems[2].textContent = listContents[6]
            listItems[3].textContent = listContents[2]
            listItems[4].textContent = listContents[0]
            listItems[5].textContent = listContents[3]
            listItems[6].textContent = listContents[1]
            listItems[7].textContent = listContents[5]
            break;
        case 2:
            listItems[0].textContent = listContents[6]
            listItems[1].textContent = listContents[5]
            listItems[2].textContent = listContents[3]
            listItems[3].textContent = listContents[1]
            listItems[4].textContent = listContents[9]
            listItems[5].textContent = listContents[2]
            listItems[6].textContent = listContents[4]
            listItems[7].textContent = listContents[0]
            break;
        case 3:
            listItems[0].textContent = listContents[10]
            listItems[1].textContent = listContents[6]
            listItems[2].textContent = listContents[5]
            listItems[3].textContent = listContents[2]
            listItems[4].textContent = listContents[3]
            listItems[5].textContent = listContents[0]
            listItems[6].textContent = listContents[1]
            listItems[7].textContent = listContents[4]
            break;
    }
}

// Fills in list with starting contents.
initList();

/** The Calendar Puzzle */
// retrieves each row in the calendar
var weeks = document.getElementsByClassName("week");

// formats each cell in calendar
for (let i=0; i<weeks.length; i++){
    for (let j=0; j<weeks[i].children.length; j++){
        let day = weeks[i].children[j];
        day.style.border = "1px solid";
        day.style.height = "20px";
        day.style.width = "20px";
        day.style.backgroundColor= "white";
        day.id = i+":"+j;
        day.class = "day";
        day.addEventListener("click", () =>{
            // Changes color of day when clicked on.
            clickDay(day.id);
            // Reveals Calendar's code when days make big yellow "X"
            if (
            document.getElementById("0:0").style.backgroundColor =="yellow" &&
            document.getElementById("0:1").style.backgroundColor =="white" &&
            document.getElementById("0:2").style.backgroundColor =="white" &&
            document.getElementById("0:3").style.backgroundColor =="white" &&
            document.getElementById("0:4").style.backgroundColor =="yellow" &&
            
            document.getElementById("1:0").style.backgroundColor =="white" &&
            document.getElementById("1:1").style.backgroundColor =="yellow" &&
            document.getElementById("1:2").style.backgroundColor =="white" &&
            document.getElementById("1:3").style.backgroundColor =="yellow" &&
            document.getElementById("1:4").style.backgroundColor =="white" &&

            document.getElementById("2:0").style.backgroundColor =="white" &&         
            document.getElementById("2:1").style.backgroundColor =="white" &&
            document.getElementById("2:2").style.backgroundColor =="yellow" &&
            document.getElementById("2:3").style.backgroundColor =="white" &&
            document.getElementById("2:4").style.backgroundColor =="white" &&
            
            document.getElementById("3:0").style.backgroundColor =="white" &&
            document.getElementById("3:1").style.backgroundColor =="yellow" &&
            document.getElementById("3:2").style.backgroundColor =="white" &&
            document.getElementById("3:3").style.backgroundColor =="yellow" &&
            document.getElementById("3:4").style.backgroundColor =="white" &&
            
            document.getElementById("4:0").style.backgroundColor =="yellow" &&
            document.getElementById("4:1").style.backgroundColor =="white" &&
            document.getElementById("4:2").style.backgroundColor =="white" &&
            document.getElementById("4:3").style.backgroundColor =="white" &&
            document.getElementById("4:4").style.backgroundColor =="yellow"){
                revealCalendar();
            }
        })
    }
}

// functions for modifying calendar object
/**Takes a row and column (range 0-4) and changes the background
 * of that row or column between yellow and white.
 */
function clickDay(id){
    let day = document.getElementById(id)
    if (day.style.backgroundColor == "yellow"){
        day.style.backgroundColor = "white";
    }else{
        day.style.backgroundColor = "yellow";
    }
}

/**Clears all day entries except the days with the hidden
 * combination. For when Calendar Puzzle is solved.
 */
function revealCalendar(){
    for (let i=0; i<weeks.length; i++){
        for (let j=0; j<weeks[i].children.length; j++){
            let day = weeks[i].children[j];
            if (day.id != "3:4" && day.id != "1:1" && day.id != "2:2"){
                day.textContent = " X ";
            }
            
        }
    } 
    alert("X marks the spot!")
}

/**Class for combination lock. Creates a combination lock with a solution combination
 * of up to eight numbers, an array of the current numbers, methods for each button
 * that changes each of the current numbers individually, and a method for 
 * checking whether the solution combination matches the current numbers.
 */
class comboLock{
    constructor(...solution){
        // Solution to open lock.
        this._solutionCombo = [0, 0, 0, 0, 0, 0, 0, 0];
        // Current numbers displayed on lock
        this._currentCombo = [0, 0, 0, 0, 0, 0, 0, 0];
        // Takes entered solution and applies it to stored solution.
        for(let i=0; i<solution.length; i++){
            this._solutionCombo[i] = solution[i];
        };
    }
    /**Returns the array holding the solution to the lock */
    get solutionCombo(){
        return this._solutionCombo;
    }
    
    /**Returns the array of the current combination values*/
    get currentCombo(){
        return this._currentCombo;
    }
    
    /**Takes an array between 1 and 8 numbers. Sets the solutionCombo to that sequence of numbers */
    set solutionCombo(newSolution){
        this._solutionCombo = [0, 0, 0, 0, 0, 0, 0, 0];
        for(let i=0; i<newSolution.length; i++){
            this._solutionCombo[i] = newSolution[i];
        }
    }

    /**Resets the currentCombo to all zeroes. */
    reset(){
        this.currentCombo = [0,0,0,0,0,0,0,0];
    }

    /**Takes an integer representing the index
     * of a value in currentCombo. Returns a function that increments that value
     * in the specified object's currentCombo.
     */
    makeInc(num){
        return function(){
            this.currentCombo[num] +=1;
            if (this.currentCombo[num] > 9){
                this.currentCombo[num] = 0;
            }
        }
    }

    /**Returns true if currentCombo is the correct solution. */
    checkSolution(){
        for(let i=0; i< this._currentCombo.length; i++){
            if(this._currentCombo[i] != this._solutionCombo[i]){
                return false;
            }
        }
        return true;
    }
}

/**Uses comboLock Class to create a combination lock for the Promotions page solution. 
 * Each button increments its own number value.
 * If the combination value is correct and the "Check" button is clicked,
 *  the lock disappears and reveals a hidden message.
*/
var homeLock = new comboLock(2, 4, 9, 1, 7);

var homeLockNums = document.getElementsByClassName("promoCombo");

/**Updates the number displayed on the combination lock */
function updateLockNums(){
    for(let i=0; i<homeLockNums.length; i++){
        homeLockNums[i].textContent = homeLock.currentCombo[i];
    }
}

/**Reveals secret message for when lock is open*/
function revealHomeLock(){
    var lock = document.getElementById("promoLockTitle");
    lock.textContent = "Secret Message.";  // Secret Message.
    lock.style.left  = "10px";
    var lockContents = document.getElementsByClassName("lock");
    for(let i=0; i< lockContents.length; i++){
        lockContents[i].textContent ="";
    }
    alert("You solved the Promotions Page!")
} 

// Sets initial display of buttons to 0-0-0-0-0.
updateLockNums()

// Adds an incrementing function to each button on click.
for(let i=0; i<homeLockNums.length; i++){
    switch(i){
        case 0:
            homeLockNums[i].addEventListener("click", homeLock.makeInc(0).bind(homeLock));
            break;
        case 1:
            homeLockNums[i].addEventListener("click", homeLock.makeInc(1).bind(homeLock));
            break;
        case 2:
            homeLockNums[i].addEventListener("click", homeLock.makeInc(2).bind(homeLock));
            break;
        case 3:
            homeLockNums[i].addEventListener("click", homeLock.makeInc(3).bind(homeLock));
            break;
        case 4:
            homeLockNums[i].addEventListener("click", homeLock.makeInc(4).bind(homeLock));
            break;
    }
}

// Updates the number display of the combination lock after each button click.
document.getElementById("promoLock").addEventListener("click", updateLockNums)

/**  Checks for correct combination when "Check" button is clicked; 
 * If so, reveals secret message.
 * xxxdeletedxxx Else, gives a try again message.
*/
document.getElementById("checkPromoLock").addEventListener("click", ()=>{
    if(homeLock.checkSolution()){
        revealHomeLock();
    }else{ 
        alert("That's not right.");
    }
})

/** Feature to unlock the puzzles for the new page */
var unlockPuzzles = 0;

function readyPuzzles(){
    shuffleLock = true;
    alert("Something feels different. Try pressing 'Enter'.");
}

document.addEventListener("keydown", function(e){
    var y = e.key;
        switch (y) {
        case "1":
            if (unlockPuzzles == 0) {
                unlockPuzzles += 1;
            }
            break;
        case "8":
            if (unlockPuzzles == 1) {
                unlockPuzzles += 1;
            }
            break;
        case "2":
            if (unlockPuzzles == 2) {
                unlockPuzzles += 1;
            }
            break;
        case "0":
            if (unlockPuzzles == 3) {
                readyPuzzles();
            }
            break;
        default:
            unlockPuzzles = 0;
            break;
    }
})


/** The "Give Up" feature */
var unlockAll = 0;

function autoSolve(){
    alert("Because you gave up, \nI unlocked everything for you."); // displays cheat message.
    revealCalendar()
    revealHomeLock()  // unlocks HomePage comboLock
}

document.addEventListener("keydown", function(e){
    var x = e.key;
        switch (x) {
        case "Enter":  // used by listPuzzle to change the contents of the list.
            if(shuffleLock){
                shuffleList();
            }
            break;
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
})