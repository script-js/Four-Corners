var eliminatedRooms = [];

if (localStorage.getItem("game")) {
    var gameSettings = JSON.parse(localStorage.getItem("game"))
    gameSettings.areas.forEach(function (a) {
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
    if (!eliminatedRooms.includes(gameSettings.areas[index])) {
        startfx(spinSound)
        if (gameSettings.st) {
            if (index > 0) {
                executeScene(gameSettings.stdata[gameSettings.areas[index - 1]].off)
            } else {
                executeScene(gameSettings.stdata[gameSettings.areas[gameSettings.areas.length - 1]].off)
            }
            executeScene(gameSettings.stdata[gameSettings.areas[index]].on)
        }
        try {
            Array.from(circles.querySelectorAll(".selected")).forEach(function (c) { c.classList = "circle" })
            document.getElementById(gameSettings.areas[index]).classList = "circle selected"
        } catch { }
        mainText.innerText = gameSettings.areas[index];
        var currentDelay = delay;
    } else {
        var currentDelay = 1;
    }
    if (currentDelay < 1100) {
        if (index >= (gameSettings.areas.length - 1)) {
            setTimeout(function () { chooser(0, delay + timeAddition) }, currentDelay)
        } else {
            setTimeout(function () { chooser(index + 1, delay + timeAddition) }, currentDelay)
        }
    } else {
        setTimeout(function () { eliminate(gameSettings.areas[index]) }, currentDelay)
    }
}

function eliminate(area) {
    if (gameSettings.st) {
        executeScene(gameSettings.stdata[area].lose)
    }
    startfx(loseSound)
    document.getElementById(area).style.background = "red"
    setTimeout(function () {
        buttons.style.display = "inline"
    }, 1000)
    if (gameSettings.removeRooms) {
        eliminatedRooms.push(area)
    }
    if ((gameSettings.areas.length - eliminatedRooms.length) < 2) {
        startFinal.style.display = "none";
    }
}

function startTimer() {
    if (!gameSettings.removeRooms) {
        Array.from(circles.querySelectorAll(".circle")).forEach(function (c) { c.style.background = ""; c.classList = "circle"; })
    } else {
        if ((gameSettings.areas.length - eliminatedRooms.length) < 2) {
            finalRound();
            return;
        }
    }
    buttons.style.display = "none"
    if (gameSettings.time > 0) {
        startfx(timerSound)
        mainText.innerText = gameSettings.time;
        var interval = setInterval(function () {
            mainText.innerHTML--;
            if (parseInt(mainText.innerHTML) < 1) {
                clearInterval(interval)
                timerSound.pause()
                ringSound.volume = 1
                startfx(ringSound)
                setTimeout(function () { chooser(Math.floor(Math.random() * gameSettings.areas.length), 300) }, 2200)
            }
        }, 1000)
    } else {
        chooser(Math.floor(Math.random() * gameSettings.areas.length), 300)
    }
}

function startfx(sound) {
    sound.currentTime = 0;
    sound.play()
}

function finalRound() {
    Array.from(circles.querySelectorAll(".circle")).forEach(function (c) {
        if (!gameSettings.final.areas.includes(c.id)) {
            c.remove();
        }
    })
    gameSettings.time = gameSettings.final.time;
    gameSettings.areas = gameSettings.final.areas;
    eliminatedRooms = [];
    gameSettings.removeRooms = false;
    startFinal.style.display = "none";
    startTimer();
}