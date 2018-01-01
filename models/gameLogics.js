const ships = require('./randomShipsv2');

class Game {
  constructor(id1, id2) {
    this.player1 = id1;
    this.player2 = id2;
    this.gameInit();
    this.currentPlayer;
    this.winners = {};
    this.winners[this.player1] = 0;
    this.winners[this.player2] = 0;
  }

  gameInit() {
    this.objOfPlayers = [
      {
        id: this.player1,
        board: ships.generateShipLocations()
      },
      {
        id: this.player2,
        board: ships.generateShipLocations()
      }
    ];
  }

  checkGame(socketid, cell) {
    const currentboard = socketid != this.player1 ? this.objOfPlayers[0].board : this.objOfPlayers[1].board;

    for (let key in currentboard) {
      let ship = currentboard[key];
      for (let index = 0; index < ship.length; ++index) {
        if (ship[index] == cell) {
          return true;
        }
      }
    }
    return false;
  }

  ifPlayerAllowed(socketId, ifHit) {
    const otherPlayerID = this.FindOtherPlayer(socketId);
    if (ifHit === true && otherPlayerID !== this.currentPlayer) {
      return true;
    }

    if (otherPlayerID !== this.currentPlayer) {
      this.currentPlayer = otherPlayerID;
      return true;
    }

    return false;
  }

  FindOtherPlayer(socketid) {
    return socketid === this.player1 ? this.player2 : this.player1;
  }

  gameEnds(IfHit, socketid) {
    if (IfHit) {
      return ++this.winners[socketid] === 20;
    }
  }
}

module.exports = Game;
