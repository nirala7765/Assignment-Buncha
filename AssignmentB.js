function meetingPoint(n, m, horsePosition, bishopPosition, inactivePositions) {
  //  possible moves for the horse
  const horseMoves = [
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
      [-2, 1],
      [-1, 2],
      [1, 2],
      [2, 1]
  ];

  //  function to check if a position is valid and not in the set of inactive positions
  function isCorrect(x, y) {
      return x >= 0 && x < n && y >= 0 && y < m && !inactivePositions.has(`${x},${y}`);
  }

  //  visited sets for both Animals
  const hrsWalking = new Set();
  const bishopWalking = new Set();

  //  queues for BFS for both the Animals
  const horseQ = [{ x: horsePosition[0], y: horsePosition[1], steps: 0 }];
  const bishopQ = [{ x: bishopPosition[0], y: bishopPosition[1], steps: 0 }];

  //  BFS for the horse
  while (horseQ.length > 0) {
      const { x, y, steps } = horseQ.shift();

      if (hrsWalking.has(`${x},${y}`)) {
          continue;
      }

      hrsWalking.add(`${x},${y}`);

      for (const [dx, dy] of horseMoves) {
          const nx = x + dx;
          const ny = y + dy;

          if (isCorrect(nx, ny)) {
              horseQ.push({ x: nx, y: ny, steps: steps + 1 });
          }
      }
  }

  // BFS for the bishop
  while (bishopQ.length > 0) {
      const { x, y, steps } = bishopQ.shift();

      if (bishopWalking.has(`${x},${y}`)) {
          continue;
      }

      bishopWalking.add(`${x},${y}`);

      // Check if the bishop's position matches any of the horse's visited positions
      if (hrsWalking.has(`${x},${y}`)) {
          return { x, y };
      }

      // Add diagonal positions to the bishop's queue
      for (const [dx, dy] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) {
          const nx = x + dx;
          const ny = y + dy;

          if (isCorrect(nx, ny)) {
              bishopQ.push({ x: nx, y: ny, steps: steps + 1 });
          }
      }
  }

  
  return null;
}



const n = 8; 
const m = 8;
const horsePosition = [5, 5]; 
const bishopPosition = [2, 3]; 
const inactivePositions = new Set(['0,3', '2,0']); 

const meetingPointResult = meetingPoint(n, m, horsePosition, bishopPosition, inactivePositions);

if (meetingPointResult) {
  console.log(`Horse and Bishop can meet at position: ${meetingPointResult.x}, ${meetingPointResult.y}`);
} else {
  console.log("Horse and Bisho cannot meet.");
}
