class BattleShip {
  constructor(canvasID, size = 10) {
    this.size = size;
    this.board = [];
    this.currenthit = 'hit';
    this.currentmiss = 'miss';
    this.stateShip = 'ship';
    this.canvas = document.getElementById(canvasID);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight / 2;
    this.sizeofcell = Math.floor(Math.min(this.canvas.clientHeight, this.canvas.clientWidth) / size);
  }

  createCells(offsetX = 0, offsetY = 0) {
    for (let row = 0; row < this.size; ++row) {
      for (let col = 0; col < this.size; ++col) {
        let cell = new Cell(
          offsetX + this.sizeofcell * row,
          offsetY + this.sizeofcell * col,
          this.sizeofcell,
          this.sizeofcell
        );
        this.board.push(cell);
      }
    }
  }

  draw(times) {
    this.times = times;
    for (let cell = 0; cell < this.size * this.size * times; ++cell) {
      var celldraw = this.board[cell];
      this.ctx.save();
      this.ctx.translate(celldraw.x, celldraw.y);
      this.ctx.strokeRect(0, 0, celldraw.width, celldraw.height);
      this.ctx.restore();
    }
  }

  drawBattleship(ships) {
    if (ships) {
      for (let key in ships) {
        let ship = ships[key];
        for (let index = 0; index < ship.length; index++) {
          this.drawShip(ship[index]);
        }
      }
    }
  }

  drawShip(cell) {
    if (!cell) {
      return;
    }

    let cellObj = gameLogics.board[cell];
    let current = cellObj.getState();
    if (current === 'hit' || current === 'miss' || current === 'ship') {
      return;
    }

    cellObj.setState(this.stateShip);
    cellObj.draw(this.ctx);
  }

  drawText(text, fill, textwidth, textheight) {
    this.ctx.beginPath(); //added
    this.ctx.clearRect(
      this.sizeofcell * 10 + 41,
      0,
      this.canvas.width - this.sizeofcell * 23,
      this.canvas.height
    );
    this.ctx.font = '20px verdana';
    this.ctx.fillStyle = fill;
    this.ctx.lineWidth = 4;
    this.ctx.fillText(text, canvas.width / 2 - 200, canvas.height / 2 - 100);
    this.ctx.stroke();
  }
}

class Cell {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.state = ' ';
  }

  clickedCell(x, y) {
    return x < this.width + this.x && x > this.x && (y < this.height + this.y && y > this.y);
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  draw(ctx) {
    if (this.state === 'hit') {
      this.drawX(ctx);
    }

    if (this.state === 'miss') {
      this.drawO(ctx);
    }

    if (this.state === 'ship') {
      this.drawShip(ctx);
    }
  }

  drawO(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(this.x + this.width / 2, this.y + this.width / 2, this.width / 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  drawShip(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
    ctx.stroke();
  }

  drawX(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
    let offset = this.width / 5;
    ctx.moveTo(this.x + offset, this.y + offset);
    ctx.lineTo(this.x + this.width - offset, this.y + this.width - offset);
    ctx.moveTo(this.x + offset, this.y + this.width - offset);
    ctx.lineTo(this.x + this.width - offset, this.y + offset);
    ctx.stroke();
  }
}
