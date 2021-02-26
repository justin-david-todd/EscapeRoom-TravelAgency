
// code for homepage
var carouselBubbleSequence = [1, 2, 3, 4];
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
            bubble.textContent = "o . . .";
            break;
        case 2:
            bubble.textContent = ". o . .";
            break;
        case 3:
            bubble.textContent = ". . o .";
            break;
        case 4:
            bubble.textContent = ". . . o";
            break;
    }
}

function setUpCarousel(){
    setInitialSlide();
    setButtons();
    updateBubbles();
    // Causes carousel to autoscroll
    setInterval(nextSlide, 3000);
}

setUpCarousel();


