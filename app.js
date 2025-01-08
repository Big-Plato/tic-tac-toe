
function GameBoard () {
    
    const [rows, columns] = [3, 3];
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    } 

    console.log(board)

    const getBoard = () => board;

    const dropMark = (row, column, player) => {
        const availableCells = board.filter((row) => row.filter((column) => column.getValue() === " "));

        console.log(availableCells)

        if (!availableCells.length) return;

        board[row][column].addMark(player);
    };

    const printBoard = () => {
        const boardCellsHasValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.table(boardCellsHasValues);   
    }

    return {getBoard, dropMark, printBoard}
}

 function Cell () {
    let value = " ";

    const addMark = (player) => {
        value = player;
    } 

    const getValue = () => value;

    return {addMark, getValue}
}

function CreatePlayer (name, marker) {
    this.name = name;
    this.marker = marker;

    let score = 0;
    getScore = () => score;
    giveScore = () => score++;

    return {name, marker, getScore, giveScore}
}

function GameController (playerOne, playerTwo) {
    let playerOneName = prompt("What's your name?")
    let playerOneMark;

    do {
        playerOneMark = prompt("Do you want to play with X or O?")
    } while (playerOneMark !== 'X' && playerOneMark !== 'O');

    let computerMark;
    if (playerOneMark === 'X' ? computerMark = 'O' : computerMark = 'X');

    playerOne = CreatePlayer(playerOneName, playerOneMark);

    playerTwo = CreatePlayer("Computer", computerMark);

    const players = [
        playerOne,
        playerTwo
    ]

    const board = GameBoard();

    console.log(players);

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    };

    console.log(players[0])

    const playRound = (row, column) => {
        
                if(activePlayer === players[0]) {
                    console.log(`Putting ${getActivePlayer().name}'s mark into row ${row} column ${column}.`);
                    board.dropMark(row, column, getActivePlayer().marker);
                }
                if (activePlayer === players[1]) {
                    row = Math.floor(Math.random() * 2);
                    column = Math.floor(Math.random() * 2)
                    console.log(`${getActivePlayer().name} is making a move into ${row} column ${column}.`)
                    // do {
                        board.dropMark(row, column, getActivePlayer().marker);
                    // } while(board.dropMark)
                    
                }
               switchPlayerTurn();
                printNewRound(); 
                     
            }
            
            printNewRound();

        return {playRound, getActivePlayer};
        }   

const game = GameController();