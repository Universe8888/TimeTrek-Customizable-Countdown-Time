const startButton = document.getElementById('startButton');
const targetDateTime = document.getElementById('targetDateTime');
const countdownDisplay = document.getElementById('countdownDisplay');

startButton.addEventListener('click', function() {
    const targetDate = new Date(targetDateTime.value);
    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const { days, hours, minutes, seconds } = {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };

        countdownDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(interval);
            countdownDisplay.innerHTML = "Time's Up!";
        }
    }, 1000);
});
