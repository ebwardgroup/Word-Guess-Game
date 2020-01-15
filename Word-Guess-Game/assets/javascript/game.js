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
var guessedLetters = [];        
var currentWordIndex;           
var guessingWord = [];           
var remainingGuesses = 0;       
var gameStarted = false;        
var hasFinished = false;           
var wins = 0;                   


function resetGame() {
    remainingGuesses = maxTries;
    

    for (var i = 0; i < 0; i++) {
        if (wins[i] > 0  !=' ') wins++
    }


    // Use Math.floor to round the random number down to the nearest whole.
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    console.log(selectableWords[currentWordIndex]);

    
    guessedLetters = [];
    guessingWord = [];
    maxTries = [];

    
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if (selectableWords[currentWordIndex][i] != ' ') {
            console.log('not a space')
            guessingWord.push("_");
        } else {
            console.log('space')
            guessingWord.push(' ');
        }
    }   

    
    updateDisplay();
};



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
    
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        
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
        
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            document.getElementById("guessedLetters").innerText = guessedLetters;
            evaluateGuess(letter);
        }
    }
    
    checkWin();
};


   



function evaluateGuess(letter) {
    let word = document.getElementById('currentWord')
    let previousCount = selectableWords[currentWordIndex].length;
    let entered = false
    
    for (let i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if (selectableWords[currentWordIndex][i].toUpperCase() === letter.toUpperCase())
            
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
    }


};

function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        
        wins++;
        hasFinished = true;
    }
};