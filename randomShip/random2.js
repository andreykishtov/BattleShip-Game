function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function rand09() {
    return rand(0, 9);
}

function randomShips(shipmaxsize) {
    var ships = [];
    var board = [];
    for (var xindex = 0; xindex < 11; xindex++) {
        board[xindex] = [];
        for (var yindex = 0; yindex < 11; yindex++) {
            board[xindex][yindex] = true;
        }
    }
    while (ships.length < 10) {
        //var verthoriz = rand(0, 2);
        if (1) {
            var ship = [];
            do {
                var X = rand09();
            } while (X > 9 - shipmaxsize);
            let Y = rand09();
            var index = 0;
            while (index < shipmaxsize && board[(X + index)][Y]) {
                index++;
            }
            if (index == shipmaxsize) {
                for (var indexnew = 0; indexnew < index; indexnew++) {
                    ship[index] = "" + (X + index) + "" + Y;
                    board["" + (X + 1 + index) + "" + Y] = false;
                }
                addDots(ship, 1);
                ships.push(ship);
                if (ships.length === 1) {
                    shipmaxsize-- //4 1
                }
                if (ships.length === 3) {
                    shipmaxsize-- //3 2
                }
                if (ships.length === 6) {
                    shipmaxsize-- //2 3
                }
                if (ships.length === 10) {
                    shipmaxsize-- //1 4
                }
            }
            //ship = [21, 22, 23, 24];
            //ship = [15, 25, 35, 45];
            //console.log()
        }
    }
    //var count = 0;
    // for (var index = 0; index < board.length; index++) {
    //     console.log(JSON.stringify(board[index]));
    // }


    //return ships;
    return {
        ship0: ships[0],
        ship1: ships[1],
        ship2: ships[2],
        ship3: ships[3],
        ship4: ships[4],
        ship5: ships[5],
        ship6: ships[6],
        ship7: ships[7],
        ship8: ships[8],
        ship9: ships[9],
    }


    function addDots(ship, XorY) {
        if (!XorY) {
            for (var index = 0; index < ship.length; index++) {
                var element = '' + ship[index];
                element = element.split('');
                if (element[1] > 0 && element[1] < 9) {
                    board[parseInt(element[0])][parseInt(element[1]) - 1] = false;
                    board[parseInt(element[0])][parseInt(element[1]) + 0] = false;
                    board[parseInt(element[0])][parseInt(element[1]) + 1] = false;
                }
            }
        } else {
            for (var index = 0; index < ship.length; index++) {
                var element = '' + ship[index];
                element = element.split('');
                if (element[0] > 0 && element[0] < 9) {
                    board[parseInt(element[0]) - 1][parseInt(element[1])] = false;
                    board[parseInt(element[0]) + 0][parseInt(element[1])] = false;
                    board[parseInt(element[0]) + 1][parseInt(element[1])] = false;
                }
            }
        }
    }
}
// var ships = randomShips(4); //how big are ships;
//console.log(ships);
module.exports = randomShips;
//console.log(JSON.stringify(ships));