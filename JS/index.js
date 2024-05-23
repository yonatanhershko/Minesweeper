

function onInit() {
    gLevel
    gGameOver = false
    gIsFirstClick = true
    gLives = 3
    gBestScore = 0
    gCountFlag = 0
    gBoard = buildBoard()
    renderBoard(gBoard)
    resetTimer()
    newGame()
}

function buildBoard() {
    var board = []
    gCount = 0
    var numBombs = getNumBombsLevel(gLevel)

    for (var i = 0; i < gLevel; i++) {
        board.push([]);
        for (var j = 0; j < gLevel; j++) {
            board[i][j] = EMPTY
        }
    }

    for (var k = 0; k < numBombs;) {
        var randI = getRandomInt(0, gLevel)
        var randJ = getRandomInt(0, gLevel)
        if (board[randI][randJ] !== BOMB) {
            board[randI][randJ] = BOMB
            k++
            gCountFlag++
        }
    }
    for (var i = 0; i < gLevel; i++) {
        for (var j = 0; j < gLevel; j++) {
            if (board[i][j] !== BOMB) {
                gCount++
            }
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'

        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var className = cell
            strHTML += `<td class="hidden"
            class="${className}"
                            onclick="cellClicked(this,${i},${j})"
                            oncontextmenu="onRightClickCell(event,${i},${j})"
                            data-i="${i}" data-j="${j}">
                            ${cell}
                        </td>`
        }
        strHTML += '</tr>'
    }

    var elBoard = document.querySelector('.table')
    elBoard.innerHTML = strHTML
}

function onRightClickCell(event, cellI, cellJ) {
    if (gGameOver) return
    event.preventDefault()
    var clickFlag = document.querySelector('[data-i="' + cellI + '"][data-j="' + cellJ + '"]')

    if (isFlag) {
        clickFlag.classList.add('isFlagged')
        if (gBoard[cellI][cellJ] === BOMB) {/// conect the bomb to the flag 
            gCountFlag--
            console.log('work', gCountFlag)
        }
    } else {
        clickFlag.classList.remove('isFlagged')
    } isFlag = !isFlag

    if (gCount === 0 && gCountFlag === 0) {
        Victory()
    }
    return false
}

function cellClicked(elCell, cellI, cellJ) {
    if (gGameOver) return

    var removeLayer = document.querySelector('[data-i="' + cellI + '"][data-j="' + cellJ + '"]')
    if (removeLayer.classList.contains('hidden')) {
        removeLayer.classList.remove('hidden')
    } else {
        return
    }/// won't repeat using hidden layer 

    var minesNear = document.querySelector('[data-i="' + cellI + '"][data-j="' + cellJ + '"]')
    var mineCount = setMinesNegsCount(cellI, cellJ)

    gNewGameIcon = document.querySelector('.new-game')

    if (gIsFirstClick) {
        gIsFirstClick = false
        startTimer()
    }

    if (gBoard[cellI][cellJ] === BOMB) {
        gLives--
        updateLivesDisplay()
        if (gLives > 0) {
            ChangeFace()
        }
        else if (gLives <= 0) {
            gameOver()
            console.log('game over')
        }
    } else if (gBoard[cellI][cellJ] === EMPTY) {
        score(1)
        gCount--
        minesNear.innerText = mineCount
    }
    if (gCount === 0 && gCountFlag === 0) {
        Victory()
    }/// theres 2 for 2 case of winning 
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
    return gBombsAround
}




