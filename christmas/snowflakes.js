function createSnowflakes() {
    const numberOfSnowflakes = 50; // Number of snowflakes
    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.innerHTML = '❄';
        snowflake.classList.add('snowflake');
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = Math.random() * 3 + 5 + 's'; // Snowflakes fall at random speeds
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = Math.random() * 20 + 10 + 'px'; // Random snowflake size
        document.body.appendChild(snowflake);
    }
}

// Start creating snowflakes when the window is loaded
window.onload = createSnowflakes;

// Path: christmas/snowflakes.css