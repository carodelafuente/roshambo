if (process.env.NODE_ENV !== 'production') require('./index.html')
import './styles/screen.scss'

const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)
let playerScore = document.querySelector('span.player')
let computerScore = document.querySelector('span.computer')
let pScore = 0
let cScore = 0

const handleButtonClick = (event) => {
  const player = event.target.className
  const computer = getComputerMove()
  $('figure.player img').src = `https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/${player}.svg`
  $('figure.computer img').src = `https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/${computer}.svg`
  if (player === 'scissors') {
    if (computer === 'paper') {
      pScore++
    } if (computer === 'rock') {
      cScore++
    }
  }
  if (player === 'paper') {
    if (computer === 'rock') {
      pScore++
    } if (computer === 'scissors') {
      cScore++
    }
  }
  if (player === 'rock') {
    if (computer === 'scissors') {
      pScore++
    } if (computer === 'paper') {
      cScore++
    }
  }

  playerScore.textContent = pScore
  computerScore.textContent = cScore
  if (pScore === 2) {
    gameOver(true)
  } if (cScore === 2) {
    gameOver(false)
  }
  // HINT: Check for win, lose or draw, then call `gameOver()` eventually.
}

const getComputerMove = () => {
  const moves = ['rock', 'paper', 'scissors']
  return moves[Math.floor(Math.random() * moves.length)]
}

// const score = () => {
//   if (gameOver(true)) {
//     playerScore.textContent = pScore++
//   } else computerScore.textContent = cScore++
// }

// HINT: Try calling `gameOver(true)` in the console.
const gameOver = (playerDidWin) => {
  if (playerDidWin) {
    $('.dialog h3').textContent = 'You won!'
  } else {
    $('.dialog h3').textContent = 'You lost!'
  }
  setTimeout(() => {
    if (gameOver) {
      $('body').className = 'modal'
    }
  }, 200)
}

const resetGame = () => {
  // TODO: Probably need to do more to reset the game here...
  $('figure.player img').src = 'https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/unknown.svg'
  $('figure.computer img').src = 'https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/unknown.svg'
  $('body').className = ''
  pScore = 0
  cScore = 0
  playerScore.textContent = pScore
  computerScore.textContent = cScore
}

const main = () => {
  const buttons = $$('.player-input button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick)
  }
  $('.dialog button').addEventListener('click', resetGame)
}

document.addEventListener('DOMContentLoaded', main)

if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
