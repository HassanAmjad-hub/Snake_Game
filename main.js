
let gameCanvas, screen;
const FPS = 10;
const tilesCount = 20;
let playerPosX = 10, playerPosY = 10;
let applePosX = 15, applePosY = 15;
let xVelocity = 0, yVelocity = 0;
let snakeBoxes = [];
let tailLength = 4;
let score = 0;

window.onload = function () {
    // get canvas object from DOM
    gameCanvas = document.getElementById('gameCanvas');
    // get canvas context (so we can use it for painting elements inside)
    screen = gameCanvas.getContext('2d');

    // add keyboard event listener
    document.addEventListener('keyup', onKeyUp);
    
    // run the game loop
    setInterval(() => {
        gameLoop();
    }, 1000 / FPS);
}

function gameLoop() {

    // move the player/snake
    playerPosX += xVelocity;
    playerPosY += yVelocity;

    // Keep the player on the canvas - Collision with walls
    if(playerPosX < 0) {    // if player goes beyond left boundary, appear on the right
        playerPosX = tilesCount - 1;
    }
    if(playerPosX > tilesCount - 1) {       // if player goes beyond right boundary, appear on the left
        playerPosX = 0;
    }
    if(playerPosY < 0) {        // if player goes beyond top boundary, appear at the bottom
        playerPosY = tilesCount - 1;
    }
    if(playerPosY > tilesCount - 1) {       // if player goes beyond bottom boundar, appear at the top
        playerPosY = 0;
    }

    // game screen background
    screen.fillStyle = '#000';
    screen.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    // showing snake
    screen.fillStyle = 'yellow';

    // loop through the snake body and add all boxes on the screen
    for(let i = 0 ; i < snakeBoxes.length; i++) {
        screen.fillRect(snakeBoxes[i].x * tilesCount, snakeBoxes[i].y * tilesCount ,tilesCount - 2, tilesCount - 2);

        // check if the snake collides with its own tail
        if(snakeBoxes[i].x === playerPosX && snakeBoxes[i].y === playerPosY) {
            tailLength = 4;   // reset the tail length

            // also, reset the coordinates to what was at the game start. set the velocities to 0
            playerPosX = 10;
            playerPosY = 10;
            xVelocity = 0;
            yVelocity = 0;

            score = 0;
        }
    }
    
    // create a snake body by adding every pixel where the player moves
    snakeBoxes.push({ x: playerPosX, y: playerPosY });

    while(snakeBoxes.length > tailLength) {
        snakeBoxes.shift();     // remove the first (or the oldest) box. Which means snake's tail
    }

    // showing apple
    screen.fillStyle = "red";
    screen.fillRect(applePosX * tilesCount, applePosY * tilesCount, tilesCount - 2, tilesCount - 2);

    // collision with apple - re-initiate apple somewhere else on the screen
    // if snake's head collides with apple
    if (playerPosX === applePosX && playerPosY === applePosY) {
        tailLength++;    // upon eating an apple, grow the snake's length
        applePosX = Math.floor(Math.random() * tilesCount);
        applePosY = Math.floor(Math.random() * tilesCount);
        score++;
    }

    screen.font="14px TimesNewRoman";
    screen.strokeStyle = 'white';
    screen.strokeText(`Score: ${score}`, 10, 20);

}

function onKeyUp(event) {
    switch(event.keyCode) {
        case 37:    // left
            xVelocity = -1;      // go left
            yVelocity = 0;      // no Y axis movement
            break;
        case 38:    // up
            yVelocity = -1;     // go up
            xVelocity = 0;      // no X axis movement
            break;
        case 39:    // right
            xVelocity = 1;      // go right
            yVelocity = 0;      // no Y axis movement
            break;
        case 40:    // down
            yVelocity = 1;      // go down
            xVelocity = 0;      // no X axis movement
            break;
    }
}