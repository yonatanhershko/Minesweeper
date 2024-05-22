
///Still working on it


/// objects
const FLAG = '🏳️'
const BOMB = '💣'
const EMPTY = 'X'
const happyFace = '🙂'
const sadFace = '😵'
const deadFace = '☠️'
const WinFace = '✌️'
var heartIcons


//global
var gBoard
var gLevel = 4
var gBombsAround
var gLives
var removeLayers


//timers and randoms
// var timerInterval
var gStartTime
var newGameIcon
var gTimerInterval
var gTimerFirstClick = true


onInit()
function onInit() {
    gLevel 
    gLives = 3
    gBoard = buildBoard()
    renderBoard(gBoard)
    resetTimer()
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
    if (gTimerFirstClick) {
        startTimer()
        gTimerFirstClick = false
    }

    var removeLayer = document.querySelector('[data-i="' + cellI + '"][data-j="' + cellJ + '"]')
     removeLayers = removeLayer.classList.remove('hiddin')

    var minesNear = document.querySelector('[data-i="' + cellI + '"][data-j="' + cellJ + '"]')
    var mineCount = setMinesNegsCount(cellI, cellJ)

    newGameIcon = document.querySelector('.new-game')
    gStartTime = document.querySelector('timer')


    if (gBoard[cellI][cellJ] === BOMB) {
        gLives--
        // console.log(gLives,'nums');
        updateLivesDisplay()
        if (gLives > 2) {
            ChangeFace()
        }
        else if (gLives <= 0) {
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

