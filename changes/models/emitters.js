const users = require('./users');
const gamelogics = require('./gamelogics');

var emitters = (socket, io) => {
  socket.on('startConnection', dataBeforeConnection => {
    socket.emit('connection Established', users.getUsers());
    checkuserForEmit(socket);
    waitingForGame(socket, io);
  });
  dissconnect(socket);
};

function checkuserForEmit(socket) {
  socket.on('username', newUsername => {
    let ok = users.checkUser(newUsername, socket.id); //check person
    ok ? socket.emit('usernameNotOk', newUsername) : socket.broadcast.emit('usernameOK', newUsername);
  });
}

function waitingForGame(socket, io) {
  socket.on('startGame', newUsername => {
    let myUsername = users.findUserName(socket.id);
    let CurrentGame = new gamelogics(socket.id, users.findsocketID(newUsername));
    let game = CurrentGame.objOfPlayers;
    users.currentGame.push(CurrentGame);
    CurrentGame.currentPlayer = game[0].id;
    io.to(game[0].id).emit('connetionBeforeGame', game[0].board);
    io.to(game[1].id).emit('connetionBeforeGame', game[1].board, true, newUsername);
    io.to(game[0].id).emit('2playersPlaying', myUsername, newUsername);
    socket.broadcast.emit('2playersPlaying', myUsername, newUsername);
    ///////////////////////////****game started****///////////////////////////////
  });

  socket.on('checkifHit', cell => {
    let socketId = socket.id;
    let CurrentGame = users.findCurrentGame(socketId);
    let answer = CurrentGame.checkGame(socketId, cell - 100);
    if (CurrentGame.ifPlayerAllowed(socketId, answer)) {
      CurrentGame.gameEnds(answer, socketId)
        ? ifCurrentGameContinues(answer, cell, socketId, CurrentGame)
        : ifCurrentGameEnds(answer, cell);
    }
  });

  function ifCurrentGameEnds(answer, cell) {
    socket.emit('answerIfHit', { answer, cell });
    io.to(opponent).emit('answerIfHitFromOtherPlayer', { answer: answer, cell: cell, opponent: true });
  }

  function ifCurrentGameContinues(answer, cell, socketId, CurrentGame) {
    let opponent = CurrentGame.FindOtherPlayer(socketId, answer);
    socket.emit('answerIfHit', { answer, cell });
    io.to(opponent).emit('answerIfHitFromOtherPlayer', { answer: answer, cell: cell, opponent: true });
    socket.emit('endGame', users.findUserName(socketId), users.findUserName(opponent));
    socket.broadcast.emit('endGame', users.findUserName(socketId), users.findUserName(opponent), true);
    io.to(opponent).emit('endGame', users.findUserName(socketId), users.findUserName(opponent), false);
  }
}

function dissconnect(socket) {
  socket.on('disconnect', () => {
    let username = users.findUserName(socket.id);
    users.removeUser(username);
    socket.broadcast.emit('disconnectedUser', username);
  });
}

module.exports = emitters;
