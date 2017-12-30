class Random {
    constructor() {
        this.ships = [];
        this.board = this.randomBoard(10, 10);
        this.countsteps = 0;
    }

    rand(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    randomBoard(x, y) {
        // return Array.apply(null, Array(x)).map(e => Array(y).fill(0))
        return Array(x).fill().map(e => Array(y).fill(true));
    }

    createBoard10(x, y) {
        return Array.apply(null, Array(x)).map(e => Array(y).fill(true));
    }

    createShips(BiggestShip) {
        var count = BiggestShip;
        for (var otherWay = 1; otherWay <= BiggestShip; otherWay++) {
            for (var index = 0; index < otherWay; index++) {
                this.ships.push(this.createShip(count)); //4
            }
            count--;
        }

        return {
            ship0: this.ships[0],
            ship1: this.ships[1],
            ship2: this.ships[2],
            ship3: this.ships[3],
            ship4: this.ships[4],
            ship5: this.ships[5],
            ship6: this.ships[6],
            ship7: this.ships[7],
            ship8: this.ships[8],
            ship9: this.ships[9],
        }
    }

    createShip(howbig) {
        let Up = this.rand(0, 2);
        if (Up) {
            return this.XshipState(howbig);
        } else {
            return this.YShipState(howbig);
        }
    }

    XshipState(howBig) {
        console.log('start X');
        var ship;
        do {
            var index = howBig;
            ship = [];
            let x = this.rand(0, 10 - howBig);
            let y = this.rand(0, 10);
            while (index--) {
                ship.push({ x, y });
                x++;
            }
        } while (this.checkShip(ship));
        this.changeBoardStateAfterShip(ship);
        console.log('end X');
        return ship;
    }

    YShipState(howBig) {
        console.log('start Y');
        var ship;
        do {
            var index = howBig;
            ship = [];
            var x = this.rand(0, 10);
            var y = this.rand(0, 10 - howBig);
            while (index--) {
                ship.push({ x, y });
                y++;
            }
        }
        while (this.checkShip(ship));
        this.changeBoardStateAfterShip(ship);
        console.log('end Y');
        return ship;
    }


    
    for()


    changeBoardStateAfterShip(ship) {
        for (var xy of ship) {
            this.putMiss(xy.x, xy.y);
        };
    }

    putMiss(x, y) {
        var xar = [x, x + 1, x - 1];
        var yar = [y, y + 1, y - 1];
        for (var xelement of xar) {
            for (var yelement of yar) {
                this.putdotsaroundShip(xelement, yelement);
            };
        };
    }

    putdotsaroundShip(x, y) {
        if (x >= 0 && y >= 0 && y <= 9 && x <= 9) {
            this.board[x][y] = false;
        }
    }

    checkShip(ship) { //while true dont stop
        for (let xy of ship) {
            if (this.checkAroundDot(xy.x, xy.y)) { //while true ends loop
                return false;
            }
        };
        return true;
    }

    checkAroundDot(x, y) { //returns true ends loop
        var xar = [x, x + 1, x - 1];
        var yar = [y, y + 1, y - 1];
        for (var Xelement of xar) {
            for (var Yelement of yar) {
                if (this.checkDot(Xelement, Yelement)) return false;
            };
        };
        return true;
    }

    checkDot(x, y) { //return true if there is false in board x y
        if (x >= 0 && y >= 0 && y <= 9 && x <= 9) { //while false end
            return (this.board[x][y] === false);
        }
        return false;
    }

    printBoard() {
        this.board.forEach((element) => {
            console.log(JSON.stringify(element));
        }, this);
    }

}

var random = new Random;

var ships = random.createShips(4);
random.printBoard();
console.log(ships)
    //console.log(JSON.stringify(ships));
    //module.exports = random.createShips;
    // module.exports = Random;