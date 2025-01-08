function GameBoard() {
  const rows = 3;
  const columns = 3;
  let board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const dropMark = (column, row, player) => {
    console.log("row:", row, "column:", column)
    console.log(board[row][column]);
    const availableCells = board
      .filter((row, column) => row[column].getValue() === "")
      .map((row) => row[column]);
    if (!availableCells.length) return;

    board[row][column].addMark(player);
  };

  const printBoard = () => {
    const boardCellsHasValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.table(boardCellsHasValues);
  };

  return { getBoard, dropMark, printBoard };
}

function Cell() {
  let value = "";

  const addMark = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addMark, getValue };
}

function CreatePlayer(name, marker) {
  this.name = name;
  this.marker = marker;

  let score = 0;
  getScore = () => score;
  giveScore = () => score++;

  return { name, marker, getScore, giveScore };
}

function checkWin() {}

function GameController(playerOne, playerTwo) {
  let playerOneName = prompt("What's your name?");
  let playerOneMark;

  do {
    playerOneMark = prompt("Do you want to play with X or O?").toUpperCase();
  } while (playerOneMark !== "X" && playerOneMark !== "O");

  let computerMark;
  if (playerOneMark === "X" ? (computerMark = "O") : (computerMark = "X"));

  playerOne = CreatePlayer(playerOneName, playerOneMark);

  playerTwo = CreatePlayer("Computer", computerMark);

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

  const playRound = (column, row) => {
    const boardIndex = board.getBoard();

    if (activePlayer === players[0]) {
      console.log(
        `Putting ${
          getActivePlayer().name
        }'s mark into row ${row} column ${column}.`
      );
      board.dropMark(column, row, getActivePlayer().marker);
    }

    if (activePlayer === players[1]) {
      row = Math.floor(Math.random() * 2);
      column = Math.floor(Math.random() * 2);
      console.log(
        `Putting ${
          getActivePlayer().name
        }'s mark into row ${row} column ${column}.`
      );
      board.dropMark(row, column, getActivePlayer().marker);
    }

    const checkWin = () => {
      const boardIndex = board.getBoard();
      const Check = boardIndex.map((row) => row.map((cell) => cell.getValue()));

      // Horizontal
      for (let i = 0; i < Check.length; i++) {
        if (Check[i][0] && Check[i][1] && Check[i][2]) {
          console.log(`${getActivePlayer().name} wins.`);
          return 1;
        }
      }

      // Vertical
      for (let i = 0; i < Check.length; i++) {
        if (Check[0][i] && Check[1][i] && Check[2][i]) {
          console.log(`${getActivePlayer().name} wins.`);
          return 1;
        }
      }

      // Diagonal to bottom-right
      for (let i = 0; i < Check.length; i++) {
        if (Check[0][i] && Check[1][i + 1] && Check[2][i + 2]) {
          console.log(`${getActivePlayer().name} wins.`);
          return 1;
        }
      }

      // Diagonal to upper-left
      for (let i = 0; i < Check.length; i++) {
        if (Check[0][i + 2] && Check[1][i + 1] && Check[2][i]) {
          console.log(`${getActivePlayer().name} wins.`);
          return 1;
        }
      }
    };

    printNewRound();
    checkWin();
    switchPlayerTurn();
  };

  printNewRound();

  return { playRound, getActivePlayer, getBoard: board.getBoard };
}

function ScreenController() {
  const game = GameController();
  const gameContainer = document.querySelector("#gameContainer");
  const turnPlayer = document.querySelector("#playerTurn");
  const restartBtn = document.querySelector("#restart");

  const updateScreen = () => {
    turnPlayer.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    turnPlayer.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((row, i) => {
      row.forEach((cell, column) => {
        const cellBtn = document.createElement("button");
        cellBtn.classList.add("cell");
        cellBtn.dataset.row = i;
        console.log(cellBtn.dataset.row)
        cellBtn.dataset.column = column;
        console.log(cellBtn.dataset.column)
        cellBtn.textContent = cell.getValue();
        gameContainer.appendChild(cellBtn);
      });
    });
  }

  function clickBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    if (!selectedColumn && !selectedRow) return;

    game.playRound(selectedColumn, selectedRow);
    updateScreen();
  }
  gameContainer.addEventListener("click", clickBoard);

  updateScreen();
}

ScreenController();
