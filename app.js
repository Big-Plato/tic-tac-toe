
function GameBoard () {
    
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
        const availableCells = board.filter((row) => row[column].getValue() === "");
        console.log(availableCells)
        let boardIndex = board[row][column];
        if (!availableCells.length) return;

        if (boardIndex.getValue() !== "") {
            console.log(boardIndex.getValue())
            console.log("Not a valid play. Put it again");
        } else {
            board[row][column].addMark(player);
        }      
    };

    const printBoard = () => {
        const boardCellsHasValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.table(boardCellsHasValues);   
    }

    return {getBoard, dropMark, printBoard}
}

 function Cell () {
    let value = "";

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

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    };

    const playRound = (row, column) => {

                const boardIndex = board.getBoard();

                if(activePlayer === players[0]) {
                    if (boardIndex[row][column].getValue() !== '') {
                        console.log("Put another value!");
                        return;
                    } else {
                        console.log(`Putting ${getActivePlayer().name}'s mark into row ${row} column ${column}.`);
                        board.dropMark(row, column, getActivePlayer().marker); 
                    }
                    board.dropMark(row, column, getActivePlayer().marker); 
                }                          
                
                if (activePlayer === players[1]) {
                    row = Math.floor(Math.random() * 2);
                    column = Math.floor(Math.random() * 2)
                    console.log(`${getActivePlayer().name} is making a move into ${row} column ${column}.`)
                    board.dropMark(row, column, getActivePlayer().marker);
                }


               switchPlayerTurn();
                printNewRound(); 
                     
            }
            
            printNewRound();

        return {playRound, getActivePlayer};
        }   

const game = GameController();