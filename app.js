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

  const dropMark = (row, column, player) => {
    console.log("row:", row, "column:", column);
    const availableCells = board
      .filter((row, column) => row[column].getValue() === "")
      .map((row) => row[column]);
    // if (!availableCells.length) return;

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
      console.log(
        `Putting ${
          getActivePlayer().name
        }'s mark into row ${row} column ${column}.`
      );
      board.dropMark(row, column, getActivePlayer().marker);
    }

    if (activePlayer === players[1]) {
      console.log(
        `Putting ${
          getActivePlayer().name
        }'s mark into row ${row} column ${column}.`
      );
      board.dropMark(row, column, getActivePlayer().marker);
    }

    function checkWin(labions) {
      const boardIndex = board.getBoard();
      const Checked = boardIndex.map((row) =>
        row.map((cell) => cell.getValue())
      );

      labions = false;

      // Horizontal
      for (let j = 0; j < boardIndex.length; j++) {
        for (let i = 0; i < Checked.length; i++) {
          if (Checked[i][0] && Checked[i][1] && Checked[i][2]) {
            labions = true;
            console.log(`${getActivePlayer().name} wins.`)
            return labions;
          }
        }
  
        // Vertical
        for (let i = 0; i < Checked.length; i++) {
          if (Checked[0][i] && Checked[1][i] && Checked[2][i]) {
            labions = true
            console.log(`${getActivePlayer().name} wins.`)            
            return labions;
          }
        }
  
        // Diagonal to bottom-right
        for (let i = 0; i < Checked.length; i++) {
          if (Checked[0][i] && Checked[1][i + 1] && Checked[2][i + 2]) {
            labions = true;
            console.log(`${getActivePlayer().name} wins.`)
            return labions;
          }
        }
  
        // Diagonal to upper-left
        for (let i = 0; i < Checked.length; i++) {
          if (Checked[0][i + 2] && Checked[1][i + 1] && Checked[2][i]) {
            labions = true;
            console.log(`${getActivePlayer().name} wins.`)
            return labions;
          }
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

    board.forEach((rows, row) => {
      rows.forEach((cell, column) => {
        const cellBtn = document.createElement("button");
        cellBtn.classList.add("cell");
        cellBtn.dataset.row = row;
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
    let playerWins = false;
    let activePlayer = game.getActivePlayer();
    if (dataValue === "X" || dataValue === "O") {
      alert("Invalid move");
    } else {
      game.playRound(selectedRow, selectedColumn);
      game.checkWin(playerWins);
      if (game.checkWin(playerWins) === true) {
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
