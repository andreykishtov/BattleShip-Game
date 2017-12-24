class GameLogics extends BattleShip {
  constructor() {
    super('canvas');
    this.registerEventListener();
  }

  registerEventListener() {
    this.canvas.addEventListener('click', event => this.onClick(event));
  }

  onClick(event) {
    for (let cell = 100; cell < this.size * this.size * this.times; ++cell) {
      if (this.board[cell].clickedCell(event.offsetX, event.offsetY)) {
        if (this.AllreadyHit(cell)) {
          return;
        }
        communication.fromServerIfHit(cell);
        return;
      }
    }
  }

  AllreadyHit(cell) {
    if (cell === undefined) {
      return;
    }
    let cellObj = this.board[cell];
    let current = cellObj.getState();
    return current === 'miss' || current === 'hit';
  }

  checkboardIfHit(cell, ifHit, Fromopponent) {
    let cellObj = this.board[cell];
    ifHit ? this.setStateLogic('hit') : this.setStateLogic('miss');
  }

  setStateLogic(currentState, color = 'black') {
    let state = {
      hit: {
        text: 'Other Player Turn',
        currentHit: this.currenthit
      },
      miss: {
        text: 'your Turn Attack!',
        currentHit: this.currentmiss
      }
    };
    cellObj.setState(state[currentState].currentHit);
    cellObj.draw(this.ctx);
    battleshipGame.drawText(state[currentState].text, color, 100, 200);
  }
}
