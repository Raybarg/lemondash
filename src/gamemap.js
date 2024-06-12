class gamemap {
    constructor() {
        this.data = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 2, 2, 2, 2, 2, 2, 4, 1],
            [1, 4, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 2, 2, 3, 1, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 0, 1],
            [1, 4, 0, 0, 0, 2, 2, 2, 4, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
    }

    isEmpty(x, y) {
        return (this.data[x][y] === 2 || this.data[x][y] === 0);
    }

}
export { gamemap };