
//function that selects the gameboard and use the other functions to play the game
function GameBoard () {
    const cells = document.querySelectorAll(".cell")

    board = Array.from(cells);

    board.filter((element) => {
        console.log(element.dataset.value)
    })

    console.log(board)

    const getBoard = () => board;

    return {getBoard, board}
}

// function that got the logic of the game
function playGame () {
    const board = GameBoard.getBoard();

    console.log(board)
}

// function to create a player based on user input
function gamePlayer () {
    let player = prompt("Put your name")
    let marker = prompt("Put your mark here [X] or [O]");

    let playerOne = CreatePlayer(player, marker)
    return playerOne;
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

