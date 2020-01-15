//Create an array of words

var selectableWords = [
    "GIJOE",
    "TRANSFORMERS",
    "MASK",
    "JETSONS",
    "INSPECTOR GADGET",
    "SMURFS",
    "THUNDERCATS",
    "HE MAN",
    "FLINTSTONES",
    "GHOSTBUSTERS",
    "VOLTRON",
    "GOBOTS",
    "DUCK TALES",
    "DARKWING DUCK",
];
var currentWord = selectableWords[Math.floor(Math.random() * selectableWords.length)].toUpperCase();
///////
//////
var maxTries = 12;
var guessedLetters = [];        // Stores the letters the user guessed
var currentWordIndex;           // Index of the current word in the array
var guessingWord = [];          // This will be the word we actually build to match the current word
var remainingGuesses = 0;       // How many tries the player has left
var gameStarted = false;        // Flag to tell if the game has started
var hasFinished = false;        // Flag for 'press any key to try again'     
var wins = 0;                   // How many wins has the player racked up

// Reset our game-level variables
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    // Use Math.floor to round the random number down to the nearest whole.
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    console.log(selectableWords[currentWordIndex]);

    // Clear out arrays
    guessedLetters = [];
    guessingWord = [];
    maxTries = [];

    // Build the guessing word and clear it out
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if (selectableWords[currentWordIndex][i] != ' ') {
            console.log('not a space')
            guessingWord.push("_");
        } else {
            console.log('space')
            guessingWord.push(' ');
        }
    }   

    // Hide game over and win images/text
    // document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    // document.getElementById("gameover-image").style.cssText = "display: none";
    // document.getElementById("youwin-image").style.cssText = "display: none";

    // Show display
    updateDisplay();
};


//  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        if (selectableWords[currentWordIndex][i] !== ' ') {
            document.getElementById("currentWord").innerText += guessingWord[i] + ' ';
        } else {
            document.getElementById("currentWord").innerText += ' '
        }
    }
    console.log(guessingWord)
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};


document.onkeydown = function (event) {
    // If we finished a game, dump one keystroke and reset.
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Check to make sure a-z was pressed.
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
        }
    }
};

function makeGuess(letter) { 
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            document.getElementById("guessedLetters").innerText = guessedLetters;
            evaluateGuess(letter);
        }
    }
    // updateDisplay();
    checkWin();
};


// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    let word = document.getElementById('currentWord')
    let previousCount = selectableWords[currentWordIndex].length;
    let entered = false
    // var positions = [];
    for (let i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if (selectableWords[currentWordIndex][i].toUpperCase() === letter.toUpperCase())
            // positions.push(i); 
            {
            entered = true
            let startWord = word.innerText.substring(0, i);
            let endWord = word.innerText.substring(i+1);
            let newWord = startWord + letter + endWord;
            document.getElementById('currentWord').innerText = newWord;
            previousCount -= 1
        }
    }

    if (previousCount == selectableWords[currentWordIndex].length && !entered) {
        remainingGuesses--;
        document.getElementById("remainingGuesses").innerText = remainingGuesses;
        entered = false
    }
    
    if (remainingGuesses <= 0 ) {
        alert('Game Over')
    } else if (previousCount <= 0) {

    }

};

function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        wins++;
        hasFinished = true;
    }
};