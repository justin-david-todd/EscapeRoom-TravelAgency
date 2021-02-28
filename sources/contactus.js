/** Feature to unlock the puzzles for the new page */
var unlockFinal = 0;

function readyPuzzles(){
    showLink();
    alert("You Win!\n Click on 'Logo' to download your certificate.\n\nYes, I know you want more puzzles. I designed a lot more, but they honestly just weren't a part of this assignment and took too long to implement. I hope that you had fun!");
}

function showLink(){
    var newLink = document.createElement("a");
    newLink.href= "assets/congrats.pdf";
    newLink.download="";
    newLink.textContent="LOGO";
    var logo = document.getElementById("logo");
    logo.textContent ="";
    logo.appendChild(newLink);
}

document.addEventListener("keydown", function(e){
    var y = e.key;
        switch (y) {
        case "i":
            if (unlockFinal == 0) {
                unlockFinal += 1;
            }
            break;
        case "n":
            if (unlockFinal == 1) {
                unlockFinal += 1;
            }
            break;
        case "e":
            if (unlockFinal == 3 || unlockFinal == 4) {
                unlockFinal += 1;
            }
            break;
        case "d":
            if (unlockFinal == 2) {
                unlockFinal += 1;
            }
            if (unlockFinal == 5) {
                readyPuzzles();
            }
            break;
        default:
            unlockPuzzles = 0;
            break;
    }
});