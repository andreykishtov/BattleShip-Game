const model = {
  boardSize: 10,
  numShips: 3,
  ships: [
    { ship0: [0, 0, 0, 0] },
    { ship1: [0, 0, 0] },
    { ship2: [0, 0, 0] },
    { ship3: [0, 0] },
    { ship4: [0, 0] },
    { ship5: [0, 0] },
    { ship6: [0] },
    { ship7: [0] },
    { ship8: [0] },
    { ship9: [0] }
  ],

  generateShipLocations: function() {
    var locations;
    const shipsToReturn = {};
    const shipCount = this.ships.length;
    for (var i = 0; i < shipCount; i++) {
      do {
        locations = this.generateShip(this.ships[i][`ship${i}`].length);
      } while (this.collision(locations, shipsToReturn));
      shipsToReturn[`ship${i}`] = locations;
    }
    return shipsToReturn;
  },

  createRandom: function(size) {
    return Math.floor(Math.random() * size);
  },

  generateShip: function(shipLength) {
    const direction = this.createRandom(2);
    const newShipLocations = [];
    let row, col;

    if (direction === 1) {
      row = this.createRandom(this.boardSize);
      col = this.createRandom(this.boardSize - shipLength + 1);
    } else {
      row = this.createRandom(this.boardSize - shipLength + 1);
      col = this.createRandom(this.boardSize);
    }

    for (var i = 0; i < shipLength; i++) {
      direction === 1
        ? newShipLocations.push(parseInt(row + '' + (col + i)))
        : newShipLocations.push(parseInt(row + i + '' + col));
    }
    return newShipLocations;
  },

  collision: function(locations, shipsCreated) {
    for (var i = 0; i < Object.keys(shipsCreated).length; i++) {
      const ship = shipsCreated[`ship${i}`];
      for (var j = 0; j < locations.length; j++) {
        if (ship.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
};

module.exports = model;
