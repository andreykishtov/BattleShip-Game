const connection = io => io.on('connection', socket => require('./emitters')(socket, io));

module.exports = connection;
