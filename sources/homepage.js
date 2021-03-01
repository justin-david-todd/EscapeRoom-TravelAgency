
/**Author: Justin David Todd
 * Modified: 02/24/2021
 * Description: Code for the Home Page.
 */

 /**JavaScript Code for the Picture Carousel */
var carouselBubbleSequence = [1, 2, 3, 4, 5, 6, 7, 8];
var brokenBubbleSequence = [9, 10, 11, 12, 13, 13, 13, 13];
var items = document.getElementsByClassName("slidePhoto");
var slidePhoto = 0;
var slidePhotoRef = 0;


/**Initializes first active slide and its previous and next by adding 
 *   corresponding classes.
 */

function setInitialSlide(){
    items[items.length - 1].classList.add("previous");
    items[0].classList.add("active");
    items[1].classList.add("next");
}

function updateCarousel() {
    // Identifies indices of old previous and next.
    oldNext = slidePhotoRef +1;
    if (oldNext >= items.length){
        oldNext = 0;
    }
    
    oldPrevious = slidePhotoRef -1;
    if (oldPrevious <0){
        oldPrevious = items.length -1;
    }

    // Identifies indices of new previous and next.
    newNext = slidePhoto +1;
    if (newNext >= items.length){
        newNext = 0;
    }
    
    newPrevious = slidePhoto -1;
    if (newPrevious <0){
        newPrevious = items.length -1;
    }

    // Removes active/previous/next identifiers from old active/previous/next.
    items[oldNext].className = "slidePhoto";
    items[oldPrevious].className = "slidePhoto";
    items[slidePhotoRef].className = "slidePhoto";

    // Adds active/previous/next identifiers to new active/previous/next.
    items[newNext].classList.add("next");
    items[newPrevious].classList.add("previous");
    items[slidePhoto].classList.add("active");

    // Updates display of carouselBubbles.
    updateBubbles();

    // Updates reference to previous active slide
    slidePhotoRef = slidePhoto;
    document.getElementById("imgCaption").textContent = items[slidePhoto].alt;
}

function nextSlide(){
    slidePhoto += 1;
    if (slidePhoto >= items.length){
        slidePhoto = 0;
    }

    updateCarousel();
}

function previousSlide(){
    slidePhoto -= 1;
    if (slidePhoto < 0){
        slidePhoto = items.length -1;
    }

    updateCarousel();
}

function setButtons(){
    var previous = document.getElementById("carousel__button--prev");
    var next = document.getElementById("carousel__button--next");

    next.addEventListener("click", nextSlide);
    previous.addEventListener("click", previousSlide);
}

function updateBubbles(){
    var bubblePos = carouselBubbleSequence[slidePhoto];
    var bubble = document.getElementById("carouselBubbles")
    switch(bubblePos){
        case 1:
            bubble.textContent = "o . . . . . . .";
            break;
        case 2:
            bubble.textContent = ". o . . . . . .";
            break;
        case 3:
            bubble.textContent = ". . o . . . . .";
            break;
        case 4:
            bubble.textContent = ". . . o . . . .";
            break;
        case 5:
            bubble.textContent = ". . . . o . . .";
            break;
        case 6:
            bubble.textContent = ". . . . . o . .";
            break;
        case 7:
            bubble.textContent = ". . . . . . o .";
            break;
        case 8:
            bubble.textContent = ". . . . . . . o";
            break;
        case 9:
            bubble.textContent = ". . . . . X . .";
            break;
        case 10:
            bubble.textContent = ". . . . . . . X";
            break;
        case 11:
            bubble.textContent = ". X . . . . . .";
            break;
        case 12:
            bubble.textContent = ". . . X . . . .";
            break;
        case 13:
            bubble.textContent = ". . . . . . . .";
            break;
    }
}

function setUpCarousel(){
    setInitialSlide();
    setButtons();
    updateBubbles();
    // Causes carousel to autoscroll
    setInterval(nextSlide, 6000);
}

setUpCarousel();

/** Makes clicking on the "horse" photo 'break' the carousel.
 * 
 */
var breakCount = 0;
var horse = document.getElementById("horse");

function breakCarousel(){
    breakCount += 1;
    if (breakCount > 5) {
        carouselBubbleSequence = brokenBubbleSequence;
        alert("Something is wrong with the carousel.")
        updateBubbles()
    }
}

horse.addEventListener("click", breakCarousel);

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

/**Uses comboLock Class to create a combination lock for the Home Page solution. 
 * Each button increments its own number value.
 * If the combination value is correct and the "Check" button is clicked,
 *  the lock disappears and reveals a hidden message.
*/
var homeLock = new comboLock(6, 8, 2, 4);

var homeLockNums = document.getElementsByClassName("homeCombo");

/**Updates the number displayed on the home combination lock */
function updateLockNums(){
    for(let i=0; i<homeLockNums.length; i++){
        homeLockNums[i].textContent = homeLock.currentCombo[i];
    }
}

/**Reveals secret message for when lock is open*/
function revealHomeLock(){
    var lock = document.getElementById("homeLockTitle");
    lock.textContent = "Type '101010' on the next page.";  // The all of the judges give the pirate's booty a 10/10.
    lock.style.left  = "10px";
    var lockContents = document.getElementsByClassName("lock");
    for(let i=0; i< lockContents.length; i++){
        lockContents[i].textContent ="";
    }
    alert("You solved the Home Page!")
} 

// Sets initial display of buttons to 0-0-0-0.
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
    }
}

// Updates the number display of the combination lock after each button click.
document.getElementById("homeLock").addEventListener("click", updateLockNums)

/**  Checks for correct combination when "Check" button is clicked; 
 * If so, reveals secret message.
 * xxxdeletedxxx Else, gives a try again message.
*/
document.getElementById("checkHomeLock").addEventListener("click", ()=>{
    if(homeLock.checkSolution()){
        revealHomeLock();
    }else{ 
        alert("That's not right.");
    }
})

/** The "Give Up" feature */

var unlockAll = 0;

function autoSolve(){
    alert("Because you gave up, \nI unlocked everything for you."); // displays cheat message.
    for(var i=0; i<10; i++){
        breakCarousel()  // breaks the Carousel
    }
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
    }
})

