class player {
    constructor() {
        this.playerX = 1;
        this.playerY = 1;
        this.playerIsMoving = false;
        this.playerStopped = false;
        this.playerDrawX = 1;
        this.playerDrawY = 1;
        this.playerDestX = 1;
        this.playerDestY = 1;
    }

    stop() {
        this.playerIsMoving = false;
        this.playerX = this.playerDestX;
        this.playerY = this.playerDestY;
        this.playerDrawX = this.playerX;
        this.playerDrawY = this.playerY;
        this.playerStopped = true;
    }
}
export { player };