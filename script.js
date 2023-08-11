const gameBoard = (() => {
  let gameboard = [];
  const winnerMessage = document.querySelector(".winner");
  const restartButton = document.querySelector(".restart-btn");

  const showBoard = () => {
    console.log(gameboard);
  };
  const addMark = (position, mark) => {
    gameboard[position] = mark;
  };

  const showMessage = (mark) => {
    winnerMessage.textContent = `${mark} Wins!`;
    winnerMessage.classList.add("visible");
    restartButton.classList.add("visible");
  };

  const clearBoard = () => {
    gameboard = [];
    for (let i = 1; i <= 9; i++) {
      const cell = document.querySelector(`.cell-${i}`);
      cell.textContent = "";
    }
  };

  const restart = () => {
    clearBoard();
    winnerMessage.classList.remove("visible");
    restartButton.classList.remove("visible");
    mark = "X";
  };

  const checkWin = () => {
    // // check for rows
    // for (let i = 0; i < 3; i++) {
    //   let row = [];
    //   for (let j = i * 3; j < i + 3; j++) {
    //     row.push(gameboard[i]);
    //   }
    //   if (
    //     row.every((cell) => cell == "X") &&
    //     row.every((cell) => cell == "O")
    //   ) {
    //     return true;
    //   }
    // }
    // return false;

    // // check for columns
    // for (let i = 0; i < 9; i = +3) {
    //   let row = [];
    //   for (let j = i; j < i + 3; j++) {
    //     column.push(gameboard[i]);
    //   }
    //   if (
    //     column.every((cell) => cell == "X") &&
    //     column.every((cell) => cell == "O")
    //   ) {
    //     return true;
    //   }
    // }
    // return false;

    if (gameboard[0] === "X" && gameboard[1] === "X" && gameboard[2] === "X") {
      showMessage("X");
    } else if (
      gameboard[0] === "O" &&
      gameboard[1] === "O" &&
      gameboard[2] === "O"
    ) {
      showMessage("O");
    } else if (
      gameboard[3] === "X" &&
      gameboard[4] === "X" &&
      gameboard[5] === "X"
    ) {
      showMessage("X");
    } else if (
      gameboard[3] === "O" &&
      gameboard[4] === "O" &&
      gameboard[5] === "O"
    ) {
      showMessage("O");
    } else if (
      gameboard[6] === "X" &&
      gameboard[7] === "X" &&
      gameboard[8] === "X"
    ) {
      showMessage("X");
    } else if (
      gameboard[6] === "O" &&
      gameboard[7] === "O" &&
      gameboard[8] === "O"
    ) {
      showMessage("O");
    } else if (
      gameboard[0] === "X" &&
      gameboard[3] === "X" &&
      gameboard[6] === "X"
    ) {
      showMessage("X");
    } else if (
      gameboard[0] === "O" &&
      gameboard[3] === "O" &&
      gameboard[6] === "O"
    ) {
      showMessage("O");
    } else if (
      gameboard[1] === "X" &&
      gameboard[4] === "X" &&
      gameboard[7] === "X"
    ) {
      showMessage("X");
    } else if (
      gameboard[1] === "O" &&
      gameboard[4] === "O" &&
      gameboard[7] === "O"
    ) {
      showMessage("O");
    } else if (
      gameboard[2] === "X" &&
      gameboard[5] === "X" &&
      gameboard[8] === "X"
    ) {
      showMessage("X");
    } else if (
      gameboard[2] === "O" &&
      gameboard[5] === "O" &&
      gameboard[8] === "O"
    ) {
      showMessage("O");
    } else if (
      gameboard[1] === "X" &&
      gameboard[7] === "X" &&
      gameboard[7] === "X"
    ) {
      showMessage("X");
    } else if (
      gameboard[1] === "O" &&
      gameboard[4] === "O" &&
      gameboard[7] === "O"
    ) {
      showMessage("O");
    } else if (
      gameboard[2] === "X" &&
      gameboard[5] === "X" &&
      gameboard[8] === "X"
    ) {
      showMessage("X");
    } else if (
      gameboard[2] === "O" &&
      gameboard[5] === "O" &&
      gameboard[8] === "O"
    ) {
      showMessage("O");
    } else if (
      gameboard[0] === "X" &&
      gameboard[4] === "X" &&
      gameboard[8] === "X"
    ) {
      showMessage("X");
    } else if (
      gameboard[0] === "O" &&
      gameboard[4] === "O" &&
      gameboard[8] === "O"
    ) {
      showMessage("O");
    } else if (
      gameboard[2] === "X" &&
      gameboard[4] === "X" &&
      gameboard[6] === "X"
    ) {
      showMessage("X");
    } else if (
      gameboard[2] === "O" &&
      gameboard[4] === "O" &&
      gameboard[6] === "O"
    ) {
      showMessage("O");
    }
    // else if (gameboard.length === 9) {
    //   const winnerMessage = document.querySelector(".winner");
    //   winnerMessage.textContent = `Draw`;
    //   winnerMessage.classList.add("visible");
    // }
  };
  return { addMark, checkWin, showBoard, restart };
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

let mark = "X";

for (let i = 1; i <= 9; i++) {
  const cell = document.querySelector(`.cell-${i}`);
  cell.addEventListener("click", () => {
    if (cell.textContent === "") {
      if (mark === "X") {
        displayController.displayX(cell);
        gameBoard.addMark(i - 1, mark);
        mark = "O";
      } else {
        displayController.displayO(cell);
        gameBoard.addMark(i - 1, mark);
        mark = "X";
      }
    }
    gameBoard.checkWin();
  });
}

const restartButton = document.querySelector(".restart-btn");
restartButton.addEventListener("click", () => {
  gameBoard.restart();
});

// displayController.displayAll(gameBoard.gameboard);
// displayController.displayX(2);
// displayController.displayO(9);
