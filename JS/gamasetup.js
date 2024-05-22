

function chooseLevelSize(elBtn) {
    var size = +elBtn.dataset.size
    gLevel = size
    onInit()
}

function gameOver() {
    resetTimer()
    newGameIcon.innerText = deadFace
}

function isGameOver() {
    return gLives > 2
}

function newGame() {
    heartIcons.innerText = '❤️❤️❤️'
    newGameIcon.innerText = happyFace
    resetTimer()
}

function Victory() {
    for (var i = 0; i < gLevel; i++) {
        for (var j = 0; j < gLevel; j++)
            if (gBoard[i][j] !== BOMB && gBoard[i][j] !== removeLayers) {
                newGameIcon.innerText = WinFace
                resetTimer()
            }
}
}

function updateLivesDisplay() {
    heartIcons = document.querySelector('.Lives');
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

function ChangeFace() {
    if (!isGameOver()){
    setTimeout(() => {
        newGameIcon.innerText = sadFace
    }, 100)
    setTimeout(() => {
        newGameIcon.innerText = happyFace
    }, 2000)
    }
}


