var users = require('./users');
var gamelogics = require('./gamelogics');
var emiters = function(socket, io) {
  socket.on('startConnection', dataBeforeConnection => {
    //User Connected
    let usersInServer = users.getUsers();
    socket.emit('connection Established', usersInServer); //Responce To User
    checkuserForEmit(socket);
    waitingForGame(socket, io);
  });
  dissconnect(socket);
};

function checkuserForEmit(socket) {
  socket.on('username', newUsername => {
    var ok = users.checkUser(newUsername, socket.id); //check person
    if (!ok) {
      socket.broadcast.emit('usernameOK', newUsername); //Responce To User
    } else {
      socket.emit('usernameNotOk', newUsername); //Responce To User
    }
  });
}

function waitingForGame(socket, io) {
  socket.on('startGame', newUsername => {
    console.log(newUsername);
    let socketid = users.findsocketID(newUsername);
    let myUsername = users.findUserName(socket.id);
    let CurrentGame = new gamelogics(socket.id, socketid); //saves first game
    let game = CurrentGame.objOfPlayers; //first player that started the game is first playing player0
    users.currentGame.push(CurrentGame);
    CurrentGame.currentPlayer = game[0].id;
    io.to(game[0].id).emit('connetionBeforeGame', game[0].board);
    io.to(game[1].id).emit('connetionBeforeGame', game[1].board, true, newUsername);
    io.to(game[0].id).emit('2playersPlaying', myUsername, newUsername);
    socket.broadcast.emit('2playersPlaying', myUsername, newUsername);
    ///////////////////////////****game started****///////////////////////////////
  });

  socket.on('checkifHit', cell => {
    //User Connected
    let CurrentGame = users.findCurrentGame(socket.id);
    let answer = CurrentGame.checkGame(socket.id, cell - 100);
    if (CurrentGame.ifPlayerAllowed(socket.id, answer)) {
      //checks whos turn it is and allows if its right player turn.
      let opponent = CurrentGame.FindOtherPlayer(socket.id, answer);
      //let answer = CurrentGame.checkGame(socket.id, cell - 100);
      if (!CurrentGame.gameEnds(answer, socket.id)) {
        socket.emit('answerIfHit', { answer, cell });
        io.to(opponent).emit('answerIfHitFromOtherPlayer', { answer: answer, cell: cell, opponent: true });
      } else {
        socket.emit('answerIfHit', { answer, cell });
        io.to(opponent).emit('answerIfHitFromOtherPlayer', { answer: answer, cell: cell, opponent: true });
        socket.emit('endGame', users.findUserName(socket.id), users.findUserName(opponent));
        socket.broadcast.emit('endGame', users.findUserName(socket.id), users.findUserName(opponent), true);
        io.to(opponent).emit('endGame', users.findUserName(socket.id), users.findUserName(opponent), false);
      }
    }
  });
}

function dissconnect(socket) {
  socket.on('disconnect', () => {
    let username = users.findUserName(socket.id);
    users.removeUser(username);
    socket.broadcast.emit('disconnectedUser', username);
  });
}

module.exports = emiters;
