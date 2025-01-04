
/* What functions will exist?
1 - Create Player
2 - Create Gameboard
3 - Playround
4 - Switch player
5 - Win...
    
 Possible plays 
board[0][0], board[0][1], board[0][2]
board[1][0], board[0][1], board[0][2]
board[2][0], board[0][1], board[0][2]
*/

function gameBoard () {
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
    
    const getBoard = () => board;
    
    const dropMark = (row, column) => {
        const availablePlaces = board.filter((row) => row[column].getValue() === ' ').map(row => row[column]);
        console.log(availablePlaces)
        return availablePlaces;
    }

    return {getBoard, dropMark}
}

function Cell () {
    let value = " ";

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {addToken, getValue};
}

// Create the function to play round
function playRound (player1, player2) {
    let play = false;
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

