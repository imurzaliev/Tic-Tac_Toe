// GameBoard
const gameBoard = (() => {
  let arr = [];
  let counter = 2;

  const cells = document.querySelectorAll(".grid");
  cells.forEach((cell) => {
    cell.addEventListener(
      "click",
      () => {
        const xo = document.createElement("h1");
        if (counter % 2 === 0) {
          xo.textContent = "X";
        } else {
          xo.textContent = "O";
        }
        counter++;
        cell.appendChild(xo);
      },
      { once: true }
    );
  });
})();

// Players
const player = (name) => {};

// Game
const game = (move) => {};
