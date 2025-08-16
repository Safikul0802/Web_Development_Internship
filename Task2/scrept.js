window.onload = function () {
    let startTime;
    let updatedTime;
    let difference = 0;
    let timerInterval;
    let running = false;

    const display = document.getElementById("display");
    const startBtn = document.getElementById("startBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resetBtn = document.getElementById("resetBtn");
    const lapBtn = document.getElementById("lapBtn");
    const laps = document.getElementById("laps");

    function updateDisplay() {
        updatedTime = new Date().getTime() - startTime + difference;

        let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((updatedTime / 1000) % 60);
        let milliseconds = Math.floor((updatedTime % 1000) / 10);

        display.textContent =
            (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds) + "." +
            (milliseconds < 10 ? "0" + milliseconds : milliseconds);
    }

    startBtn.addEventListener("click", function () {
        if (!running) {
            startTime = new Date().getTime();
            timerInterval = setInterval(updateDisplay, 10);
            running = true;
        }
    });

    pauseBtn.addEventListener("click", function () {
        if (running) {
            clearInterval(timerInterval);
            difference += new Date().getTime() - startTime;
            running = false;
        }
    });

    resetBtn.addEventListener("click", function () {
        clearInterval(timerInterval);
        display.textContent = "00:00:00.00";
        difference = 0;
        running = false;
        laps.innerHTML = "";
    });

    lapBtn.addEventListener("click", function () {
        if (running) {
            const li = document.createElement("li");
            li.textContent = display.textContent;
            laps.appendChild(li);
        }
    });
};
