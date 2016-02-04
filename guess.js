(function () {

  var getRandom = function () {
        return (Math.random() * 100 | 0) + 1;
      },
      getID = function (id) {
        return document.getElementById(id);
      },
      getClass = function (id) {
        return document.getElementsByClassName(id);
      },
      inputBox = getID("inputBox"),
      submitButton = getID("submit"),
      hintButton = getID("hint"),
      resetButton = getID("reset"),
      message = getID("message"),
      instructions = getID("instructions"),
      guesses = getClass("guess"),
      validEntry = /^(100|([1-9][0-9]?))$/,
      i, hintMessage, numToGuess, currentGuess, currentGuesses, totalGuesses, guess, li,
      reset = function () {
        numToGuess = getRandom();
        hintMessage = "It could be: " + [getRandom(), getRandom(), getRandom(), getRandom(), numToGuess].sort(function (a,b) { return a - b; }).join(" ")
        currentGuesses = [];
        currentGuess = 0;
        totalGuesses = guesses.length;
        displayMessage("Pick any number between 1 and 100");
        for(i = 0; i < totalGuesses; i += 1) {
          li = guesses[i];
          li.innerText = "";
          li.classList.add("empty");
          li.temp && li.classList.remove(li.temp);
        }
      },
      colorGuess = function (li, color) {
        li.classList.remove("empty");
        li.classList.add(color);
      },
      numDiff, tempColor, prevTemp,
      setColor = function (n1, n2) {
        numDiff = n1 - n2;
        numDiff < 0 && (numDiff *= -1);
        return numDiff < 5 ? "superhot" : numDiff < 10 ? "hot" : numDiff < 20 ? "warm" :
                numDiff > 60 ? "freezing" : numDiff > 40 ? "cold" : "chilly";
      },
      checkOver = function () {
        return currentGuess === totalGuesses;
      },
      submitGuess = function () {
        if (checkOver()) {
          displayMessage("You can stop guessing. The game is over. The answer was: " + numToGuess);
          inputBox.value = "";
          return;
        }
        guess = inputBox.value;
        if (!guess.match(validEntry)) {
          inputBox.value = "";
          displayMessage("Invalid Entry, please enter a number between 1 and 100");
          return;
        }
        guess *= 1;
        if (guess === numToGuess) {
          displayMessage("You won!!!!!");
        } else if (currentGuesses.indexOf(guess) === -1) {
          tempColor = setColor(guess, numToGuess);
          li = guesses[currentGuess];
          li.temp = tempColor;
          colorGuess(li, tempColor);
          li.innerText = guess;
          currentGuess += 1;
          currentGuesses.push(guess);
          displayMessage("Oof! You are " + tempColor + (checkOver() ? "...and you lost.": ""));
        } else {
          displayMessage("You've already tried that one!");
        }
        inputBox.value = "";
      },
      displayHint = function () {
        displayMessage(checkOver() ? "Here's a hint: you lost": hintMessage);
      },
      displayMessage = function (m) {
        message.innerHTML = m;
      };

  resetButton.onmouseup = reset;

  submitButton.onmouseup = submitGuess;
  inputBox.onkeyup = function (e) {
    e.keyCode === 13 && submitGuess();
  };
  window.onmouseup = function () {
    inputBox.focus();
  };
  hintButton.onmouseup = displayHint;
  reset();

}());
