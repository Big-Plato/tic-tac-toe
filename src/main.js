import GameBoard from "../modules/gameboard";

function CreatePlayer(name, marker) {
  this.name = name;
  this.marker = marker;

  let score = 0;
  getScore = () => score;
  giveScore = () => score++;

  return { name, marker, getScore, giveScore };
}

function GameController(playerOne, playerTwo) {
  let playerOneName = prompt("What's your name? [Player 1]");
  let playerOneMark;

  do {
    playerOneMark = prompt("Do you want to play with X or O?").toUpperCase();
  } while (playerOneMark !== "X" && playerOneMark !== "O");

  let playerTwoName = prompt("What's your name? [Player 2]");
  let playerTwoMark;
  if (playerOneMark === "X" ? (playerTwoMark = "O") : (playerTwoMark = "X"));

  playerOne = CreatePlayer(playerOneName, playerOneMark);

  playerTwo = CreatePlayer(playerTwoName, playerTwoMark);

  const players = [playerOne, playerTwo];

  const board = GameBoard();

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    const boardIndex = board.getBoard();
    boardIndex.forEach((e) => {
      e.forEach((square) => {
        console.log(square.getValue());
      });
    });
    if (activePlayer === players[0]) {
      if (boardIndex[row][column].getValue() !== "") {
        console.log("Invalid Cell");
      } else {
        console.log(
          `Putting ${
            getActivePlayer().name
          }'s mark into row ${row} column ${column}.`
        );
        board.dropMark(row, column, getActivePlayer().marker);
      }
    }

    if (activePlayer === players[1]) {
      if (boardIndex[row][column].getValue() !== "") {
        console.log("Invalid Cell");
        return;
      } else {
        console.log(
          `Putting ${
            getActivePlayer().name
          }'s mark into row ${row} column ${column}.`
        );
        board.dropMark(row, column, getActivePlayer().marker);
      }
    }

    function checkWin(board) {
      const boardIndex = board.getBoard();
      const Checked = boardIndex.map((row) =>
        row.map((cell) => cell.getValue())
      );

      // Horizontal

      for (let i = 0; i < Checked.length; i++) {
        if (Checked[i][0] && Checked[i][1] && Checked[i][2]) {
          return true;
        }
      }

      // Vertical
      for (let i = 0; i < Checked.length; i++) {
        if (Checked[0][i] && Checked[1][i] && Checked[2][i]) {
          return true;
        }
      }

      // Diagonal to bottom-right
      for (let i = 0; i < Checked.length; i++) {
        if (Checked[0][i] && Checked[1][i + 1] && Checked[2][i + 2]) {
          return true;
        }
      }

      // Diagonal to upper-left
      for (let i = 0; i < Checked.length; i++) {
        if (Checked[0][i + 2] && Checked[1][i + 1] && Checked[2][i]) {
          return true;
        }
      }
    }

    printNewRound();
    checkWin();
    switchPlayerTurn();
  };

  printNewRound();

  return { playRound, getActivePlayer, checkWin, getBoard: board.getBoard };
}

function ScreenController() {
  const game = GameController();
  const gameContainer = document.querySelector("#gameContainer");
  const turnPlayer = document.querySelector("#playerTurn");

  const updateScreen = () => {
    gameContainer.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    turnPlayer.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((row, i) => {
      row.forEach((cell, column) => {
        const cellBtn = document.createElement("button");
        cellBtn.classList.add("cell");
        cellBtn.dataset.row = i;
        cellBtn.dataset.column = column;
        cellBtn.dataset.value = cell.getValue();
        cellBtn.textContent = cell.getValue();
        cellBtn.classList.add = ".cellMate";
        gameContainer.appendChild(cellBtn);
      });
    });
  };

  function clickBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    console.log("row:", selectedRow, "column: ", selectedColumn);
    if (!selectedColumn && !selectedRow) return;

    const dataValue = e.target.dataset.value;
    console.log("dataValue: ", dataValue);

    let activePlayer = game.getActivePlayer();
    if (dataValue === "X" || dataValue === "O") {
      alert("Invalid move");
    } else {
      game.playRound(selectedRow, selectedColumn);
      game.checkWin();
      if (game.checkWin()) {
        alert(`${activePlayer} wins!`);
      }
    }

    updateScreen();
  }
  gameContainer.addEventListener("click", clickBoard);

  updateScreen();
}

ScreenController();

const restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", ScreenController);
