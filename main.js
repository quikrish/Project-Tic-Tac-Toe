const gameBoardElement = document.getElementById("game-board");
const turnIndicator = document.getElementById("turn-indicator");

const restartBtn = document.getElementById("start-btn");

// This object will store the state of the board and provide methods to update and read its values.Gameboard is an object created using the Module Pattern.
const Gameboard = (function () {
  //3x3 array filled with empty strings
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  //public method that provides read-only access to the board.
  function getBoard() {
    return board;
  }
  // public method that updates the board
  function updateBoard(row, col, mark) {
    if (board[row][col] === "") {
      board[row][col] = mark;
      return true;
    }
    return false; //invalid move
  }
  //   public method to check whether board is empty or not ,if it's empty it will true
  function isEmpty(row, col) {
    return board[row][col] === "";
  }
  function reset() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = "";
      }
    }
  }

  return { getBoard, updateBoard, isEmpty, reset };
})();

// factory function to generate player objects.
// A factory function is a function that creates and returns an object. Unlike a class or constructor function, it doesn't use the new keyword. Instead, it explicitly builds the object and returns it.
// const player1 = Player("Alice", "X");
// console.log(player1); // { name: "Alice", marker: "X" }

function Player(name, marker) {
  return {
    name,
    marker,
  };
}
// The game controller manages:
// Whose turn it is.
// Checking for a winner or a tie.
// Switching turns.
const Gamecontroller = (function () {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "0");
  let activePlayer = player1;
  let gameOver = false; // Add a flag to track if the game is over

  function switchPlayer() {
    activePlayer = activePlayer === player1 ? player2 : player1;
  }
  function checkWinner() {
    const board = Gameboard.getBoard();
    const winPatterns = [
      //Rows
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],

      // Columns
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // Diagonals
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];
    // The .some() method checks whether at least one element in the array satisfies a given condition.
    // The .every() method checks whether all elements in an array satisfy a given condition.
    return winPatterns.some(function (pattern) {
      return pattern.every(function ([row, col]) {
        return board[row][col] === activePlayer.marker;
      });
    });
  }
  function checkTie() {
    return Gameboard.getBoard()
      .flat()
      .every(function (cell) {
        return cell !== "";
      });
  }

  function playRound(row, col) {
    if (gameOver) {
      return "Game over! Start a new game."; // Prevent moves if the game is over
    }

    if (!Gameboard.updateBoard(row, col, activePlayer.marker)) {
      return "Invalid Move.Try again!";
    }

    // Render the board immediately after updating it
    renderBoard();

    if (checkWinner()) {
      gameOver = true; // Set gameOver to true when there's a winner
      return `${activePlayer.name} wins!`;
    }
    if (checkTie()) {
      gameOver = true; // Set gameOver to true when it's a tie
      return "It's a tie";
    }
    switchPlayer();
    return null;
  }

  function reset() {
    activePlayer = player1;
    gameOver = false; // Reset the gameOver flag
  }
  function getActivePlayer() {
    return activePlayer;
  }
  function isGameOver() {
    return gameOver;
  }
  return { playRound, reset, getActivePlayer, isGameOver };
})();

function renderBoard() {
  const board = Gameboard.getBoard();
  gameBoardElement.innerHTML = ""; // Clear previous content
  board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex) {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.textContent = cell; // Display the current marker
      if (cell != "") {
        cellElement.classList.add("taken");
      }
      if (!Gamecontroller.isGameOver()) {
        cellElement.addEventListener("click", function () {
          handleCellClick(rowIndex, colIndex);
        });
      }

      gameBoardElement.appendChild(cellElement);
    });
  });
}

// Handle a cell click
function handleCellClick(row, col) {
  let result = Gamecontroller.playRound(row, col);
  if (result) {
    turnIndicator.textContent = result; // Display game status (win/tie)
    gameBoardElement.querySelectorAll(".cell").forEach(function (cell) {
      cell.classList.add("taken"); // Disable further moves
    });
    return;
  }
  turnIndicator.textContent = `${Gamecontroller.getActivePlayer().name}'s turn`;
}

// Restart the game
restartBtn.addEventListener("click", function () {
  Gameboard.reset();
  Gamecontroller.reset();
  turnIndicator.textContent = "Player 1's turn";
  renderBoard();
});
// Initialize the game board
renderBoard();
