class Users {
  constructor() {
    this.users = [];
    this.socketid = [];
    this.currentGame = [];
  }
  getUsers() {
    let usersinGame = [];
    for (var user of this.currentGame) {
      usersinGame.push(this.findUserName(user.player1));
      usersinGame.push(this.findUserName(user.player2));
    }
    return { users: this.users, usersinGame: usersinGame };
  }

  addUser(username, socketid) {
    this.users.push(username);
    this.socketid.push(socketid);
  }

  removeUser(username) {
    for (let index = 0; index < this.users.length; ++index) {
      if (username === this.users[index]) {
        this.users.splice(index, 1);
        this.socketid.splice(index, 1);
      }
    }
  }

  checkUser(username, socketid) {
    for (let index = 0; index < this.users.length; ++index) {
      if (username === this.users[index]) {
        return true;
      }
    }
    return this.addUser(username, socketid);
  }

  findsocketID(username) {
    for (let index = 0; index < this.users.length; ++index) {
      if (username === this.users[index]) {
        return this.socketid[index];
      }
    }
  }

  findUserName(socketid) {
    for (let index = 0; index < this.socketid.length; ++index) {
      if (socketid === this.socketid[index]) {
        return this.users[index];
      }
    }
  }
  findCurrentGame(socketid) {
    for (let index = 0; index < this.currentGame.length; ++index) {
      if (socketid === this.currentGame[index].player1 || socketid === this.currentGame[index].player2) {
        return this.currentGame[index];
      }
    }
  }
}

module.exports = new Users();
