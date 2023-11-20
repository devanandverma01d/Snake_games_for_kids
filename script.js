// script.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let direction = 'right';
    let food = generateFood();
    let gameInterval;

    function createBoard() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                board.appendChild(cell);
            }
        }
    }

    function drawSnake() {
        document.querySelectorAll('.snake').forEach((segment) => {
            segment.classList.remove('snake');
        });

        snake.forEach((segment) => {
            const index = segment.x + segment.y * gridSize;
            const cell = board.childNodes[index];
            cell.classList.add('snake');
        });
    }

    function drawFood() {
        const index = food.x + food.y * gridSize;
        const cell = board.childNodes[index];
        cell.classList.add('food');
    }

    function removeFood() {
        const index = food.x + food.y * gridSize;
        const cell = board.childNodes[index];
        cell.classList.remove('food');
    }

    function generateFood() {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        return { x, y };
    }

    function update() {
        const head = { ...snake[0] };

        switch (direction) {
            case 'up':
                head.y = (head.y - 1 + gridSize) % gridSize;
                break;
            case 'down':
                head.y = (head.y + 1) % gridSize;
                break;
            case 'left':
                head.x = (head.x - 1 + gridSize) % gridSize;
                break;
            case 'right':
                head.x = (head.x + 1) % gridSize;
                break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            removeFood();
            food = generateFood();
        } else {
            snake.pop();
        }

        drawSnake();
        drawFood();
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }

    function startGame() {
        if (!gameInterval) {
            gameInterval = setInterval(update, 200);
        }
    }

    function stopGame() {
        if (gameInterval) {
            clearInterval(gameInterval);
            gameInterval = null;
        }
    }

    createBoard();
    drawSnake();
    drawFood();

    startButton.addEventListener('click', startGame);
    stopButton.addEventListener('click', stopGame);
    document.addEventListener('keydown', handleKeyPress);
});
