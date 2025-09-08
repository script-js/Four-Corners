if (localStorage.getItem("game")) {
    var gameSettings = JSON.parse(localStorage.getItem("game"))
    gameSettings.areas.forEach(function(a) {
        var c = document.createElement("div");
        c.classList = "circle"
        c.id = a;
        circles.appendChild(c)
    });
} else {
    location.replace("setup")
}

function chooser(index, delay) {
    var timeAddition = Math.floor(Math.random() * (70 - 20 + 1)) + 20;
    console.log(timeAddition)
    startfx(spinSound)
    if (gameSettings.st) {
        if (index > 0) {
            executeScene(gameSettings.stdata[gameSettings.areas[index - 1]].off)
        } else {
            executeScene(gameSettings.stdata[gameSettings.areas[gameSettings.areas.length - 1]].off)
        }
        executeScene(gameSettings.stdata[gameSettings.areas[index]].on)
    }
    Array.from(circles.querySelectorAll(".circle")).forEach(function(c) {c.classList = "circle"; c.style.background = "";})
    circles.querySelector("#" + gameSettings.areas[index]).classList = "circle selected"
    mainText.innerText = gameSettings.areas[index]
    if (delay < 1100) {
        if (index >= (gameSettings.areas.length - 1)) {
            setTimeout(function () { chooser(0, delay + timeAddition) }, delay)
        } else {
            setTimeout(function () { chooser(index + 1, delay + timeAddition) }, delay)
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
    circles.querySelector("#" + area).style.background = "red"
    setTimeout(function() {
      start.style.display = "inline"
    }, 1000)
}

function startTimer() {
    start.style.display = "none"
    startfx(timerSound)
    mainText.innerText = gameSettings.time;
    var interval = setInterval(function () {
        mainText.innerHTML--;
        if (parseInt(mainText.innerHTML) < 1) {
            clearInterval(interval)
            timerSound.pause()
            ringSound.volume = 1
            startfx(ringSound)
            setTimeout(function() {chooser(Math.floor(Math.random() * gameSettings.areas.length), 300)}, 2200)
        }
    }, 1000)
}

function startfx(sound) {
    sound.currentTime = 0;
    sound.play()
}