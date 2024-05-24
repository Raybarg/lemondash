var logo;
var brick;
var dirt;
var lemon;
var project;
var nerd;

var movingObjects = [];

var dashmap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 2, 2, 2, 2, 2, 2, 4, 1],
    [1, 4, 2, 2, 2, 2, 2, 2, 0, 1],
    [1, 2, 2, 2, 3, 1, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 0, 1],
    [1, 4, 0, 0, 0, 2, 2, 2, 4, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

playerX = 1;
playerY = 1;
playerIsMoving = false;
playerStopped = false;
playerDrawX = 1;
playerDrawY = 1;
playerDestX = 1;
playerDestY = 1;

function preload() {
    brick = loadImage("./assets/brick.png");
    dirt = loadImage("./assets/dirt.png");
    lemon = loadImage("./assets/lemon.png");
    project = loadImage("./assets/project.png");
    nerd = loadImage("./assets/nerd.png");
}

function setup() {
    createCanvas(800, 600);
    //pixelDensity(1);
    
}

function draw() {
    movement();
    handleMovingObjects();
    background(128);
    // draw the map
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (dashmap[i][j] == 0) {
                
            } else if (dashmap[i][j] == 1) {
                image(brick, i * 32, j * 32);
            } else if (dashmap[i][j] == 2) {
                image(dirt, i * 32, j * 32);
            } else if (dashmap[i][j] == 3) {
                image(project, i * 32, j * 32);
            } else if (dashmap[i][j] == 4) {
                image(lemon, i * 32, j * 32);
            }
        }
    }
    image(nerd, playerDrawX * 32, playerDrawY * 32);
    drawMovingObjects();
    handleFallingObjects();
}

function movement() {
    playerStopped = false;
    if(!playerIsMoving) {
        if (keyIsDown(LEFT_ARROW)) {
            handleMovement(playerX - 1, playerY);
            handlePush(playerX - 1, playerY, playerX - 2, playerY);
        }
        if (keyIsDown(RIGHT_ARROW)) {
            handleMovement(playerX + 1, playerY);
            handlePush(playerX + 1, playerY, playerX + 2, playerY);
        }
        if (keyIsDown(UP_ARROW)) {
            handleMovement(playerX, playerY - 1);
            handlePush(playerX, playerY - 1, playerX, playerY - 2);
        }
        if (keyIsDown(DOWN_ARROW)) {
            handleMovement(playerX, playerY + 1);
            handlePush(playerX, playerY + 1, playerX, playerY + 2);
        }
    } else {
        if(playerDrawX < playerDestX && playerDestX > playerX) {
            playerDrawX += 0.1;
        } else if(playerDrawX > playerDestX && playerDestX < playerX) {
            playerDrawX -= 0.1;
        } else if(playerDrawY < playerDestY && playerDestY > playerY) {
            playerDrawY += 0.1;
        } else if(playerDrawY > playerDestY && playerDestY < playerY) {
            playerDrawY -= 0.1;
        } else {
            playerStop();
        }
    }
}

function playerStop() {
    playerIsMoving = false;
    playerX = playerDestX;
    playerY = playerDestY;
    playerDrawX = playerX;
    playerDrawY = playerY;
    playerStopped = true;
}

function handleMovement(x, y) {
    if(!playerIsMoving && dashmap[x][y] == 2 || dashmap[x][y] == 0) {
        playerIsMoving = true;
        playerDestX = x;
        playerDestY = y;
        dashmap[x][y] = 0;
    } else if (dashmap[x][y] == 4) {
        dashmap[x][y] = 0;
        playerDestX = x;
        playerDestY = y;
    }
}

function handlePush(x, y, bx, by) {
    if (dashmap[x][y] == 3 && dashmap[bx][by] == 0) {
        playerIsMoving = true;
        playerDestX = x;
        playerDestY = y;
        addMovingObject(x, y, bx, by, 3);
        dashmap[x][y] = 0;
    }
}

function addMovingObject(x, y, dx, dy, type) {
    movingObjects.push({objectX: x, objectY: y, destX: dx, destY: dy, drawX: x, drawY: y, objectType: type});
}

function handleMovingObjects() {
    for (var i = 0; i < movingObjects.length; i++) {
        if (movingObjects[i].destX === playerDestX && movingObjects[i].destY === playerDestY) {
            console.log("bam!");
        }
        if (movingObjects[i].destX === playerX && movingObjects[i].destY === playerY) {
            console.log("bam!");
        }

        if (movingObjects[i].objectType === 3 || movingObjects[i].objectType === 4) {
            if (movingObjects[i].drawX < movingObjects[i].destX && movingObjects[i].destX > movingObjects[i].objectX) {
                movingObjects[i].drawX += 0.1;
            } else if (movingObjects[i].drawX > movingObjects[i].destX && movingObjects[i].destX < movingObjects[i].objectX) {
                movingObjects[i].drawX -= 0.1;
            } else if (movingObjects[i].drawY < movingObjects[i].destY && movingObjects[i].destY > movingObjects[i].objectY) {
                movingObjects[i].drawY += 0.1;
            } else if (movingObjects[i].drawY > movingObjects[i].destY && movingObjects[i].destY < movingObjects[i].objectY) {
                movingObjects[i].drawY -= 0.1;
            } else {
                dashmap[movingObjects[i].destX][movingObjects[i].destY] = movingObjects[i].objectType;
                movingObjects.splice(i, 1);
            }
        }
    }
}

function drawMovingObjects() {
    for (var i = 0; i < movingObjects.length; i++) {
        if (movingObjects[i].objectType === 3) {
            image(project, movingObjects[i].drawX * 32, movingObjects[i].drawY * 32);
        }
        if (movingObjects[i].objectType === 4) {
            image(lemon, movingObjects[i].drawX * 32, movingObjects[i].drawY * 32);
        }
    }
}

function handleFallingObjects() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (dashmap[i][j] == 4 || dashmap[i][j] == 3) {
                if (dashmap[i][j+1] === 0 && (i != playerDestX || j+1 != playerDestY) && !playerStopped) {
                    addMovingObject(i, j, i, j+1, dashmap[i][j]);
                    dashmap[i][j] = 0;
                }
            } 
        }
    }
}