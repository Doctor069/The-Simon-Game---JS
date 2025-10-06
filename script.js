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

  for (let i = 0; i < gameSequence.length; i++) {
    const color = gameSequence[i]; 
    const delay = 600;

    setTimeout(function() {
      buttonAnimation(color);
      MakeSoundByButton(color);
    }, delay * (i + 1)); 
  }
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
    
    document.querySelector("#level-title").innerHTML = "Game Over, Pressione QUALQUER Tecla do Teclado para Resertar.";
    
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
  var som = new Audio("./sounds/" + key + ".mp3");
  som.play();
}

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}