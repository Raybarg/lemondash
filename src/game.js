import { gamemap } from "./gamemap.js";
import { player } from "./player.js";
import { assets } from "./assets.js";

class game {
    constructor(p5) {
        this.map = new gamemap();
        this.player = new player();
        this.movingObjects = [];
    }

    preload(p5) {
        this.assets = new assets(p5);
    }

    draw(p5) {
        p5.background(128);
        // draw the map
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                if (this.map.data[i][j] == 0) {
                    
                } else if (this.map.data[i][j] == 1) {
                    p5.image(this.assets.brick, i * 32, j * 32);
                } else if (this.map.data[i][j] == 2) {
                    p5.image(this.assets.dirt, i * 32, j * 32);
                } else if (this.map.data[i][j] == 3) {
                    p5.image(this.assets.project, i * 32, j * 32);
                } else if (this.map.data[i][j] == 4) {
                    p5.image(this.assets.lemon, i * 32, j * 32);
                }
            }
        }
        p5.image(this.assets.nerd, this.player.playerDrawX * 32, this.player.playerDrawY * 32);
    }

    movement(p5) {
        this.player.playerStopped = false;
        if(!this.player.playerIsMoving) {
            if (p5.keyIsDown(p5.LEFT_ARROW)) {
                this.handleMovement(this.player.playerX - 1, this.player.playerY);
                this.handlePush(this.player.playerX - 1, this.player.playerY, this.player.playerX - 2, this.player.playerY);
            }
            if (p5.keyIsDown(p5.RIGHT_ARROW)) {
                this.handleMovement(this.player.playerX + 1, this.player.playerY);
                this.handlePush(this.player.playerX + 1, this.player.playerY, this.player.playerX + 2, this.player.playerY);
            }
            if (p5.keyIsDown(p5.UP_ARROW)) {
                this.handleMovement(this.player.playerX, this.player.playerY - 1);
                this.handlePush(this.player.playerX, this.player.playerY - 1, this.player.playerX, this.player.playerY - 2);
            }
            if (p5.keyIsDown(p5.DOWN_ARROW)) {
                this.handleMovement(this.player.playerX, this.player.playerY + 1);
                this.handlePush(this.player.playerX, this.player.playerY + 1, this.player.playerX, this.player.playerY + 2);
            }
        } else {
            if(this.player.playerDrawX < this.player.playerDestX && this.player.playerDestX > this.player.playerX) {
                this.player.playerDrawX += 0.1;
            } else if(this.player.playerDrawX > this.player.playerDestX && this.player.playerDestX < this.player.playerX) {
                this.player.playerDrawX -= 0.1;
            } else if(this.player.playerDrawY < this.player.playerDestY && this.player.playerDestY > this.player.playerY) {
                this.player.playerDrawY += 0.1;
            } else if(this.player.playerDrawY > this.player.playerDestY && this.player.playerDestY < this.player.playerY) {
                this.player.playerDrawY -= 0.1;
            } else {
                this.player.stop();
            }
        }
    }

    handleMovement(x, y) {
        if(!this.player.playerIsMoving && this.map.isEmpty(x, y)) {
            this.player.playerIsMoving = true;
            this.player.playerDestX = x;
            this.player.playerDestY = y;
            this.map.data[x][y] = 0;
        } else if (this.map.data[x][y] == 4) {
            this.map.data[x][y] = 0;
            this.player.playerDestX = x;
            this.player.playerDestY = y;
        }
    }

    handlePush(x, y, bx, by) {
        if (this.map.data[x][y] == 3 && this.map.data[bx][by] == 0 && by >= y) {
            this.player.playerIsMoving = true;
            this.player.playerDestX = x;
            this.player.playerDestY = y;
            this.addMovingObject(x, y, bx, by, 3);
            this.map.data[x][y] = 0;
        }
    }

    addMovingObject(x, y, dx, dy, type) {
        this.movingObjects.push({objectX: x, objectY: y, destX: dx, destY: dy, drawX: x, drawY: y, objectType: type});
    }

    handleFallingObjects() {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                if (this.map.data[i][j] == 4 || this.map.data[i][j] == 3) {
                    if (this.map.data[i][j+1] === 0 && (i != this.player.playerDestX || j+1 != this.player.playerDestY) && !this.player.playerStopped) {
                        this.addMovingObject(i, j, i, j+1, this.map.data[i][j]);
                        this.map.data[i][j] = 0;
                    }
                } 
            }
        }
    }

    handleMovingObjects() {
        for (var i = 0; i < this.movingObjects.length; i++) {
            if (this.movingObjects[i].destX === this.player.playerDestX && this.movingObjects[i].destY === this.player.playerDestY) {
                console.log("bam!");
            }
            if (this.movingObjects[i].destX === this.player.playerX && this.movingObjects[i].destY === this.player.playerY) {
                console.log("bam!");
            }
    
            if (this.movingObjects[i].objectType === 3 || this.movingObjects[i].objectType === 4) {
                if (this.movingObjects[i].drawX < this.movingObjects[i].destX && this.movingObjects[i].destX > this.movingObjects[i].objectX) {
                    this.movingObjects[i].drawX += 0.1;
                } else if (this.movingObjects[i].drawX > this.movingObjects[i].destX && this.movingObjects[i].destX < this.movingObjects[i].objectX) {
                    this.movingObjects[i].drawX -= 0.1;
                } else if (this.movingObjects[i].drawY < this.movingObjects[i].destY && this.movingObjects[i].destY > this.movingObjects[i].objectY) {
                    this.movingObjects[i].drawY += 0.1;
                } else if (this.movingObjects[i].drawY > this.movingObjects[i].destY && this.movingObjects[i].destY < this.movingObjects[i].objectY) {
                    this.movingObjects[i].drawY -= 0.1;
                } else {
                    this.map.data[this.movingObjects[i].destX][this.movingObjects[i].destY] = this.movingObjects[i].objectType;
                    this.movingObjects.splice(i, 1);
                }
            }
        }
    }
    
    drawMovingObjects(p5) {
        for (var i = 0; i < this.movingObjects.length; i++) {
            if (this.movingObjects[i].objectType === 3) {
                p5.image(this.assets.project, this.movingObjects[i].drawX * 32, this.movingObjects[i].drawY * 32);
            }
            if (this.movingObjects[i].objectType === 4) {
                p5.image(this.assets.lemon, this.movingObjects[i].drawX * 32, this.movingObjects[i].drawY * 32);
            }
        }
    }
    
}
export { game };