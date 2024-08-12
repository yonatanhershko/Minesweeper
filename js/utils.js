

function countNegs(cellI, cellJ, mat) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue
            if (i === cellI && j === cellJ) continue

            if (mat[i][j] === LIFE) negsCount++
        }
    }
    return negsCount
}

function startTimer() {
    gStartTime = Date.now()
    gTimerInterval = setInterval(() => {
        var elapsedTime = Date.now() - gStartTime
        var minutes = Math.floor(elapsedTime / 60000)
        var seconds = Math.floor((elapsedTime % 60000) / 1000)
        var formattedTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds
        var elSpan = document.querySelector('.timer')
        elSpan.innerText = formattedTime
    }, 1000)
}

function resetTimer() {
    gFirstClick = true
    clearInterval(gTimerInterval)
    var elSpan = document.querySelector('.timer')
    elSpan.innerText = '0.00'
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

function playSound() {
	const sound = new Audio('IMG/worlds-smallest-violin.mp3')
	sound.play()
}

