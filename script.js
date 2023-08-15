const Player = (mark) => {
  return { mark };
};

const player1 = Player("X");
const player2 = Player("O");

const gameBoard = (() => {
  let board = new Array(9);
  let currentPlayer = player1;
  const _winnerMessage = document.querySelector(".winner");
  const _restartButton = document.querySelector(".restart-btn");

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
    gameBoard.board[position] = mark;
  };

  const _showMessage = () => {
    changeCurrentPlayer();
    _winnerMessage.textContent = `${currentPlayer.mark} Wins!`;
    _winnerMessage.classList.add("winner-visible");
  };

  const _clearBoard = () => {
    gameBoard.board = new Array(9);
    for (let i = 1; i <= 9; i++) {
      const cell = document.querySelector(`.cell-${i}`);
      cell.children[1].classList.remove("visible");
      cell.children[0].classList.remove("visible");
    }
  };

  const restart = () => {
    _clearBoard();
    _enableClicks();
    _winnerMessage.classList.remove("winner-visible");
    currentPlayer = player1;
  };

  const _checkForRows = () => {
    for (let i = 0; i < 9; i += 3) {
      let row = [];
      for (let j = i; j < i + 3; j++) {
        row.push(gameBoard.board[j]);
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

  const _checkForColumns = () => {
    for (let i = 0; i < 3; i++) {
      let column = [];
      for (let j = i; j < i + 7; j += 3) {
        column.push(gameBoard.board[j]);
      }
      if (
        column.every((cell) => cell == "X") ||
        column.every((cell) => cell == "O")
      ) {
        return true;
      }
    }
    return false;
  };
  const _checkForDiagonals = () => {
    const diagonal1 = [gameBoard.board[0], gameBoard.board[4], gameBoard.board[8]];
    const diagonal2 = [gameBoard.board[2], gameBoard.board[4], gameBoard.board[6]];
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
      if (gameBoard.board[i] == undefined) {
        return false;
      }
    }
    return true;
  };

  const _disableClicks = () => {
    for (let i = 1; i <= 9; i++) {
      const cell = document.querySelector(`.cell-${i}`);
      cell.classList.add("disabled");
    }
  }
  const _enableClicks = () => {
    for (let i = 1; i <= 9; i++) {
      const cell = document.querySelector(`.cell-${i}`);
      cell.classList.remove("disabled");
    }
  }

  const checkWin = () => {
    if (_checkForColumns() || _checkForRows() || _checkForDiagonals()) {
      _disableClicks();
      _showMessage();
    } else if (checkForDraw()) {
      _winnerMessage.textContent = "It's a draw";
      _winnerMessage.classList.add("winner-visible");
    }
  };

  return {
    board,
    addMark,
    getCurrentPlayer,
    changeCurrentPlayer,
    restart,
    checkWin,
  };
})();

const displayController = (() => {
  const displayX = (cell) => {
    cell.children[1].classList.add("visible");
  };

  const displayO = (cell) => {
    cell.children[0].classList.add("visible");
  };

  return { displayX, displayO };
})();


const displayPlayer = document.querySelector(".current-player");
displayPlayer.textContent = "X";


for (let i = 1; i <= 9; i++) {
  const cell = document.querySelector(`.cell-${i}`);
  cell.addEventListener("click", () => {
    const playerMark = gameBoard.getCurrentPlayer().mark;
    if (gameBoard.board[i - 1] == undefined) {
      if (playerMark === "X") {
        displayController.displayX(cell);
        gameBoard.addMark(i - 1, playerMark);
      } else if (playerMark === "O") {
        displayController.displayO(cell);
        gameBoard.addMark(i - 1, playerMark);
      }
      gameBoard.changeCurrentPlayer();
      displayPlayer.textContent = gameBoard.getCurrentPlayer().mark;
    }

    gameBoard.checkWin();
  });
}

const restartButton = document.querySelector(".restart-btn");
restartButton.addEventListener("click", () => {
  gameBoard.restart();
  displayPlayer.textContent = "X";
});
