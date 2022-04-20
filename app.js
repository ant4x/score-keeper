//player 1

const player1 = {
    button: document.querySelector('#button1'),
    score: document.querySelector('#mainScore #scoreOne'),
    gamescore: document.querySelector('#scoreOneOverall'),
    nameinput: document.querySelector('#playerOneNameInput'),
    namedisplay: document.querySelector('#playerOneName')
}

//player 2

const player2 = {
    button: document.querySelector('#button2'),
    score: document.querySelector('#mainScore #scoreTwo'),
    gamescore: document.querySelector('#scoreTwoOverall'),
    nameinput: document.querySelector('#playerTwoNameInput'),
    namedisplay: document.querySelector('#playerTwoName')
}

const resetButton = document.querySelector('#resetButton');
const winningScoreSelect = document.querySelector('#selectScore');
const winningGameScoreSelect = document.querySelector('#selectScoreOverall');
let endScore = document.querySelector('#selectScore option:checked').value;
let gameScore = document.querySelector('#selectScoreOverall option:checked').value;
const confettiCanvas = document.querySelector('#my-canvas');
const gameOverModal = document.querySelector('#gameOverModal');
const modalButtonNo = document.querySelector('#modalButtonNo');
const modalButtonYes = document.querySelector('#modalButtonYes');

player1.nameinput.addEventListener('input', function () {
    player1.namedisplay.innerText = player1.nameinput.value;
})

player2.nameinput.addEventListener('input', function () {
    player2.namedisplay.innerText = player2.nameinput.value;
})

function updateScore(player, opponent) {
    if (player.score.innerText !== endScore) {
        player.score.innerText = `${parseInt(player.score.innerText) + 1}`;
        if (player.score.innerText === endScore) {
            if (player.score.innerText === endScore && player.score.innerText - opponent.score.innerText > 1) {
                player.button.disabled = 'true';
                opponent.button.disabled = 'true';
                player.score.classList.add('has-text-success');
                opponent.score.classList.add('has-text-danger');
                player.gamescore.innerText = `${parseInt(player.gamescore.innerText) + 1}`;
                if (player.gamescore.innerText === gameScore) {
                    player.gamescore.classList.add('has-text-success');
                    opponent.gamescore.classList.add('has-text-danger');
                    resetButton.disabled = true;
                    player.nameinput.disabled = true;
                    opponent.nameinput.disabled = true;
                    winningScoreSelect.disabled = true;
                    confettiCanvas.style.visibility = 'visible';
                    setTimeout(() => {
                        gameOverModal.classList.add('is-active');
                    }, 3000);
                }
            } else if (player.score.innerText === endScore && player.score.innerText - opponent.score.innerText === 1) {
                endScore = String(parseInt(endScore) + 1);
            }
        }
    }
}

player1.button.addEventListener('click', function () {
    updateScore(player1, player2);
});

player2.button.addEventListener('click', function () {
    updateScore(player2, player1);
});

resetButton.addEventListener('click', reset);

winningScoreSelect.addEventListener('change', function () {
    endScore = this.value;
    reset();
});

winningGameScoreSelect.addEventListener('change', function () {
    gameScore = this.value;
    resetButton.disabled = false;
    gameReset();
    reset();
});

function gameReset() {
    for (let p of [player1, player2]) {
        p.gamescore.innerText = '0';
        p.gamescore.classList = '';
        p.nameinput.disabled = false;
        p.nameinput.value = '';
    }
}

function reset() {
    for (let p of [player1, player2]) {
        p.score.innerText = '0';
        p.button.disabled = false;
        p.score.classList = '';
        endScore = winningScoreSelect.value;
        confettiCanvas.style.visibility = 'hidden';
    }
}

var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

modalButtonNo.addEventListener('click', function () {
    gameOverModal.classList.remove('is-active');
});

modalButtonYes.addEventListener('click', function () {
    gameReset();
    reset();
    resetButton.disabled = false;
    gameOverModal.classList.remove('is-active');
});