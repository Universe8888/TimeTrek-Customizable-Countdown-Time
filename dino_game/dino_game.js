document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const gameContainer = document.getElementById('gameContainer');
    const startGameButton = document.getElementById('startGameButton');

    let isJumping = false;
    let isGameStarted = false;
    let cacti = [];

    function jump() {
        if (isJumping || !isGameStarted) return;
        isJumping = true;
        let position = parseInt(window.getComputedStyle(dino).bottom);
        const jumpHeight = 150; // Adjust to change jump height
        const jumpSpeed = 20; // Speed at which the dino ascends
        const fallSpeed = 30; // Speed at which the dino descends, increase to slow down the fall
    
        const jumpInterval = setInterval(() => {
            if (position < jumpHeight) {
                position += 5; // Increase '5' to make dino jump faster
                dino.style.bottom = position + 'px';
            } else {
                // When the peak is reached, clear the interval and start the fall
                clearInterval(jumpInterval);
                const fallInterval = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                        dino.style.bottom = '0px'; // Reset to ground position
                    } else {
                        position -= 4; // Decrease '5' to make dino fall slower
                        dino.style.bottom = position + 'px';
                    }
                }, fallSpeed);
            }
        }, jumpSpeed);
    }
    
    function spawnCactus() {
        const cactus = document.createElement('div');
        cactus.classList.add('cactus');
        gameContainer.appendChild(cactus);
        cactus.style.right = '-20px'; // Start off-screen
        cacti.push(cactus);
    }

    function moveCacti() {
        cacti.forEach((cactus, index) => {
            let cactusPosition = parseInt(cactus.style.right);
            // Move the cactus if game is started
            if (isGameStarted) {
                cactusPosition += 3;
                cactus.style.right = cactusPosition + 'px';
            }

            // Remove the cactus if it goes beyond the screen
            if (cactusPosition > gameContainer.offsetWidth) {
                gameContainer.removeChild(cactus);
                cacti.splice(index, 1);
            }
        });
    }

    function checkCollision() {
        for (let cactus of cacti) {
            const dinoRect = dino.getBoundingClientRect();
            const cactusRect = cactus.getBoundingClientRect();

            if (
                cactusRect.left < dinoRect.right &&
                cactusRect.right > dinoRect.left &&
                cactusRect.top < dinoRect.bottom &&
                cactusRect.bottom > dinoRect.top
            ) {
                return true;
            }
        }
        return false;
    }

    function gameLoop() {
        if (checkCollision()) {
            endGame();
        } else {
            moveCacti();
        }
    }

    function endGame() {
        isGameStarted = false;
        startGameButton.style.display = 'block';
        cacti.forEach(cactus => {
            cactus.remove(); // Remove all cacti
        });
        cacti = []; // Reset the cacti array
        clearInterval(gameInterval); // Clear the game loop interval
        alert('Game Over');
    }

    let gameInterval;

    function startGame() {
        if (!isGameStarted) {
            isGameStarted = true;
            startGameButton.style.display = 'none';
            gameContainer.style.display = 'block';
            dino.style.bottom = '0px'; // Ensure dino is on the ground

            // Start the game loop
            gameInterval = setInterval(gameLoop, 50);
            // Spawn a new cactus at intervals
            setInterval(() => {
                if (isGameStarted) spawnCactus();
            }, 4000); // Adjust timing
        }
    }

    startGameButton.addEventListener('click', startGame);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            jump();
        }
    });
});