const Player = (mark) => {
  return { mark };
};

const player1 = Player("X");
const player2 = Player("O");

const gameBoard = (() => {
  let board = new Array(9);
  let currentPlayer = player1;
  const winnerMessage = document.querySelector(".winner");
  const restartButton = document.querySelector(".restart-btn");

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const changeCurrentPlayer = () => {
    if (currentPlayer == player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const addMark = (position, mark) => {
    board[position] = mark;
  };

  const showMessage = () => {
    winnerMessage.textContent = `${currentPlayer.mark} Wins!`;
    winnerMessage.classList.add("visible");
    restartButton.classList.add("visible");
  };

  const clearBoard = () => {
    board = [];
    for (let i = 1; i <= 9; i++) {
      const cell = document.querySelector(`.cell-${i}`);
      cell.textContent = "";
    }
  };

  const restart = () => {
    clearBoard();
    winnerMessage.classList.remove("visible");
    restartButton.classList.remove("visible");
    currentPlayer = player1;
  };
  
  const checkForRows = () => {
    for (let i = 0; i < 9; i += 3) {
      let row = [];
      for (let j = i; j < i + 3; j++) {
        row.push(board[j]);
      }
      if (
        row.every((cell) => cell == "X") ||
        row.every((cell) => cell == "O")
      ) {
        return true;
      }
    }
    return false;
  };

  const checkForColumns = () => {
    for (let i = 0; i < 3; i++) {
      let column = [];
      for (let j = i; j < i + 7; j += 3) {
        column.push(board[j]);
      }
      if (
        column.every((cell) => cell == "X") ||
        column.every((cell) => cell == "O")
      ) {
        return true;
      }
      return false;
    }
  };
  const checkForDiagonals = () => {
    const diagonal1 = [board[0], board[4], board[8]];
    const diagonal2 = [board[2], board[4], board[6]];
    const diagonals = [diagonal1, diagonal2];
    for (let i = 0; i < 2; i++) {
      if (
        diagonals[i].every((cell) => cell == "X") ||
        diagonals[i].every((cell) => cell == "O")
      ) {
        return true;
      }
    }
    return false;
  };
  const checkForDraw = () => {
    for (let i = 0; i < 9; i++) {
      if (board[i] == undefined) {
        return false;
      }
    }
    return true;
  };
  const checkWin = () => {
    if (checkForColumns() || checkForRows() || checkForDiagonals()) {
      showMessage();
    }
    else if (checkForDraw()) {
      winnerMessage.textContent = "It's a draw";
      winnerMessage.classList.add("visible");
      restartButton.classList.add("visible");
    }
  };
  return {
    addMark,
    getCurrentPlayer,
    changeCurrentPlayer,
    restart,
    checkWin,
  };
})();

const displayController = (() => {
  const displayX = (cell) => {
    cell.textContent = "X";
  };
  const displayO = (cell) => {
    cell.textContent = "O";
  };

  // const displayAll = (arr) => {
  //   for (let i = 0; i < arr.length; i++) {
  //     const cell = document.querySelector(`.cell-${i + 1}`);
  //     cell.textContent = arr[i];
  //   }
  // };
  // return { displayAll };
  return { displayX, displayO };
})();

for (let i = 1; i <= 9; i++) {
  const cell = document.querySelector(`.cell-${i}`);
  cell.addEventListener("click", () => {
    if (cell.textContent === "") {
      let player = gameBoard.getCurrentPlayer();
      if (player.mark === "X") {
        displayController.displayX(cell);
        gameBoard.addMark(i - 1, player.mark);
      } else {
        displayController.displayO(cell);
        gameBoard.addMark(i - 1, player.mark);
      }
    }
    gameBoard.checkWin();
    gameBoard.changeCurrentPlayer();
  });
}

const restartButton = document.querySelector(".restart-btn");
restartButton.addEventListener("click", () => {
  gameBoard.restart();
});

// displayController.displayAll(gameBoard.gameboard);
// displayController.displayX(2);
// displayController.displayO(9);
