$(document).on("ready", function () {

  var getRandom = function () {
        return (Math.random() * 100 | 0) + 1;
      },
      generateWinningNumber = getRandom,
      inputBox = $("#inputBox"),
      submitButton = $("#submit"),
      hintButton = $("#hint"),
      resetButton = $("#reset"),
      message = $("#message"),
      instructions = $("#instructions"),
      guessBoxes = $(".guess"),
      audioWin = document.getElementById("audioWin"),
      audioLose = document.getElementById("audioLose"),
      validEntry = /^(100|([1-9][0-9]?))$/,
      i, hintMessage, winningNumber, playerGuessCount, previousPlayerGuesses, totalGuesses, playerGuess, li,
      reset = function () {
        winningNumber = generateWinningNumber();
        hintMessage = "It could be: " + [getRandom(), getRandom(), getRandom(), getRandom(), winningNumber].sort(function (a,b) { return a - b; }).join(" ")
        previousPlayerGuesses = [];
        playerGuessCount = 0;
        totalGuesses = guessBoxes.length;
        displayMessage("Pick any number between 1 and 100");
        for(i = 0; i < totalGuesses; i += 1) {
          li = guessBoxes[i];
          li.innerText = "";
          li.classList.add("empty");
          li.temp && li.classList.remove(li.temp);
        }
      },
      colorGuess = function (li, color) {
        li.classList.remove("empty");
        li.classList.add(color);
      },
      setColor = function (numDiff) {
        return numDiff < 5 ? "superhot" : numDiff < 10 ? "hot" : numDiff < 20 ? "warm" :
                numDiff > 60 ? "freezing" : numDiff > 40 ? "cold" : "chilly";
      },
      checkOver = function () {
        return playerGuessCount === totalGuesses;
      },
      lowerOrHigher = function (n1, n2) {
        return (n1 - n2) > 0 ? "lower": "higher";
      },
      tempColor, difference, difMessage,
      checkGuess = function () {
        if (checkOver()) {
          displayMessage("You can stop guessing. The game is over. The answer was: " + winningNumber);
          inputBox.val("");
          return;
        }
        playerGuess = inputBox.val();
        if (!playerGuess.match(validEntry)) {
          inputBox.val("");
          displayMessage("Invalid Entry, please enter a number between 1 and 100");
          return;
        }
        playerGuess *= 1;
        if (playerGuess === winningNumber) {
          displayMessage("You won!!!!!");
	  audioWin.play();
        } else if (previousPlayerGuesses.indexOf(playerGuess) === -1) {
	  difMessage = lowerOrHigher(playerGuess, winningNumber);
          tempColor = setColor(Math.abs(difference));
          li = guessBoxes[playerGuessCount];
          li.temp = tempColor;
          colorGuess(li, tempColor);
          li.innerText = playerGuess;
          playerGuessCount += 1;
          previousPlayerGuesses.push(playerGuess);
	  if(checkOver()) {
	    audioLose.play();
	    displayMessage("Better luck next time! Click Reset to play again");
	  } else {
            displayMessage("Too bad! You are " + tempColor + ". Guess " + difMessage);
	  }
        } else {
          displayMessage("You've already tried that one!");
        }
        inputBox.val("");
      },
      displayHint = function () {
        displayMessage(checkOver() ? "Here's a hint: you lost": hintMessage);
      },
      displayMessage = function (m) {
        message.text(m);
      };

  resetButton.on("mouseup", reset);
  submitButton.on("mouseup", checkGuess);
  inputBox.on("keyup", function (e) {
    e.keyCode === 13 && checkGuess();
  });
  $(document).on("mouseup", function () {
    inputBox.focus();
  });
  hintButton.on("mouseup", displayHint);
  reset();

});


