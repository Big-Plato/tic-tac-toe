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
    console.log("row:", row, "column:", column)
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
  let playerOneName = prompt("What's your name? [Player 1]");
  let playerOneMark;

  do {
    playerOneMark = prompt("Do you want to play with X or O?").toUpperCase();
  } while (playerOneMark !== "X" && playerOneMark !== "O");

  let playerTwoName = prompt("What's your name? [Player 2]")
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
        console.log(square.getValue())
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
     

      function checkWin (getActivePlayer) {
      const boardIndex = board.getBoard();
      const Checked = boardIndex.map((row) => row.map((cell) => cell.getValue()));
      let winner = getActivePlayer().name;

      // Horizontal
      
        for (let i = 0; i < Checked.length; i++) {
          if (Checked[i][0] && Checked[i][1] && Checked[i][2]) {
            console.log(`${getActivePlayer().name} wins.`);
            return winner;
          }
        }
  
        // Vertical
        for (let i = 0; i < Checked.length; i++) {
          if (Checked[0][i] && Checked[1][i] && Checked[2][i]) {
            console.log(`${getActivePlayer().name} wins.`);
            return winner;
          }
        }
  
        // Diagonal to bottom-right
        for (let i = 0; i < Checked.length; i++) {
          if (Checked[0][i] && Checked[1][i + 1] && Checked[2][i + 2]) {
            console.log(`${getActivePlayer().name} wins.`);
            return winner;
          }
        }
  
        // Diagonal to upper-left
        for (let i = 0; i < Checked.length; i++) {
          if (Checked[0][i + 2] && Checked[1][i + 1] && Checked[2][i]) {
            console.log(`${getActivePlayer().name} wins.`);
            return winner;
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
        cellBtn.dataset.value = "";
        cellBtn.textContent = cell.getValue();
        cellBtn.classList.add = ".cellMate"
        gameContainer.appendChild(cellBtn);
      });
    });
  }

  function clickBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    console.log("row:", selectedRow, "column: ", selectedColumn)
    if (!selectedColumn && !selectedRow) return;


    game.playRound(selectedRow, selectedColumn);
    updateScreen();
    Check();
  }
  gameContainer.addEventListener("click", clickBoard);

  updateScreen();

}

ScreenController();

const restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", ScreenController);