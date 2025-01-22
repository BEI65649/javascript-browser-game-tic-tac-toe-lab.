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
const resetBtnEl = document.getElementById('reset');   
// 
// event listeners are tied to cached elements
// console.log(squareEls);
// console.log(messageEl);


/*-------------------------------- Functions --------------------------------*/

const updateBoard = () => {
    board.forEach((sqrValue, idx) => {
        if (sqrValue === 'X'){
           squareEls[idx].textContent = 'X'  
        } else if (sqrValue === "O"){
            squareEls[idx].textContent = 'O'
        } else{ squareEls.textContent = ' ' }  
     });
}

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.textContent = "it's Player X's turn"
    } else if (winner === false && tie === true) {
        messageEl.textContent = "it's a tie"
    } else {
        // messageEl.textContent = "Player 0 Victory"
        messageEl.textContent = "Player" + turn + "Victory";
    }
}


const render = () => {
    updateBoard();
    updateMessage();
}

const init = () => {
    console.log('Init')
    board = ["", "", "", "", "", "", "", "", ""]
    turn = "X"
    winner = false
    tie = false
    render()
}

init()

const handleClick = (event) => {
    const squareIdx = event.target.id
    console.log(squareIdx, "square idx const works")
    const isFilled = board[squareIdx] !== ''
    if(isFilled || winner) {
        return 
    }
    placePiece(squareIdx)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

const placePiece = (squareIdx) => {
    board[squareIdx] = turn

    // console.log(board)
}

checkForWinner = () => {
    for (let i = 0; i < winningCombos.length; i++)
        if (board[winningCombos[i][0]] && board[winningCombos[i][0]] === board[winningCombos[i][1]] && board[winningCombos[i][0]] === board[winningCombos[i][2]]) {
            winner = true
            // console.log(winner)
        }
}

// const checkWinner = () => {
//     for (let combo of winningCombos) {
//         const [a, b, c] = combo; // Destructure the winning combo indices
//         if (
//             board[a] !== "" && // Check if the first position is not empty
//             board[a] === board[b] && // Check if the first equals the second
//             board[a] === board[c] // Check if the first equals the third
//         ) {
//             winner = true;
//             console.log(`Winner found! Player ${board[a]} wins.`);
//             break;
//         }
//     }
// };

// // Run the winner check
// checkWinner();

// if (!winner) {
//     console.log("No winner yet.");
// }


checkForTie = (squareIdx) => {
    if (winner === true) {
        return;
    } else if (board[squareIdx] !== "") {
        tie = true
        // console.log(tie)
    }
    // checkForTie = (squareIdx) => {
    //     if (winner === true) {
    //         return;
    //     } else if (!board.includes("")) {
    //         tie = true;
    //     }
}

switchPlayerTurn = () => {
    if (winner === true) {
        return;

    } 
    
    if (turn === 'X') {
        turn = 'O' 
    
        // console.log(turn)
    } else {
        turn = 'X'
    }
}
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
    square.addEventListener('click', handleClick)
})
resetBtnEl.addEventListener('click', init)

