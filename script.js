const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const targetDateTime = document.getElementById('targetDateTime');
const countdownDisplay = document.getElementById('countdownDisplay');

let interval;
let timeRemaining; // To keep track of the time remaining when paused

function startTimer(duration) {
    const end = Date.now() + duration;
    if (interval) clearInterval(interval); // Clear any existing intervals

    interval = setInterval(function() {
        timeRemaining = end - Date.now();
        if (timeRemaining <= 0) {
            clearInterval(interval);
            countdownDisplay.innerHTML = "Time's Up!";
            pauseButton.disabled = true;
            resumeButton.disabled = true;
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Update the countdown display
        countdownDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

startButton.addEventListener('click', function() {
    const targetDate = new Date(targetDateTime.value).getTime();
    const now = new Date().getTime();
    const duration = targetDate - now;

    if (duration <= 0) {
        alert("Please enter a future date and time.");
        return;
    }

    timeRemaining = duration;
    startTimer(timeRemaining);
    this.disabled = true; // Disable start button
    pauseButton.disabled = false; // Enable pause button
});

pauseButton.addEventListener('click', function() {
    if (interval) clearInterval(interval); // Pause the countdown
    this.disabled = true; // Disable pause button
    resumeButton.disabled = false; // Enable resume button
});

resumeButton.addEventListener('click', function() {
    startTimer(timeRemaining); // Resume the countdown with the remaining time
    this.disabled = true; // Disable resume button
    pauseButton.disabled = false; // Enable pause button
});