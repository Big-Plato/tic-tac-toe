function GameBoard() {
  let board = [];
  const rows = 3;
  const columns = 3;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const playMark = (row, column, player) => {
    const availablePlaces = board.filter(
      (row) => row[column].getValue() === ""
    );
    console.log(availablePlaces);
    if (!availablePlaces.length) return;

    board[row][column].addMark(player);
  };

  const printBoard = () => {
    const boardCells = board.map((row) => row.map((cell) => cell.getValue()));
    console.table(boardCells);
  };

  return { getBoard, playMark, printBoard };
}

function Cell() {
  let value = "";

  const addMark = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { getValue, addMark };
}

function GameController() {
  const players = [
    (playerOne = {
      name: "Player 1",
      marker: "X",
    }),
    (playerTwo = {
      name: "Player 2",
      marker: "O",
    }),
  ];

  const board = GameBoard();

  let currentPlayer = players[0];

  const switchTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => currentPlayer;

  const printnewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn...`);
  };

    let boardCells = board.getBoard();
    const boardI = boardCells.map((row) => row.map((cell) => cell.getValue()));
    console.table(boardI);

  const playRound = (row, column) => {
    console.log(
      `Putting ${
        getActivePlayer().name
      }'s mark in row ${row} and column ${column}.`
    );
    if (boardI[row][column] !== "") {
      alert("Invalid move, \nPlay again")
    } else {
      board.playMark(row, column, getActivePlayer().marker);
    }
    

    checkWin(boardI);
    printnewRound();
    switchTurn();
  };

  const checkWin = () => {
    let boardCells = board.getBoard();
    const boardI = boardCells.map((row) => row.map((cell) => cell.getValue()));
    console.table(boardI);
    // Vertical check
    for (let i = 0; i < 3; i++) {
      if (
        boardI[i][0] !== "" &&
        boardI[i][0] === boardI[i][1] &&
        boardI[i][1] === boardI[i][2]
      ) {
        console.log("Win");
        return true;
      }
    }

    // Horizontal check
    for (let i = 0; i < 3; i++) {
      if (boardI[0][i] !== "" && boardI[0][i] === boardI[1][i] && boardI[1][i] === boardI[2][i]) {
        console.log("Win");
        return true;
      }
    }

    // Diagonal check (Upper left to Inferior right)
    if (boardI[0][0] !== "" && boardI[0][0] === boardI[1][1] && boardI [1][1] === boardI[2][2]) {
      console.log("Win");
    }

    // Diagonal check (Upper right to Inferior left)
    if (boardI[0][2] !== "" && boardI[0][2] === boardI[1][1] && boardI [1][1] === boardI[2][0]) {
      console.log("Win");
    }

    return "draw"
  };

  return { getActivePlayer, playRound, checkWin, getBoard: board.getBoard };
}

function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector("#gameContainer");
  const playerTurnDiv = document.querySelector("#playerTurn");
  const restartBtn = document.querySelector("#restart");

  const updateScreen = () => {
    boardDiv.textContent = "";
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((row, i) => {
      row.forEach((cell, index) => {
        const cellBtn = document.createElement("button");
        cellBtn.classList.add("cell");
        cellBtn.dataset.row = i;
        cellBtn.dataset.column = index;
        cellBtn.textContent = cell.getValue();
        boardDiv.appendChild(cellBtn);
      });
    });
    game.checkWin(board);
  };

  function clickBoard(e) {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;
    if (!selectedColumn && !selectedRow) return;

    

    
    if (e.innerHTML === "X" || e.innerHTML === "O") {
      alert("Invalid move!")
    } else {
      game.playRound(selectedRow, selectedColumn);
    }
    updateScreen();
  }
  boardDiv.addEventListener("click", clickBoard);

  updateScreen();
}

ScreenController();
