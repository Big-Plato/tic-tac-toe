import Cell from "./cell";

export default function GameBoard() {
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
  
  