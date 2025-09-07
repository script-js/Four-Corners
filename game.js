if (localStorage.getItem("game")) {
    var gameSettings = JSON.parse(localStorage.getItem("game"))
} else {
    //location.replace("setup")
}

function chooser(index, delay) {
    startfx(spinSound)
    if (gameSettings.st) {
        if (index > 0) {
            executeScene(gameSettings.stdata[gameSettings.areas[index - 1]].off)
        }
        executeScene(gameSettings.stdata[gameSettings.areas[index]].on)
    }
    console.log(index)
    mainText.innerText = gameSettings.areas[index]
    if (delay < 1100) {
        if (index >= (gameSettings.areas.length - 1)) {
            setTimeout(function () { chooser(0, delay + 50) }, delay)
        } else {
            setTimeout(function () { chooser(index + 1, delay + 50) }, delay)
        }
    } else {
        setTimeout(function () { eliminate(gameSettings.areas[index]) }, delay)
    }
}

function eliminate(area) {
    if (gameSettings.st) {
        executeScene(gameSettings.stdata[area].lose)
    }
    startfx(loseSound)
    console.log(area)
}

function startTimer() {
    startfx(timerSound)
    mainText.innerText = gameSettings.time;
    var interval = setInterval(function () {
        mainText.innerHTML--;
        if (parseInt(mainText.innerHTML) < 1) {
            clearInterval(interval)
            timerSound.pause()
            ringSound.volume = 1
            startfx(ringSound)
            setTimeout(function() {chooser(0, 300)}, 2200)
        }
    }, 1000)
}

function startfx(sound) {
    sound.currentTime = 0;
    sound.play()
}