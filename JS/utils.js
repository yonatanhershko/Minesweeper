
// function copyMat(mat) {
//     var newMat = []
//     for (var i = 0; i < mat.length; i++) {
//         newMat[i] = []
//         for (var j = 0; j < mat[0].length; j++) {
//             newMat[i][j] = mat[i][j]
//         }
//     }
//     return newMat
// }

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

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

function getNum() {
    gNums = []
    for (var i = 1; i <= gLevel ** 2; i++) {
        gNums.push(i)
    }
}

// function drawNum() {
//     var randIdx = getRandomInt(0, gNums.length)
//     var num = gNums[randIdx]
//     gNums.splice(randIdx, 1)
//     return num
// }

function startTimer() {
    var seconds = 0;
    var timerDisplay = document.querySelector('.timer')
    timerInterval = setInterval(function() {
        seconds++;
        var minutes = Math.floor(seconds / 60)
        var remainingSeconds = seconds % 60
        var displayMinutes = minutes < 10 ? '0' + minutes : minutes
        var displaySeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds
        timerDisplay.textContent = displayMinutes + ':' + displaySeconds
    }, 1000);
}
