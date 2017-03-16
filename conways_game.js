var cellSize = 5;

var startLiveProbability = 15;

var updateTime = 1000;
var lastTime = 0;

var alive,
    dead;

var cells,
    cellBuffer;

function setup() {
  alive = color(0, 255, 0);
  dead = color(0);

  createCanvas(720, 400);
  createCellArray();
  initRandomCells();
  stroke(48);
  noSmooth();
  background(0);
}

function createCellArray() {
  cells = [];
  cellBuffer = [];
  for (var x = 0; x < width / cellSize; x++) {
    cells[x] = [height / cellSize];
    cellBuffer[x] = [height / cellSize];
    for (var y = 0; y < height / cellSize; y++) {
      cells[x][y] = 0;
      cellBuffer[x][y] = 0;
    }
  }
}

function initRandomCells() {
    for (var x = 0; x < width / cellSize; x++) {
      for (var y = 0; y < height / cellSize; y++) {
      var state = random(100);
      if (state > startLiveProbability) {
        cells[x][y] = 0;
      } else {
        cells[x][y] = 1;
      }
    }
  }
}

function draw() {
  drawCells();
  if (millis() - lastTime > updateTime) {
    updateCells();
    lastTime = millis();
  }
}

function drawCells() {
  for (var x = 0; x < width / cellSize; x += 1) {
    for (var y = 0; y < height / cellSize; y += 1) {
      if (cells[x][y] === 1) {
        fill(alive);
      } else {
        fill(dead);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function updateCells() {
  saveCells();
  for (var x = 0; x < width / cellSize; x += 1) {
    for (var y = 0; y < height / cellSize; y += 1) {
      var neighbours = getNeighboursFor(x, y);

      if (cellBuffer[x][y] === 1) {
        if (neighbours < 2 || neighbours > 3) {
          cells[x][y] = 0;
        }
      } else {
        if (neighbours === 3) {
          cells[x][y] = 1;
        }
      }
    }
  }
}

function saveCells() {
  for (var x = 0; x < width / cellSize; x += 1) {
    for (var y = 0; y < height / cellSize; y += 1) {
      cellBuffer[x][y] = cells[x][y];
    }
  }
}

function getNeighboursFor(cellX, cellY) {
  var neighbours = 0;
  for (var x = cellX - 1; x < cellX + 1; x += 1) {
    for (var y = cellY - 1; y < cellY + 1; y += 1) {
      if (((x >= 0) && (x < width / cellSize)) &&
          ((y >= 0) && (y < height / cellSize))) {
        if (!(x === cellX) && !(y === cellY)) {
          if (cellBuffer[x][y] === 1) {
            neighbours += 1;
          }
        }
      }
    }
  }
  return neighbours;
}
