/* -- constants -- */
const easyWords = ['rain', 'snow', 'windy', 'cloud', 'foggy', 'hail', 'storm', 'sunny', 'cold', 'warm', 'mist', 'haze', 'heat', 'frost'];
const mediWords = ['rainbow', 'tornado', 'sunrise', 'monsoon', 'cyclone', 'blizzard', 'drought', 'freezing', 'overcast', 'drizzle', 'showers', 'lightning', 'humidity', 'forecast', 'rainfall'];
const hardWords = ['Stratocumulus', 'Cirrostratus', 'Altostratus', 'Nimbostratus', 'Cirrocumulus', 'Cumulonimbus', 'Cumulusnimbus', 'Stratocumulus', 'Altostratus', 'Stratocumulus', 'Cirrostratus', 'Altocumulus', 'Cumulonimbus', 'Cirrocumulus', 'Nimbostratus'];

const easyButton = document.getElementById("easy");
const mediumButton = document.getElementById("medi");
const hardButton = document.getElementById("hard");

const secretWordContainer = document.querySelector(".secret-word-container");
const guessesContainer = document.getElementById("guesses")
guessesContainer.textContent = "CHOOSE YOUR DIFFICULTY"

const easyWinCountElement = document.getElementById("easy-win-count");
const mediumWinCountElement = document.getElementById("medium-win-count");
const hardWinCountElement = document.getElementById("hard-win-count");

/* -- app state (variables) -- */


let remainingGuesses = 7;
let guessedLetters = [];
let secretWord;
let wordArray = easyWords;

let currentDifficulty = "easy";

let easyWinCount = 0;
let mediumWinCount = 0;
let hardWinCount = 0;

initializeGame()

// Function to initialize the game
function initializeGame() {
  const randomIdx = Math.floor(Math.random() * wordArray.length);
  secretWord = wordArray[randomIdx].toUpperCase();
  console.log(secretWord)
  guessesContainer.innerHTML = "";
  guessesContainer.textContent = `GUESSES LEFT: ${remainingGuesses}`;
  // Clear the secret word container
  secretWordContainer.innerHTML = "";
  // Display underscores for each letter in the word
  for (let i = 0; i < secretWord.length; i++) {
    const secretWordLetter = document.createElement("span");
    secretWordLetter.className = 'secret-word-hidden';
    secretWordLetter.textContent = "_";
    secretWordContainer.appendChild(secretWordLetter);
  }
  
}
// Function to handle letter selection
function handleLetterSelection(letter) {
// Check if the letter has already been guessed
  if (guessedLetters.includes(letter)) {
    guessesContainer.textContent = `LETTER "${letter}" HAS ALREADY BEEN GUESSED`;
    return;
  }
// Insert guessed letters into array for reference 
    guessedLetters.push(letter);
// Check if the selected letter is in the secret word at any position
    let found = false;
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === letter) {
            found = true;
            updateDisplayWord(letter, i);
        }
    };
// If the letter is not found in the word, subtract a guess
    if (!found) {
        remainingGuesses--;
        updateGuessesUI();

        if (remainingGuesses === 0) {
            guessesContainer.textContent = "WHOMP! WHOMP! YOU LOSE!";
            resetGame();
        }
    };
// Check if word has been fully revealed
    if (isWordGuessed()) {
        handleWin(currentDifficulty);
        guessesContainer.textContent = "HUZZAH! YOU WIN!";

        
    }
}

// Updating the Secret Word
function updateDisplayWord(letter, i) {
    const secretWordLetters = secretWordContainer.querySelectorAll('.secret-word-hidden');
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === letter) {
        secretWordLetters[i].textContent = letter;
      }
    }
}

// Function for updating the Guesses UI
function updateGuessesUI() {
    guessesContainer.textContent = `GUESSES LEFT: ${remainingGuesses}`;
}

// Function to check if the word is guessed
function isWordGuessed() {
const displayedWord = secretWordContainer.textContent;
    return !displayedWord.includes("_");
}

// function for updating win counts
function updateWinCounts() {
    easyWinCountElement.textContent = `Easy: ${easyWinCount}`;
    mediumWinCountElement.textContent = `Medium: ${mediumWinCount}`;
    hardWinCountElement.textContent = `Hard: ${hardWinCount}`;
}
// Modify your win tracking logic for each difficulty level
function handleWin(difficulty) {
  if (isWordGuessed()) {
    guessesContainer.textContent = "HUZZAH! YOU WIN!";
// Update the win count for the appropriate difficulty
    if (difficulty === 'easy') {
      easyWinCount++;
    } else if (difficulty === 'medium') {
      mediumWinCount++;
    } else if (difficulty === 'hard') {
      hardWinCount++;
    }
// Update the win count display
    updateWinCounts();

    resetGame();
  }
}

// Function to reset the game 
function resetGame() {
  remainingGuesses = 7;
  guessedLetters = [];
  currentDifficulty = null;
};

/* -- event listeners -- */

// Event Listeners for Difficulty Selection
easyButton.addEventListener("click", function () {
  resetGame();
  currentDifficulty = "easy";
  wordArray = easyWords;
  initializeGame();
  easyButton.classList.add('selected');
  mediumButton.classList.remove('selected');
  hardButton.classList.remove('selected');
});

mediumButton.addEventListener("click", function () {
  resetGame();
  currentDifficulty = "medium";
  wordArray = mediWords;
  initializeGame();
  easyButton.classList.remove('selected');
  mediumButton.classList.add('selected');
  hardButton.classList.remove('selected');
});

hardButton.addEventListener("click", function () {
  resetGame();
  currentDifficulty = "hard";
  wordArray = hardWords;
  initializeGame();
  easyButton.classList.remove('selected');
  mediumButton.classList.remove('selected');
  hardButton.classList.add('selected');
});

// Event listener for key press
document.addEventListener("keydown", function (event) {
  if (event.key.match(/^[a-zA-Z]$/)) {
    let letter = event.key.toUpperCase();
    console.log(letter);
    handleLetterSelection(letter);
  }
});

// // Event listener for letter buttons
let keyboardButtons = document.querySelectorAll('.letter-buttons');
keyboardButtons.forEach((button) => {
    button.addEventListener("click", function(){
      // button.className = "hidden";
        let letter = button.textContent.toUpperCase();
        handleLetterSelection(letter);
    })
});