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

  drawShipState(cellObj, Fromopponent, state) {
    cellObj.setState(state);
    cellObj.draw(this.ctx);
    Fromopponent
      ? battleshipGame.drawText('your Turn Attack!', 'black', 100, 200)
      : battleshipGame.drawText('Other Player Turn', 'black', 100, 200);
  }

  checkboardIfHit(cell, ifHit, Fromopponent) {
    let cellObj = this.board[cell];
    ifHit
      ? this.drawShipState(cellObj, !Fromopponent, this.currenthit)
      : this.drawShipState(cellObj, Fromopponent, this.currentmiss);
  }
}
