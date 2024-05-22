


/// objects
const FLAG = '🏳️'
const BOMB = '💣'
const EMPTY = 'X'
const happyFace = '🙂'
const sadFace = '😵'
const deadFace = '☠️'
var heartIcons


//global
var gBoard
var gLevel
var gBombsAround
var gLives


//timers and randoms
// var timerInterval
var gCurrTimer
var newGameIcon
var timerInterval


onInit()
function onInit() {
    gLevel = 4
    gLives = 3
    gBoard = buildBoard()
    renderBoard(gBoard)
    newGame()

}

// console.table(buildBoard());
function buildBoard() {
    var board = []
    for (var i = 0; i < gLevel; i++) {
        board.push([])
        for (var j = 0; j < gLevel; j++) {
            board[i][j] = EMPTY
            board[i][j] = (Math.random() > 0.9) ? BOMB : EMPTY
        }
    }

    board[3][2] = BOMB
    board[1][3] = BOMB
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'

        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var className = cell
            strHTML += `<td class="hiddin"
            class="${className}"
                            onclick="cellClicked(this,${i},${j})"
                            data-i="${i}" data-j="${j}">
                            ${cell}
                        </td>`
        }
        strHTML += '</tr>'
    }


    var elBoard = document.querySelector('.table')
    elBoard.innerHTML = strHTML

}

// conect the click to the function//
function cellClicked(elCell, cellI, cellJ) {
    startTimer()

    var removeLayer = document.querySelector('[data-i="' + cellI + '"][data-j="' + cellJ + '"]')
    removeLayer.classList.remove('hiddin')

    var minesNear = document.querySelector('[data-i="' + cellI + '"][data-j="' + cellJ + '"]')
    var mineCount = setMinesNegsCount(cellI, cellJ)

    newGameIcon = document.querySelector('.new-game')
    gCurrTimer = document.querySelector('timer')


    if (gBoard[cellI][cellJ] === BOMB) {
        gLives--
        // console.log(gLives,'nums');
        updateLivesDisplay()
        if (gLives > 0) {
            ChangeFace()
        }
        else if (gLives === 0) {
            gameOver()
            console.log('game over')
        }
    } else if (gBoard[cellI][cellJ] === EMPTY) {
        minesNear.innerText = mineCount
    }
}

function setMinesNegsCount(cellI, cellJ) {
    gBombsAround = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if (i === cellI && j === cellJ) continue
            if (gBoard[i][j] === BOMB) gBombsAround++
        }
    }
    // console.log('great', gBombsAround);
    return gBombsAround
}

function gameOver() {
    clearInterval(timerInterval)
    newGameIcon.innerText = deadFace
}

function newGame() {
    heartIcons.innerText = '❤️❤️❤️'
    newGameIcon.innerText = happyFace
    clearInterval(timerInterval)
}

function updateLivesDisplay() {
    heartIcons = document.querySelector('.Lives');
    if (gLives === 3) {
        heartIcons.innerText = '❤️❤️❤️'
    } else if (gLives === 2) {
        heartIcons.innerText = '❤️❤️'

    } else if (gLives === 1) {
        heartIcons.innerText = '❤️'
    } else if (gLives === 0) {
        heartIcons.innerText = '🌀🌀🌀'
    }
}

function ChangeFace() {
    setTimeout(() => {
        newGameIcon.innerText = sadFace
    }, 100)
    setTimeout(() => {
        newGameIcon.innerText = happyFace
    }, 2000)

}

