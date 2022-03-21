const Gameboard = (() => {
  let boardArray = ["", "", "", "", "", "", "", "", ""];
  const gameBoard = document.querySelector(".board");
  const cells = Array.from(document.querySelectorAll(".grid"));
  let winner = null;

  const render = () => {
    boardArray.forEach((mark, idx) => {
      cells[idx].textContent = boardArray[idx];
    });
  };

  const reset = () => {
    for (i = 0; i < 9; i++) {
      boardArray[i] = "";
    }
    winner = null;
  };

  const checkWin = () => {
    const winArrays = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winArrays.forEach((combo) => {
      if (
        boardArray[combo[0]] &&
        boardArray[combo[0]] === boardArray[combo[1]] &&
        boardArray[combo[0]] === boardArray[combo[2]]
      ) {
        winner = "current";
      }
    });
    return winner || (boardArray.includes("") ? null : "Tie");
  };

  return {
    render,
    gameBoard,
    cells,
    boardArray,
    checkWin,
    reset,
  };
})();

const Player = (name, mark) => {
  const playTurn = (board, cell) => {
    const idx = board.cells.findIndex((position) => position === cell);
    if (board.boardArray[idx] === "") {
      board.render();
      return idx;
    }
    return null;
  };

  return { name, mark, playTurn };
};

const Game = (() => {
  const playerOneName = document.querySelector("#player1");
  const playerTwoName = document.querySelector("#player2");
  const form = document.querySelector("#form");
  const resetBtn = document.querySelector("#reset");
  const newGameBtn = document.querySelector("#newGame");
  const statusBar = document.querySelectorAll(".statusBar");
  const results = document.querySelector(".results");
  const displayNameX = document.querySelector("#playerOne");
  const displayNameO = document.querySelector("#playerTwo");
  let currentPlayer;
  let playerOne;
  let playerTwo;

  const switchTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const gameRound = () => {
    const board = Gameboard;
    const gameStatus = document.querySelector(".gameStatus");
    const turnX = document.querySelector("#first");
    const turnO = document.querySelector("#second");

    board.gameBoard.addEventListener("click", (e) => {
      e.preventDefault();
      const play = currentPlayer.playTurn(board, e.target);

      if (play !== null) {
        board.boardArray[play] = `${currentPlayer.mark}`;
        board.render();
        const winStatus = board.checkWin();
        if (winStatus === "Tie") {
          results.classList.remove("hidden");
          gameStatus.textContent = "Tie";
        } else if (winStatus === null) {
          switchTurn();
          turnX.classList.toggle("red");
          turnO.classList.toggle("red");
        } else {
          results.classList.remove("hidden");
          gameStatus.textContent = `Winner is ${currentPlayer.name}`;
        }
      }
      if (!results.classList.contains("hidden")) {
        results.addEventListener("click", () => {
          results.classList.add("hidden");
          reset();
        });
      }
    });
  };

  const gameInit = () => {
    playerOne = Player(playerOneName.value, "X");
    playerTwo = Player(playerTwoName.value, "O");
    currentPlayer = playerOne;
    if (
      playerOneName.value == "" ||
      playerOneName.value == /^\s*$/ ||
      playerTwoName.value == "" ||
      playerTwoName.value == /^\s*$/
    ) {
      playerOne.name = "X";
      playerTwo.name = "O";
    } else {
      displayNameX.textContent = playerOne.name;
      displayNameO.textContent = playerTwo.name;
    }
    gameRound();
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    gameInit();
    form.classList.add("hidden");
    statusBar.forEach((elem) => {
      elem.classList.remove("hidden");
    });
  });

  const reset = () => {
    Gameboard.reset();
    Gameboard.render();
  };
  resetBtn.addEventListener("click", () => {
    reset();
  });

  newGameBtn.addEventListener("click", () => {
    reset();
    window.location.reload();
  });

  return {
    gameInit,
  };
})();

Game.gameInit();
