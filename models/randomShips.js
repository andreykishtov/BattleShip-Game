/*Battleship Constructor*/

function Battleship(gameCount, boardSize) {
  this.amountOfGames = gameCount;
  this.boardSize = boardSize;

  this.createBoard();
  this.createShips();
  this.createGame();
  this.createOverallStats();

  this.randomShipLocation(0);
  this.randomShipLocation(1);
  this.randomShipLocation(2);
  this.randomShipLocation(3);
  this.randomShipLocation(4);

  return this;
}

/*Creates a 2d array and populates it with Unknown values*/
Battleship.prototype.createBoard = function() {
  this.board = [];
  for (var row = 0; row < this.boardSize; row++) {
    var rowCollection = [];
    for (var col = 0; col < this.boardSize; col++) {
      rowCollection[col] = '0';
    }
    this.board[row] = rowCollection;
  }
};

/*Creates the ships object*/
Battleship.prototype.createShips = function() {
  this.ships = {
    0: {
      name: 'Aircraft carrier',
      size: 5,
      hits: 0,
      direction: 'Vertical',
      coordinates: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    },
    1: {
      name: 'Battleship',
      size: 4,
      hits: 0,
      direction: 'Vertical',
      coordinates: [[0, 0], [0, 0], [0, 0], [0, 0]]
    },
    2: { name: 'Submarine', size: 3, hits: 0, direction: 'Vertical', coordinates: [[0, 0], [0, 0], [0, 0]] },
    3: { name: 'Destroyer', size: 3, hits: 0, direction: 'Vertical', coordinates: [[0, 0], [0, 0], [0, 0]] },
    4: { name: 'Patrol boat', size: 2, hits: 0, direction: 'Vertical', coordinates: [[0, 0], [0, 0], [0, 0]] }
  };
  this.shipCount = 5;
};

/*Creates overall stats for multiple games*/
Battleship.prototype.createOverallStats = function() {
  this.overallStats = {
    hits: 0,
    misses: 0,
    total: 0,
    average: 0
  };
};

/*Creates all game objects*/
Battleship.prototype.createGame = function() {
  this.gameStats = {
    hits: 0,
    misses: 0,
    total: 0
  };
  this.gameStatus = {
    sunkShips: 0,
    gameOver: false
  };
};

/*Draws the table to the screen*/
Battleship.prototype.drawBoard = function() {
  var bstring = '';
  var margin = '';
  for (var row = 0; row < this.boardSize; row++) {
    margin += '<th class="margin">' + row + '</th>';
    bstring += '<tr><td class="margin">' + row + '</td>';
    for (var col = 0; col < this.boardSize; col++) {
      bstring += '<td class="' + this.getCellState([row, col]) + '">' + this.board[row][col] + '</td>';
    }
    bstring += '</tr>';
  }
  document.getElementById('map').innerHTML =
    '<table><tr><th class="margin">' + margin + '</th></tr>' + bstring + '</table>';
};

/*Calculates the stats of all the games played and draws the stats string to the screen*/
Battleship.prototype.drawStats = function() {
  this.overallStats.average = this.overallStats.total / this.amountOfGames;
  document.getElementById('stats').innerHTML =
    'Out of ' +
    b.amountOfGames +
    ' games, the average amount of shots fired to complete a game was ' +
    b.overallStats.average;
};

/*Will return back the cells state Unknown/Missed/Hit */
Battleship.prototype.getCellState = function(coord) {
  if (this.board[coord[0]][coord[1]] == '2') return 'Hit';
  else if (this.board[coord[0]][coord[1]] == '1') return 'Miss';
  else if (this.board[coord[0]][coord[1]] == '0') return 'Unknown';
};

/*Will set the cells state to Unknown/Missed/Hit */
Battleship.prototype.setCellState = function(coord, type) {
  if (type == 'Hit') this.board[coord[0]][coord[1]] = '2';
  else if (type == 'Miss') this.board[coord[0]][coord[1]] = '1';
  else if (type == 'Unknown') this.board[coord[0]][coord[1]] = '0';
};

/*Will return true if the coordinate is within the map and an unknown cell*/
Battleship.prototype.validShotCoordinate = function(coord) {
  if (coord[0] < this.boardSize && coord[0] >= 0 && coord[1] < this.boardSize && coord[1] >= 0) {
    if (this.board[coord[0]][coord[1]] == '0') {
      return true;
    }
  }
  return false;
};

/*Will return true if the shot is on the map and if the coordinates are not already used by a ship*/
Battleship.prototype.validShipCoordinate = function(coord) {
  if (coord[0] < this.boardSize && coord[0] >= 0 && coord[1] < this.boardSize && coord[1] >= 0) {
    for (var i = 0; i < this.shipCount; i++) {
      for (var x = 0; x < this.ships[i].coordinates.length; x++) {
        if (this.ships[i].coordinates[x][0] == coord[0] && this.ships[i].coordinates[x][1] == coord[1]) {
          return false;
        }
      }
    }
    return true;
  }
  return false;
};

/*Will find a random location on the map for the specified ship*/
Battleship.prototype.randomShipLocation = function(shipIndex) {
  var index = 0;
  var directions = ['Vertical', 'Horizontal'];
  var shipSize = this.ships[shipIndex].size;

  while (index < shipSize) {
    var index = 0;
    var coordinates = [];
    var coord = this.randomCoordinate();
    var direction = directions[Math.floor(Math.random() * 2 + 0)];

    for (var next = 0; next < shipSize; next++) {
      var newX = [next - 2 + coord[0], coord[1]];
      var newY = [coord[0], next - 2 + coord[1]];

      if (direction == 'Horizontal' && this.validShipCoordinate(newX) != false) {
        coordinates[index] = newX;
        index++;
      } else if (direction == 'Vertical' && this.validShipCoordinate(newY) != false) {
        coordinates[index] = newY;
        index++;
      } else break;
    }
  }
  this.ships[shipIndex].direction = direction;
  this.ships[shipIndex].coordinates = coordinates;
};

/*Will get a random coordinate that is valid*/
Battleship.prototype.randomCoordinate = function() {
  do {
    var coord = [
      Math.floor(Math.random() * this.boardSize + 0),
      Math.floor(Math.random() * this.boardSize + 0)
    ];
  } while (!this.validShotCoordinate(coord));
  return coord;
};

/*Will fire a shot on the map defined by the specified coordinate*/
Battleship.prototype.fireShot = function(coord) {
  flag = false;
  for (var i = 0; i < this.shipCount; i++) {
    for (x = 0; x < this.ships[i].coordinates.length; x++) {
      if (this.ships[i].coordinates[x][0] == coord[0] && this.ships[i].coordinates[x][1] == coord[1]) {
        this.board[coord[0]][coord[1]] = 2;
        this.ships[i].hits++;
        this.gameStats.hits++;
        this.gameStats.total++;
        this.overallStats.hits++;
        this.overallStats.total++;
        flag = true;
      }
    }
  }
  if (!flag) {
    this.board[coord[0]][coord[1]] = 1;
    this.gameStats.misses++;
    this.gameStats.total++;
    this.overallStats.misses++;
    this.overallStats.total++;
  }
  this.isSunk();
};

/*Will check the ships to see if they are all sunk*/
Battleship.prototype.isSunk = function() {
  var sunkShips = 0;
  for (var i = 0; i < this.shipCount; i++) {
    if (this.ships[i].hits == this.ships[i].size) {
      sunkShips++;
    }
  }
  if (sunkShips == this.shipCount) {
    this.gameStatus.sunkShips = sunkShips;
    this.gameStatus.gameOver = true;
  } else if (sunkShips > this.gameStatus.sunkShips) {
    this.gameStatus.sunkShips = sunkShips;
  }
};
