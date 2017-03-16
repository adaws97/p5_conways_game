var cellSize;
var alive,
    dead;

var cells,
    cellBuffer;

function setup() {
  alive = color(0, 190, 0);
  dead = color(0);
  createCanvas(windowWidth, windowHeight);
  cellSize = 10;
  createCellArray();
  initRandomEntities();
  stroke(48);
  noSmooth();
  frameRate(2);
  background(0);
}

function createCellArray() {
  cells = [];
  cellBuffer = [];
  for (var x = 0; x < width / cellSize; x += 1) {
    cells[x] = [height / cellSize];
    cellBuffer[x] = [height / cellSize];
    for (var y = 0; y < height / cellSize; y += 1) {
      cells[x][y] = 0;
      cellBuffer[x][y] = 0;
    }
  }
}

function initRandomCells() {
  var startLiveProbability = 1;
  for (var x = 0; x < width / cellSize; x += 1) {
    for (var y = 0; y < height / cellSize; y += 1) {
      var state = random(100);
      if (state > startLiveProbability) {
        cells[x][y] = 0;
      } else {
        cells[x][y] = 1;
      }
    }
  }
}

function initRandomEntities() {
  var chanceToCreate = 1;
  for (var x = 0; x < width / cellSize; x += 1) {
    for (var y = 0; y < height / cellSize; y += 1) {
      var random = Math.random() * 500;
      if (random < chanceToCreate) {
        var entityChoice = floor(Math.random() * 6);
        switch (entityChoice) {
          case 0:
            placeBeaconAt(x, y);
            break;
          case 1:
            placeHorizontalBlinkerAt(x, y);
            break;
          case 2:
            placeLoafAt(x, y);
            break;
          case 3:
            placeBeehiveAt(x, y);
            break;
          case 4:
            placeToadAt(x, y);
            break;
          case 5:
            placeBlockAt(x, y);
            break;
          case 6:
            placePentadecathlonAt(x, y);
            break;
          default:
          break;
        }
      }
    }
  }
}

function placeBlockAt(x, y) {
  if (x + 1 < width / cellSize &&
      y + 1 < height / cellSize) {
    cells[x][y] = 1;
    cells[x + 1][y] = 1;
    cells[x][y + 1] = 1;
    cells[x + 1][y + 1] = 1;
  }
}

function placeBeehiveAt(x, y) {
  if (x + 3 < width / cellSize &&
      y + 2 < height / cellSize) {
    cells[x + 1][y] = 1;
    cells[x + 2][y] = 1;
    cells[x][y + 1] = 1;
    cells[x + 3][y + 1] = 1;
    cells[x + 1][y + 2] = 1;
    cells[x + 2][y + 2] = 1;
  }
}

function placeLoafAt(x, y) {
  if (x + 3 < width / cellSize &&
      y + 2 < height / cellSize) {
    cells[x + 1][y] = 1;
    cells[x + 2][y] = 1;
    cells[x][y + 1] = 1;
    cells[x + 3][y + 1] = 1;
    cells[x + 1][y + 2] = 1;
    cells[x + 3][y + 2] = 1;
    cells[x + 2][y + 2] = 1;
  }
}

function placeHorizontalBlinkerAt(x, y) {
  if (x + 2 < width / cellSize) {
    cells[x][y] = 1;
    cells[x + 1][y] = 1;
    cells[x + 2][y] = 1;
  }
}

function placeVerticalBlinkerAt(x, y) {
  if (y + 2 < height / cellSize) {
    cells[x][y] = 1;
    cells[x][y + 1] = 1;
    cells[x][y + 2] = 1;
  }
}

function placeToadAt(x, y) {
  if (x + 3 < width / cellSize &&
      y + 1 < height / cellSize) {
    cells[x + 1][y] = 1;
    cells[x + 2][y] = 1;
    cells[x + 3][y] = 1;
    cells[x][y + 1] = 1;
    cells[x + 1][y + 1] = 1;
    cells[x + 2][y + 1] = 1;
  }
}

function placeBeaconAt(x, y) {
  placeBlockAt(x, y);
  placeBlockAt(x + 2, y + 2);
}

function placePentadecathlonAt(x, y) {
  if (x + 3 < width / cellSize &&
      y + 6 < height / cellSize) {
    placeHorizontalBlinkerAt(x, y);
    cells[x + 1][y + 1] = 1;
    cells[x + 3][y + 1] = 1;
    placeHorizontalBlinkerAt(x, y + 2);
    placeHorizontalBlinkerAt(x, y + 3);
    placeHorizontalBlinkerAt(x, y + 4);
    placeHorizontalBlinkerAt(x, y + 5);
    cells[x + 1][y + 6] = 1;
    cells[x + 3][y + 6] = 1;
    placeHorizontalBlinkerAt(x, y + 7);
  }
}

function draw() {
  drawCells();
  updateCells();
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
  for (var x = cellX - 1; x <= cellX + 1; x += 1) {
    for (var y = cellY - 1; y <= cellY + 1; y += 1) {
      if (((x >= 0) && (x < width / cellSize)) &&
          ((y >= 0) && (y < height / cellSize))) {
        if (!((x == cellX) && (y == cellY))) {
          if (cellBuffer[x][y] === 1) {
            neighbours += 1;
          }
        }
      }
    }
  }
  return neighbours;
}
