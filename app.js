
//function that selects the gameboard and use the other functions to play the game
function GameBoard () {
    const cells = document.querySelectorAll(".cell");

    board = Array.from(cells);

    const availableCells = board.filter((element) => {
        element.dataset.value === " " ? console.log("Playable") : -1;
    })
    console.log(availableCells)

    playGame();

    board.forEach((e) => {
        e.addEventListener("click", (dropMark) => {
            console.log("rs");
        })
    })

    console.log(board)

    const getBoard = () => board;

    //Switch the players
    const switchTurns = () => { 
        let currentPlayer = playerOne;
        if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
    } else {
        currentPlayer = playerOne;
    }

    let markX = document.createElement("img");
    markX.textContent = "X";
    let markO = document.createElement("p");
    markO.textContent = "O";

    const dropMark = () => {
        if (currentPlayer === playerOne && playerOne.marker === "X") {
            
        }
    }
}


    return {getBoard, board, switchTurns, dropMark}
}

// function that got the logic of the game
function playGame () {
    let player = prompt("Put your name")
    let marker = prompt("Put your mark here [X] or [O]");

    let computerMark = marker === "X" ? "O" : "X";

    let playerOne = CreatePlayer(player, marker)

    let playerTwo = CreatePlayer("Computer", computerMark)

}

//function to create the player
function CreatePlayer (name, marker) {
    this.name = name;
    this.marker = marker;

    let score = 0;

    const getScore = () => score;
    const giveScore = () => score++;

    return {name, marker, getScore, giveScore}
}

