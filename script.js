const startButton = document.getElementById('startButton');
const targetDateTime = document.getElementById('targetDateTime');
const countdownDisplay = document.getElementById('countdownDisplay');

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

startButton.addEventListener('click', function() {
    const targetValue = targetDateTime.value;
    const targetDate = new Date(targetValue.replace(/-/g, '/'));
    
    // Check if the date is valid
    if (!isValidDate(targetDate)) {
        alert("Please enter the date and time in the correct format (dd/mm/yyyy hh:mm) and ensure it is a future date.");
        return; // Exit the function if the date is not valid
    }

    // Check if the date is in the future
    if (targetDate < new Date()) {
        alert("Please enter a future date and time.");
        return; // Exit the function if the date is not in the future
    }

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
