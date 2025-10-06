var buttons = document.querySelectorAll(".btn");
var gameSequence = [];
var playerSequence = [];

var gameStarted = false;
var level = 0;

document.addEventListener("keydown", function (event) {
  if (event.key) {
    if(gameStarted != true){
        gameStarted = true;
        nextRound();
    }
  }
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if(!gameStarted) return;
    
    var buttonId = this.id;
    playerSequence.push(buttonId);

    buttonAnimation(buttonId);
    MakeSoundByButton(buttonId);

    checkAnswer(playerSequence.length - 1);
  });
}

function nextRound() {
  playerSequence = []; 
  level++;

  document.querySelector("#level-title").innerHTML = "Level " + level;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomButton = buttons[randomNumber];
  
  gameSequence.push(randomButton.id);

  setTimeout(function() {
      buttonAnimation(randomButton.id);
      MakeSoundByButton(randomButton.id);
  }, 500);
}

function checkAnswer(currentLevel) {
  if (playerSequence[currentLevel] === gameSequence[currentLevel]) {
    if (playerSequence.length === gameSequence.length) {
      setTimeout(function () {
        nextRound();
      }, 1000);
    }
  } else {
    var wrongSound = new Audio("./sounds/wrong.mp3");
    wrongSound.play();
    
    document.querySelector("#level-title").innerHTML = "Game Over, Press Any Key to Restart";
    
    document.querySelector("body").style.backgroundColor = "red";

    setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "#011F3F";
    }, 100);

    resetGame();
  }
}

function resetGame() {
    gameStarted = false;
    gameSequence = [];
    level = 0;
}

function MakeSoundByButton(key) {
  switch (key) {
    case "green":
      var som = new Audio("./sounds/green.mp3");
      som.play();
      break;
    case "red":
      var som = new Audio("./sounds/red.mp3");
      som.play();
      break;
    case "blue":
      var som = new Audio("./sounds/blue.mp3");
      som.play();
      break;
    case "yellow":
      var som = new Audio("./sounds/yellow.mp3");
      som.play();
      break;
    default:
      console.log("Botão não reconhecido: " + key);
  }
}

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}