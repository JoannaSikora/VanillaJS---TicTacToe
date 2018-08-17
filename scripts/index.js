//VARIABLES
const squares = document.querySelectorAll('.squares')
const button = document.getElementById('reset-game')
const playerX = document.getElementById('x')
const player0 = document.getElementById('0')
const overlay = document.getElementById('overlay')
const winner = document.getElementById('overlayWinner')
const alert = document.getElementById('overlayNotEmpty')
const alert2 = document.getElementById('overlayNoPlayer')
const tie = document.getElementById('overlayTie')
let player;
let computer;

// current player
let currentPlayer;

//winning scores
let gameEnd = false

const winningConds = [[0,1,2], [3,4,5], [0,4,8], [6,7,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8], [2,4,6]]

// function for player mark options
function gameStart(){

  player = ''
  computer = ''
  currentPlayer = ''


  playerX.onclick = () => {
    player = 'X'
    computer = '0'
    currentPlayer = player;
    overlay.style.display = 'none'
  }

  player0.onclick = () => {
    player = '0'
    computer = 'X'
    currentPlayer = player;
    overlay.style.display = 'none'
  }
}

//get clicked square
for(i=0; i<squares.length; i++){
  let square = squares[i];

  square.onclick = (e) => {
    const currentItem = e.target;
    if (currentPlayer == undefined ){
      alert2.style.display = "block"
      setTimeout(function(){
      alert2.style.display = "none"
      }, 1000)
    }
    else if(!currentItem.innerHTML == '') {
      alert.style.display = "block"
      setTimeout(function(){
      alert.style.display = "none"
      }, 1000)
    } else {
      currentItem.classList.add('clicked');
      // add players mark to the square
      currentItem.innerHTML = currentPlayer;

      let board_state = []
      squares.forEach(function(square){
        board_state.push(square.innerHTML)
      })

      checkWin(player, board_state)

      if(!gameEnd){
        computersMove()
      }
    }
  }

}

//computer move
// picks random square and marks it
function computersMove(){

  let emptySquares = []
  let randomSquare;

  //find empty squaras
  for(i=0;i<squares.length; i++){
    let square = squares[i]
    if(square.innerHTML==''){
      emptySquares.push(square)
    }
  }
  //pick random square
  randomSquare = Math.ceil(Math.random() * emptySquares.length) - 1;
  currentComputerItem = emptySquares[randomSquare]
  //mark square
  emptySquares[randomSquare].innerHTML = computer;
  currentComputerItem.classList.add('clicked');



  let board_state = []

  squares.forEach(function(square){
    board_state.push(square.innerHTML)
  })

  checkWin(computer, board_state);

  if(!gameEnd){
    currentPlayer = player;
  }
}

// function checking if player and computer scores are winning in winningScores
function checkWin(currentPlayer, board_state) {

  // loop thru and check if condition is met
  for(let i = 0; i<winningConds.length; i++){
    let conds = winningConds[i]
    let check = []
    conds.forEach(function(index){
      check.push(board_state[index])
    })

    let winComb = !check.includes("") && (check[0] == check[1]) && (check[1]==check[2])


//if I win in a last move it says it s a tie
    if(winComb){
      winner.style.display = "block"
      winner.innerHTML = `${currentPlayer} WON!!!`
      button.style.display = "block"
      gameEnd = true;
      break;
    } else if ((!board_state.includes("")) && (board_state.length == 9) && (!winComb) && (!gameEnd)) {
      gameEnd = true
      tie.style.display = "block"
      tie.innerHTML = 'It\'s a tie!'
      button.style.display = "block"

    }

  }
}

//resets the game
button.onclick = () => {
  winner.style.display = 'none'
  tie.style.display = 'none'
  overlay.style.display = 'block'
  button.style.display = "none"
  gameEnd = false


  //reset the board
  for(i=0; i< squares.length; i++){
    let square = squares[i]
    square.innerHTML = ''
    winner.innerHTML = ''
    tie.innerHTML = ''
    square.classList.remove('clicked')

    gameStart();
  }
}


gameStart();
