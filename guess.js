var guess = (function () {

  var numberToGuess = null,
    previousGuess = [],
    playerGuessCount = 5,
    textStatus = document.getElementById("status"),
    duplicate = !1,
    playersGuess,
    playAgain = document.getElementById("playAgain"),
    theGuess = document.getElementById("playersGuess"),
    getHint = document.getElementById("hint"),
    guessCount = document.getElementById("guess-count");

  function doesNumberToGuessExist() {
    playersGuess = parseInt(theGuess.value, 10), null === numberToGuess ? (startGame(), theGuess.value = "") : playerGuessCount > 0 && (isItTheNumber(numberToGuess));
    theGuess.value = "";
  }

  function createNumberToGuess() {
    numberToGuess = (100 * Math.random() + 1) | 0;
  }

  function startGame() {
    previousGuess = [];
    createNumberToGuess(), isItTheNumber(numberToGuess);
    guessCount.innerHTML = playerGuessCount = 5;
  }

  function hotOrCold() {
    var b = Math.abs(theGuess.value - numberToGuess);
    return 5 >= b ? "Super Hot" : 10 >= b ? "Hot" : 15 >= b ? "Warm" : b > 20 ? "Cold" : "Ice Cold"
  }

  function checkAnswer() {
    "number" == typeof playersGuess && (duplicate = !1), previousGuess.forEach(function(a) {
        parseInt(playersGuess, 10) === parseInt(a, 10) && (duplicate = !0);
    });
  }

  function guessesRemaining() {
    guessCount.innerHTML = playerGuessCount >= 2 ? (playerGuessCount -= 1) : "Sorry, Play Again!";
  }

  function isItTheNumber(a) {
    checkAnswer();
    textStatus.innerHTML = duplicate ? "You already picked that number" : 
      parseInt(playersGuess) == parseInt(a) ? "You are CORRECT!" : (previousGuess.push(playersGuess), guessesRemaining(), "You are " + hotOrCold());
  }

  function reset() {
    startGame();
    textStatus.innerHTML = "Your game has been restarted, submit a new guess!";
  }

  function hint() {
    guessCount.innerHTML = numberToGuess;
  }

  function checkGuess(n) {
    
  }

  return {
    checkGuess, checkGuess,
    doesExist: doesNumberToGuessExist,
    reset: reset,
    hint: hint
  }

}());
