class GameLogics extends BattleShip {
  constructor() {
    super('canvas');
    this.registerEventListener();
  }

  registerEventListener() {
    //add listener on canvas
    this.canvas.addEventListener('click', event => this.onClick(event)); //change for second time
  }

  onClick(event) {
    //starts from 100 because i want to click on other user board
    for (let cell = 100; cell < this.size * this.size * this.times; ++cell) {
      if (this.board[cell].clickedCell(event.offsetX, event.offsetY)) {
        if (this.AllreadyHit(cell)) {
          //changes board
          return;
        }
        communication.fromServerIfHit(cell); //send request
        return;
      }
    }
  }

  AllreadyHit(cell) {
    if (cell === undefined) {
      return;
    }
    let cellObj = this.board[cell];
    let current = cellObj.getState(); //get whats now
    return current === 'miss' || current === 'hit';
  }

  checkboardIfHit(cell, ifHit, Fromopponent) {
    let cellObj = this.board[cell];
    if (ifHit) {
      cellObj.setState(this.currenthit); //hit Draw
      cellObj.draw(this.ctx);
      if (Fromopponent) {
        battleshipGame.drawText('Other Player Turn', 'black', 100, 200);
      } else {
        battleshipGame.drawText('your Turn Attack!', 'black', 100, 200);
      }
    } else {
      cellObj.setState(this.currentmiss); //miss Draw
      cellObj.draw(this.ctx);
      if (Fromopponent) {
        battleshipGame.drawText('your Turn Attack!', 'black', 100, 200);
      } else {
        battleshipGame.drawText('Other Player Turn', 'black', 100, 200);
      }
    }
  }
}
