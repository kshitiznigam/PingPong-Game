// Define game elements
var ball = document.getElementById("ball");
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var gameBoard = document.getElementById("game-board");

// Define ball properties
var ballSpeedX = 5;
var ballSpeedY = 5;
var ballPosX = gameBoard.offsetWidth / 2;
var ballPosY = gameBoard.offsetHeight / 2;

// Define player properties
var playerSpeed = 10;
var player1PosY = gameBoard.offsetHeight / 2;
var player2PosY = gameBoard.offsetHeight / 2;

// Move players
document.addEventListener("keydown", function(event) {
  if (event.code === "KeyW" && player1PosY > 0) {
    player1PosY -= playerSpeed;
    player1.style.top = player1PosY + "px";
  } else if (event.code === "KeyS" && player1PosY < gameBoard.offsetHeight - player1.offsetHeight) {
    player1PosY += playerSpeed;
    player1.style.top = player1PosY + "px";
  } else if (event.code === "ArrowUp" && player2PosY > 0) {
    player2PosY -= playerSpeed;
    player2.style.top = player2PosY + "px";
  } else if (event.code === "ArrowDown" && player2PosY < gameBoard.offsetHeight - player2.offsetHeight) {
    player2PosY += playerSpeed;
    player2.style.top = player2PosY + "px";
  }
});

// Move ball
function moveBall() {
  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;

  // Check collision with top and bottom walls
  if (ballPosY <= 0 || ballPosY >= gameBoard.offsetHeight - ball.offsetHeight) {
    ballSpeedY = -ballSpeedY;
  }

  // Check collision with player1
  if (ballPosX <= player1.offsetWidth && ballPosY + ball.offsetHeight >= player1PosY && ballPosY <= player1PosY + player1.offsetHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Check collision with player2
  if (ballPosX >= gameBoard.offsetWidth - player2.offsetWidth - ball.offsetWidth && ballPosY + ball.offsetHeight >= player2PosY && ballPosY <= player2PosY + player2.offsetHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Check if ball goes out of bounds on player1's side
  if (ballPosX <= 0) {
    alert("Player 2 wins!");
    resetGame();
  }

  // Check if ball goes out of bounds on player2's side
  if (ballPosX >= gameBoard.offsetWidth - ball.offsetWidth) {
    alert("Player 1 wins!");
    resetGame();
  }

  // Update ball position
  ball.style.left = ballPosX + "px";
  ball.style.top = ballPosY + "px";
}

// Reset game
function resetGame() {
  ballPosX = gameBoard.offsetWidth / 2;
  ballPosY = gameBoard.offsetHeight / 2;
  ballSpeedX = -ballSpeedX;
  ball.style.left = ballPosX + "px";
  ball.style.top = ballPosY + "px";
}
setInterval(moveBall, 20);
