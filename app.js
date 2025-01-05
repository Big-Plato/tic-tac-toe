
/* What functions will exist?
1 - Create Player
2 - Create Gameboard
3 - Playround
4 - Switch player
5 - Print the gameBoard
6 - Win...

*/

function GameBoard () {
    const [rows, columns] = [3, 3];

    console.log(rows)
    console.log(columns)
    board = []
    
    // Create a 2D array
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(" ");
        }
    }
    
    //Method to get the board
    const getBoard = () => board;

    //Method to drop a mark in the board
    const dropMark = (row, column, player) => {
        const availableCells = board.filter((row) => row[column].getValue() === " ");
        console.log(availableCells);

        if (!availableCells.length) return;
        // const play = 
    }

    const printBoard = () => {
        console.log(getBoard())
    }

    return {getBoard, dropMark, printBoard}
}

function printGameBoard () {
    gameBoard();
    return console.table(board);
}

function Cell () {
    let value = " ";

    const addToken = (player) => {
        value = player.marker;
    }

    const getValue = () => value;

    return {addToken, getValue};
}

// Create the function to play round
function playRound (player1, player2) {
    let play = false;

    const board = gameBoard();

    console.log(board.getBoard())
    
} 

function GameController (
    playerOne = player1,
    playerTwo = player2
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOne,
            token: "X"
        },
        {
            name: playerTwo,
            token: "O"
        }
    ];

    let activePlayer = players[0];

    // Switch turn, if active player is [0] then switch to [1]
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound () => {
        board.printBoard();
    }
}

// Create Player function
function createPlayer (name, marker) {
    let score = 0;
    this.name = name;
    this.marker = marker;
    const getScore = () => score;
    const giveScore = () => score++;

    return ({name, marker, getScore, giveScore});

}

// Create two players
const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');

console.log(player1);
console.log(player2);

