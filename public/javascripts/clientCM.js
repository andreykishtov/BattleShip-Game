class Communication {
    constructor() {
        this.socket = io.connect();
        this.select = document.getElementById("playerList");
        this.answerIfHit();
        this.endGame();
    }

    startComunication() {
        this.socket.emit('startConnection');
        this.socket.on('connection Established', (usersObject) => { //connected
            if (usersObject.users.length) {
                cmlogic.firstTimeGetUsersFromServer(usersObject); //function outside
            }
            this.socket.on('connetionBeforeGame', (ships, draw, username) => { //connected to game
                if (draw) {
                    cmlogic.startGame(username); //only second Player
                    battleshipGame.drawText('Game Started Wait For It!', 'black', 100, 200);
                }
                cmlogic.playGame(ships);
            });
        });
        this.socket.on('disconnectedUser', function(username) {
            cmlogic.removePlayer(username);
        })
        this.socket.on('2playersPlaying', function(myUsername, newUsername) {
            cmlogic.changeStatus(myUsername, newUsername);
        })
    }

    sendUserToPlayer(username) {
        this.socket.emit('username', username);
    }

    waitingForPlayer() {
        this.socket.on('usernameNotOk', username => { //connected
            cmlogic.usernameIsBad(username);
        });

        this.socket.on('usernameOK', username => { //connected
            cmlogic.createOption(username, 'Online');
        });
    }

    startGame(username) {
        this.socket.emit('startGame', username);
        battleshipGame.drawText('Game Started Attack!', 'black', 100, 200);
    }

    fromServerIfHit(cell) {
        console.log('x');
        this.socket.emit('checkifHit', cell);
    }

    answerIfHit() {
        this.socket.on('answerIfHit', (ifHit) => { //connected
            gameLogics.checkboardIfHit(ifHit.cell, ifHit.answer);
        });
        this.socket.on('answerIfHitFromOtherPlayer', (ifHit) => { //connected
            gameLogics.checkboardIfHit(ifHit.cell - 100, ifHit.answer, ifHit.opponent);
        });
    }

    endGame() {
        this.socket.on('endGame', (usernameOfWinner, loserUsername, forall) => { //connected
            cmlogic.endGame(usernameOfWinner, loserUsername, forall);
        });
    }

}