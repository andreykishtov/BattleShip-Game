function rand(min, max) {
    return Math.floor(Math.random() * max + min);
}

function rand09() {
    return rand(0, 9);
}

function randomShips(shipmaxsize) {
    var board = [];
    for (var index = 0; index < 100; index++) {
        board[index] = true;
    }
    var ships = [];
    while (ships.length < 10) {
        var verthoriz = rand(0, 2);
        if (verthoriz) {
            var ship = [];
            do {
                var X = rand09();
            } while (X > 9 - shipmaxsize);
            let Y = rand09();
            let index = 0;
            while (index < shipmaxsize && board["" + (X + index) + "" + Y]) {
                index++;
            }
            if (index < shipmaxsize) {} else {
                index = 0;
                while (index < shipmaxsize && board["" + (X + index) + "" + Y]) {
                    ship[index] = "" + (X + index) + "" + Y;
                    board["" + (X + index++) + "" + Y] = false;
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
        } else {
            var ship = [];
            do {
                var Y = rand09();
            } while (Y > 9 - shipmaxsize);
            let X = rand09();
            let index = 0;
            while (index < shipmaxsize && board["" + X + "" + (Y + index)]) {
                index++
            }
            if (index < shipmaxsize) {} else {
                index = 0;
                while (index < shipmaxsize && board["" + X + "" + (Y + index)]) {
                    ship[index] = "" + X + "" + (Y + index);
                    board["" + X + "" + (Y + index++)] = false;
                }
                addDots(ship, 0);
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
        }
    }
    //return ships;
    var show = [];
    for (var x = 1; x < 9; x++) {
        for (var index = 1; index < 9; index++) {
            show[x + '' + index] += '' + board[x + '' + index];
        }
    }
    //console.log(show);

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
        if (XorY) {
            for (var index = 0; index < ship.length; index++) {
                var element = '' + ship[index];
                element = element.split('');
                if (element[1] > 0 && element[1] < 9) {
                    board[parseInt((element[0])) + (parseInt(element[1]) - 1)] = false;
                    board[parseInt((element[0])) + parseInt((element[1]))] = false;
                    board[parseInt((element[0])) + (parseInt(element[1]) + 1)] = false;
                }
            }
        } else {
            for (var index = 0; index < ship.length; index++) {
                var element = '' + ship[index];
                element = element.split('');
                if (element[0] > 0 && element[0] < 9) {
                    board[parseInt((element[0]) - 1) + (parseInt(element[1]))] = false;
                    board[parseInt((element[0])) + parseInt((element[1]))] = false;
                    board[parseInt((element[0]) + 1) + (parseInt(element[1]))] = false;
                }
            }
        }
    }
}
module.exports = randomShips; //how big are ships;