import { readFileSync } from 'fs';

const matrix = readFileSync('./data.txt', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => line.split(''));

const guard = {
  character: '^',
  path: 'X',
  obstacle: '#',
  currentPos: [],
  prev: [],
  direction: {
    y: -1,
    x: 0,
    map: {
      index: 0,
      directions: ['up','right','down','left'],
      up: [-1, 0],
      right: [0, 1],
      down: [1, 0],
      left: [0, -1]
    }
  },
  isInView: true
};

let found = false;
for (const [i, line] of matrix.entries()) {
  for (const [j, step] of line.entries()) {
    if (matrix[i][j] === guard.character) {
      guard.currentPos = [i, j];
      found = true;
      break;
    }
  }
  if (found) {
    break;
  }
}

// while (matrix[guard.currentPos[0] + guard.direction.y][guard.currentPos[1] + guard.direction.x] != guard.obstacle) {
while (guard.isInView) {
  executeStep();
}


function turnGuardRight() {
  guard.direction.map.index = guard.direction.map.index >= guard.direction.map.directions.length - 1 ? 0 : guard.direction.map.index + 1;
  guard.direction.y = guard.direction.map[guard.direction.map.directions[guard.direction.map.index]][0];
  guard.direction.x = guard.direction.map[guard.direction.map.directions[guard.direction.map.index]][1];
}

function executeStep() {
  // calculate next step
  const nextStepChar = nextStep();

  if (!nextStepChar) {
    guard.isInView = false;

    // push previous position to prev array
    if (matrix[guard.currentPos[0]][guard.currentPos[1]] !== guard.path) {
      guard.prev.push([guard.currentPos[0], guard.currentPos[1]]);
    }

    matrix[guard.currentPos[0]][guard.currentPos[1]] = guard.path;

    console.log("Challenge 1: " + guard.prev.length);
    return;
  }

  // turn if necessary
  if (nextStepChar === guard.obstacle) {
    turnGuardRight();
  }

  // take next Step (replace current with X and ^ with new position)
  takeStep();
}

function nextStep() {
  if (matrix[guard.currentPos[0] + guard.direction.y] && matrix[guard.currentPos[0] + guard.direction.y][guard.currentPos[1] + guard.direction.x]) {
    return matrix[guard.currentPos[0] + guard.direction.y][guard.currentPos[1] + guard.direction.x];
  }
}

function takeStep() {
  // replace current position with X
  matrix[guard.currentPos[0]][guard.currentPos[1]] = guard.path;
  
  // push previous position to prev array
  if (matrix[guard.currentPos[0] + guard.direction.y][guard.currentPos[1] + guard.direction.x] !== guard.path) {
    guard.prev.push([guard.currentPos[0], guard.currentPos[1]]);
  }
  
  // replace new position with ^
  matrix[guard.currentPos[0] + guard.direction.y][guard.currentPos[1] + guard.direction.x] = guard.character;
  
  // set new position
  guard.currentPos = [guard.currentPos[0] + guard.direction.y, guard.currentPos[1] + guard.direction.x];
}