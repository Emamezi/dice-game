'use script';

const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnReset = document.querySelector('.btn-reset');
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const scoreP0 = document.getElementById('score-0');
const scoreP1 = document.getElementById('score-1');
const currentP0 = document.getElementById('current-0');
const currentP1 = document.getElementById('current-1');
const dice = document.querySelector('.dice');

// initial conditions
let currentScore, activePlayer, Playing, scores;

const init = function () {
  scoreP0.textContent = 0;
  scoreP1.textContent = 0;
  currentP0.textContent = 0;
  currentP1.textContent = 0;

  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  Playing = true;

  dice.classList.add('hidden');
  player0.classList.add('player-active');
  player1.classList.remove('player-active');
  player0.classList.remove('player-winner');
  player1.classList.remove('player-winner');
  document.querySelector(`.cur-${activePlayer}`).classList.remove('hidden');
};

init();

const changePlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
};

// roll dice
btnRoll.addEventListener('click', function () {
  if (Playing) {
    const rolledNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${rolledNumber}.png`;
    dice.classList.remove('hidden');
    // Updating the current score
    currentScore += rolledNumber;
    // currentP0.textContent = currentScore;

    if (rolledNumber != 1) {
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
});

// Hold buton Implemtation
btnHold.addEventListener('click', function () {
  if (Playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      Playing = false;
      dice.classList.add('hidden');
      document.querySelector(`#score-${activePlayer}`).textContent = 'Winner';
      document.querySelector(`.cur-${activePlayer}`).classList.add('hidden');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');
    } else {
      changePlayer();
    }
  }
});

btnReset.addEventListener('click', init);
