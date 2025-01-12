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

  const playRound = (row, column) => {
    console.log(
      `Putting ${
        getActivePlayer().name
      }'s mark in row ${row} and column ${column}.`
    );
    board.playMark(row, column, getActivePlayer().marker);

    checkWin(board);
    printnewRound();
    
    switchTurn();
  };

  const printnewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn...`);
  };

  const checkWin = (board) => {
    board = board.getBoard();
    
    // Vertical check
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        console.log("Win")
      }
    }
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
  };

  function clickBoard(e){
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;
    if (!selectedColumn && !selectedRow) return;

    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickBoard);

  updateScreen();

  
}

ScreenController();
