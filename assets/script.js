/* -- constants -- */
const easyWords = ['rain', 'snow', 'windy', 'cloud', 'foggy', 'hail', 'storm', 'sunny', 'cold', 'warm', 'mist', 'haze', 'heat', 'frost'];
const mediWords = ['rainbow', 'tornado', 'sunrise', 'monsoon', 'cyclone', 'blizzard', 'drought', 'freezing', 'overcast', 'drizzle', 'showers', 'lightning', 'humidity', 'forecast', 'rainfall'];
const hardWords = ['Stratocumulus', 'Cirrostratus', 'Altostratus', 'Nimbostratus', 'Cirrocumulus', 'Cumulonimbus', 'Cumulusnimbus', 'Stratocumulus', 'Altostratus', 'Stratocumulus', 'Cirrostratus', 'Altocumulus', 'Cumulonimbus', 'Cirrocumulus', 'Nimbostratus'];

const easyButton = document.getElementById("easy");
const mediumButton = document.getElementById("medi");
const hardButton = document.getElementById("hard");

const secretWordContainer = document.querySelector(".secret-word-container");
const guessesContainer = document.getElementById("guesses")


/* -- app state (variables) -- */
let remainingGuesses = 7;
let guessedLetters = [];
let secretWord;
let wordArray;

// Function to initialize the game
function initializeGame() {
  const randomIdx = Math.floor(Math.random() * wordArray.length);
  secretWord = wordArray[randomIdx].toUpperCase();
  console.log(secretWord)
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
    letter = letter.toUpperCase();
                // Check if the letter has already been guessed
  if (guessedLetters.includes(letter)) {
    guessesContainer.textContent = `LETTER "${letter}" HAS ALREADY BEEN GUESSED`;
    return;
  }
    guessedLetters.push(letter);
    // Check if the selected letter is in the secret word at any position
    let found = false;
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === letter) {
            found = true;
            updateDisplayWord(letter, i);
        }
    }
    // If the letter is not found in the word, subtract a guess
    if (!found) {
        remainingGuesses--;
        updateGuessesUI();

        if (remainingGuesses === 0) {
            guessesContainer.textContent = "WHOMP! WHOMP! YOU LOSE!";
            resetGame();
        }
    }

    // Check if word has been fully revealed
    if (isWordGuessed()) {
        guessesContainer.textContent = "HUZZAH! YOU WIN!";
        resetGame();
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
// Function to reset the game 
function resetGame() {
  remainingGuesses = 7;
  guessedLetters = [];
}

/* -- event listeners -- */

easyButton.addEventListener("click", function () {
  wordArray = easyWords;
  initializeGame();
});

mediumButton.addEventListener("click", function () {
  wordArray = mediWords;
  initializeGame();
});

hardButton.addEventListener("click", function () {
  wordArray = hardWords;
  initializeGame();
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
        let letter = button.textContent;
        handleLetterSelection(letter);
    })
});