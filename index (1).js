function isValidMove(x, y, grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  return x >= 0 && x < rows && y >= 0 && y < cols && grid[x][y] !== 0;
}

function horseMoves(x, y, grid) {
  const dx = [-2, -2, 2, 2, -1, -1, 1, 1];
  const dy = [-1, 1, -1, 1, -2, 2, -2, 2];
  const moves = [];

  for (let i = 0; i < 8; i++) {
    const newX = x + dx[i];
    const newY = y + dy[i];
    if (isValidMove(newX, newY, grid)) {
      moves.push([newX, newY]);
    }
  }

  return moves;
}

function bishopMoves(x, y, grid) {
  const moves = [];

  for (let dx = -1; dx <= 1; dx += 2) {
    for (let dy = -1; dy <= 1; dy += 2) {
      let newX = x + dx;
      let newY = y + dy;
      while (isValidMove(newX, newY, grid)) {
        moves.push([newX, newY]);
        newX += dx;
        newY += dy;
      }
    }
  }

  return moves;
}

function findMeetingPoint(horsePos, bishopPos, grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  visited[horsePos[0]][horsePos[1]] = true;

  const horseQueue = [horsePos];

  while (horseQueue.length > 0) {
    const [horseX, horseY] = horseQueue.shift();

    if (horseX === bishopPos[0] && horseY === bishopPos[1]) {
      return [horseX, horseY];
    }

    const horseNextMoves = horseMoves(horseX, horseY, grid);
    for (const nextMove of horseNextMoves) {
      const [nextX, nextY] = nextMove;
      if (!visited[nextX][nextY]) {
        visited[nextX][nextY] = true;
        horseQueue.push([nextX, nextY]);
      }
    }
  }

  const bishopNextMoves = bishopMoves(bishopPos[0], bishopPos[1], grid);
  for (const nextMove of bishopNextMoves) {
    const [nextX, nextY] = nextMove;
    if (visited[nextX][nextY]) {
      return [nextX, nextY];
    }
  }

  return "No meeting point found";
}

// 1 is active and 0 is inactive

//Example-1
const grid = [
  [1, 1, 1, 0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 1, 1, 1, 1, 1],
];

const horsePosition = [6, 6];
const bishopPosition = [3, 2];

//example-2

const grid1 = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]


const horsePosition1 = [2, 2];
const bishopPosition1 = [0, 0];














const res = findMeetingPoint(horsePosition, bishopPosition, grid);
console.log("Test Case-0: Meeting Point:", res);


const res1 = findMeetingPoint(horsePosition1, bishopPosition1, grid1);
console.log("Test Case-1: Meeting Point:", res1);
