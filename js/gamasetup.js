
heartIcons = document.querySelector('.Lives')
var currNum = document.querySelector('.best-score')

var bestCurrScore = {
    score: 0,
}

function chooseLevelSize(elBtn) {
    var size = +elBtn.dataset.size
    gLevel = size
    bestCurrScore.score = 0
    currNum.innerText = 0
    onInit()
}

function gameOver() {
    playSound()
    gGameOver = true
    resetTimer()
    gNewGameIcon.innerHTML = deadFace
}

function ChangeFace() {
    setTimeout(() => {
        gNewGameIcon.innerHTML = sadFace
    }, 100)
    setTimeout(() => {
        gNewGameIcon.innerHTML = happyFace
    }, 1000)
}

function newGame() {
    heartIcons.innerText = '❤️❤️❤️'
    gNewGameIcon.innerHTML = happyFace
    gRestScore.innerText = 0
    resetTimer()
}

function Victory() {
    console.log('win');
    gNewGameIcon.innerHTML = WinFace
    gGameOver = true
    resetTimer()
}

function updateLivesDisplay() {
    if (gLives === 3) {
        heartIcons.innerText = '❤️❤️❤️'
    } else if (gLives === 2) {
        heartIcons.innerText = '❤️❤️💔'

    } else if (gLives === 1) {
        heartIcons.innerText = '❤️💔💔'
    } else if (gLives === 0) {
        heartIcons.innerText = '💔💔💔'
    }
}

function getNumBombsLevel(level) {
    switch (level) {
        case 4:
            return 3
        case 8:
            return 14
        case 12:
            return 32
        default:
            return 2
    }
}

function score(diff) {
    gBestScore += diff
    gRestScore = document.querySelector('.score')
    gRestScore.innerText = gBestScore
    saveBestScore()
}

function saveBestScore() {
    if (gBestScore > bestCurrScore.score) {
        bestCurrScore.score = gBestScore
    }
    currNum.innerText = bestCurrScore.score
}

function toggleDarkMode() {
    var body = document.body
    body.classList.toggle('darkbt')
    var tableNight = document.querySelector('table')
    tableNight.classList.toggle('darktable')
    // console.log('great change mode')
}

function replaceBombs(board, firstClickedI, firstClickedJ) {
    var numBombs = getNumBombsLevel(gLevel)
    for (var k = 0; k < numBombs; ) {
        var randI = getRandomInt(0, gLevel)
        var randJ = getRandomInt(0, gLevel)
        if (randI !== firstClickedI || randJ !== firstClickedJ) {//place the bombs only after the first click
            if (board[randI][randJ] !== BOMB) {
                board[randI][randJ] = BOMB
                k++
                gCountFlag++
            }
        }
    }
    for (var i = 0; i < gLevel; i++) {
        for (var j = 0; j < gLevel; j++) {
            if (board[i][j] !== BOMB) {
                gCount++
            }
        }
    }
}


