// GameBoard
const gameBoard = () => {};

const grid = document.querySelector(".board");
for (i = 0; i < 9; i++) {
  const div = document.createElement("div");
  div.classList.add("grid");
  grid.appendChild(div);
}

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

// Players
const player = (name) => {};

// Game
const game = (move) => {};
