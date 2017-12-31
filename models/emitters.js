const users = require('./users');
const gameLogics = require('./gameLogics');

const checkUserNameAvailability = socket =>
  socket.on(
    'username',
    newUsername =>
      users.checkUser(newUsername, socket.id)
        ? socket.emit('usernameNotOk', newUsername)
        : socket.broadcast.emit('usernameOK', newUsername)
  );

const startGame = (socket, io, newUsername) => {
  const myUsername = users.findUserName(socket.id);
  const CurrentGame = new gameLogics(socket.id, users.findsocketID(newUsername));
  const game = CurrentGame.objOfPlayers;
  users.currentGame.push(CurrentGame);
  CurrentGame.currentPlayer = game[0].id;
  io.to(game[0].id).emit('connetionBeforeGame', game[0].board);
  io.to(game[1].id).emit('connetionBeforeGame', game[1].board, true, newUsername);
  io.to(game[0].id).emit('2playersPlaying', myUsername, newUsername);
  socket.broadcast.emit('2playersPlaying', myUsername, newUsername);
};

const continueGame = (socket, io, answer, cell, opponent) => {
  socket.emit('answerIfHit', { answer, cell });
  io.to(opponent).emit('answerIfHitFromOtherPlayer', { answer: answer, cell: cell, opponent: true });
};

const endGame = (socket, io, answer, cell, opponent) => {
  socket.emit('answerIfHit', { answer, cell });
  io.to(opponent).emit('answerIfHitFromOtherPlayer', { answer: answer, cell: cell, opponent: true });
  socket.emit('endGame', users.findUserName(socket.id), users.findUserName(opponent));
  socket.broadcast.emit('endGame', users.findUserName(socket.id), users.findUserName(opponent), true);
  io.to(opponent).emit('endGame', users.findUserName(socket.id), users.findUserName(opponent), false);
};

const checkIfHit = (socket, io, cell) => {
  const CurrentGame = users.findCurrentGame(socket.id);
  let answer = CurrentGame.checkGame(socket.id, cell - 100);
  if (!CurrentGame.ifPlayerAllowed(socket.id, answer)) {
    return;
  }
  let opponent = CurrentGame.FindOtherPlayer(socket.id, answer);
  CurrentGame.gameEnds(answer, socket.id)
    ? endGame(socket, io, answer, cell, opponent)
    : continueGame(socket, io, answer, cell, opponent);
};

const startConnection = (socket, io, dataBeforeConnection) => {
  const usersInServer = users.getUsers();
  socket.emit('connection Established', usersInServer);
  checkUserNameAvailability(socket);
  socket.on('startGame', newUsername => startGame(socket, io, newUsername));
  socket.on('checkifHit', cell => checkIfHit(socket, io, cell));
};

const emitters = (socket, io) => {
  socket.on('startConnection', dataBeforeConnection => startConnection(socket, io, dataBeforeConnection));
  socket.on('disconnect', () => {
    const username = users.findUserName(socket.id);
    users.removeUser(username);
    socket.broadcast.emit('disconnectedUser', username);
  });
};

module.exports = emitters;
