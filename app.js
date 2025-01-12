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

  console.log(board);

  const getBoard = () => board;

  const playMark = (row, column, player) => {
    const availablePlaces = board.filter((row) => row[column].getValue() === "")
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
    playerOne = {
      name: "Player 1",
      marker: "X",
    },
    playerTwo = {
      name: "Player 2",
      marker: "O",
    },
  ];
  console.log(players);

  const board = GameBoard();

  let currentPlayer = players[0];

  const switchTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => currentPlayer;

  const playRound = (row, column) => {
    console.log(`Putting ${getActivePlayer().name}'s mark in row ${row} and column ${column}.`);
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
    for (let i = 0; i < 3; i++) {
      const a = board[i][0];
      const b = board[i][1];
      const c = board[i][2];

      if (a !== "" && a === b && b === c) {
        return "Win";
      }
    }

    for (let i = 0; i < 3; i++) {
      const a = board[0][i];
      const b = board[1][i];
      const c = board[2][i];

      if (a !== "" && a === b && b === c) {
        return "Win";
      }
    }

    const a = board[0][0];
    const b = board[1][1];
    const c = board[2][2];

    if (a !== "" && a === b && b === c) {
      return "Win";
    }

    const d = board[0][2];
    const e = board[1][1];
    const f = board[2][0];

    if (d !== "" && d === e && d === f) {
      return "Win";
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const square = board[i][j];
        if (square === "") {
          return undefined;
        }
      }
    }
    return "draw";
  }



  return { getActivePlayer, playRound, checkWin };
}

const game = GameController();
