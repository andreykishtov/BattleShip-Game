class Communication {
  constructor() {
    this.socket = io.connect();
    this.select = document.getElementById('playerList');
    this.answerIfHit();
    this.endGame();
  }

  startComunication() {
    this.socket.emit('startConnection');
    this.socket.on('connection Established', usersObject => {
      if (usersObject.users.length) {
        cmlogic.firstTimeGetUsersFromServer(usersObject);
      }
      this.socket.on('connetionBeforeGame', (ships, draw, username) => {
        if (draw) {
          cmlogic.startGame(username);
          battleshipGame.drawText('Game Started Wait For It!', 'black', 100, 200);
        }
        cmlogic.playGame(ships);
      });
    });
    this.socket.on('disconnectedUser', username => cmlogic.removePlayer(username));
    this.socket.on('2playersPlaying', (myUsername, newUsername) =>
      cmlogic.changeStatus(myUsername, newUsername)
    );
  }

  sendUserToPlayer(username) {
    this.socket.emit('username', username);
  }

  waitingForPlayer() {
    this.socket.on('usernameNotOk', username => cmlogic.usernameIsBad(username));
    this.socket.on('usernameOK', username => cmlogic.createOption(username, 'Online'));
  }

  startGame(username) {
    this.socket.emit('startGame', username);
    battleshipGame.drawText('Game Started Attack!', 'black', 100, 200);
  }

  fromServerIfHit(cell) {
    this.socket.emit('checkifHit', cell);
  }

  answerIfHit() {
    this.socket.on('answerIfHit', ifHit => gameLogics.checkboardIfHit(ifHit.cell, ifHit.answer));
    this.socket.on('answerIfHitFromOtherPlayer', ifHit =>
      gameLogics.checkboardIfHit(ifHit.cell - 100, ifHit.answer, ifHit.opponent)
    );
  }

  endGame() {
    this.socket.on('endGame', (usernameOfWinner, loserUsername, forall) =>
      cmlogic.endGame(usernameOfWinner, loserUsername, forall)
    );
  }
}
