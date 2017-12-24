class Random {
  constructor(x = 10, y = 10) {
    this.ships = [];
    this.board = this.randomBoard(x, y);
  }

  rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  randomBoard(x, y) {
    return Array(x)
      .fill(null)
      .map(e => Array(y).fill(true));
  }

  getXY() {
    return { x: this.rand(0, 10), y: this.rand(0, 10) };
  }

  createShipsArray(maxShipSize = 4) {
    let ships = Array(maxShipSize)
      .fill(null)
      .map((arr, index) => this.createShips(maxShipSize - index, index + 1));
    console.log(ships);
  }

  createShips(size, howManyShips) {
    return Array(howManyShips)
      .fill(null)
      .map(() => this.createShip(size));
  }

  createShip(shipSize) {
    return Array(shipSize)
      .fill(null)
      .map(() => {
        // console.log(this.board);
        // return JSON.stringify(this.getXY());
        // let { x, y } = this.getXY();
        // if (this.freeSpace()) {
        // return { x, y };
        // }
        //this.board[x][y]
      });
  }
}

let ships = new Random();
ships.createShipsArray();
