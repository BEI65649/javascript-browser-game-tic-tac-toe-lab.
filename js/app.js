/*-------------------------------- Constants --------------------------------*/


const choices = ["X", "O"]
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  


/*---------------------------- Variables (state) ----------------------------*/
let board
let turn 
let winner
let tie 


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
console.log(squareEls);
console.log(messageEl);


/*-------------------------------- Functions --------------------------------*/

const updateBoard = () => {
    board.forEach((sqrValue, idx) => {
        const square = squareEls[idx];
        square.textContent =sqrValue
});
}

const updateMessage = () => {
    if(winner === false && tie === false) {
        return "it's Player X's turn"
    } else if(winner === false && tie === true) {
        return "it's a tie"
    } else {
        return "Player 0 Victory"
    }
}


const render = () => {
    updateBoard()
    updateMessage()
}

const init = () => {
console.log('Init') 
board = ["x", "o", "", "", "", "", "", "", ""]
turn = "x"
winner = false
tie = false 
render () 
}

init()

const handleClick = (event) => {
    const squareIdx = event.target.id
    console.log(squareIdx, "square idx const works")

    if(board[squareIdx === "X"] || board[squareIdx] === "O" || winner) {
        return;
}
placePiece(squareIdx)
checkForWinner()
checkForTie()
switchPlayerTurn()
}

const placePiece = (squareIdx) => {
    board[squareIdx] = turn
    console.log(board)
}

checkForWinner = () => {
    for (let i = 0; i < winningCombos.length; i++) 
        if(board[winningCombos[i][0]] && board[winningCombos[i][0]] === board[winningCombos[i][1]] && board[winningCombos[i][0]] === board[winningCombos[i][2]]) {
            winner = true
        console.log(winner)
        }
} 

checkForTie = (squareIdx) => {
    if(winner === true) {
        return;
    } else if(board[squareIdx] !== "") {
        tie = false
        console.log(tie)
    }  
}

switchPlayerTurn = () => {
    if(winner === true) {
        return;
    } else if(winner === false) {
        turn = "O"
        console.log(turn)
    }   
}
/*----------------------------- Event Listeners -----------------------------*/



