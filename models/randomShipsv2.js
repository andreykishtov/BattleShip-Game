var model = {
  boardSize: 10,
  numShips: 3,
  shipsSunk: 0,

  ships: [{ locations: [0] }, { locations: [0, 0] }, { locations: [0, 0, 0] }, { locations: [0, 0, 0, 0] }],

  generateShipLocations: function() {
    var locations;
    const shipCount = 4;
    for (var i = 0; i < shipCount; i++) {
      do {
        locations = this.generateShip(this.ships[i].locations.length);
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
    console.log('Ships array: ');
    console.log(this.ships);
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
        ? newShipLocations.push(row + '' + (col + i))
        : newShipLocations.push(row + i + '' + col);
    }
    return newShipLocations;
  },

  collision: function(locations) {
    const shipCount = 4;
    for (var i = 0; i < shipCount; i++) {
      var ship = this.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
};

model.generateShipLocations();
