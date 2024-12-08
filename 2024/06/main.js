import { inspect } from 'util';
import { readInput } from '../../utils.js';

// reconfigure default console.log()
let temp = console.log
console = {
  ...console,
  log: (...a) => temp(...a.map(b => inspect(b, { compact: true, breakLength: 100 })))
}

const originalMatrix = JSON.stringify(readInput('./data.txt')
  .split('\n')
  .map(line => line.split('')));

let matrix = JSON.parse(originalMatrix);


function challengeTwo() {
  let loopCount = 0;

  let obstruction = {
    position: [0, 0],
    obstacle: '0'
  }

  let guard = {
    character: '^',
    corner: '+',
    path: 'X',
    obstacle: '#',
    currentPos: [],
    originalPos: [],
    prevChar: '.',
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
    isInView: true,
  };

  let found = false;
  for (const [i, line] of matrix.entries()) {
    for (const [j, _] of line.entries()) {
      if (matrix[i][j] === guard.character) {
        guard.currentPos = [i, j];
        guard.originalPos = [i, j];
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }

  for (let y = 0; y < matrix[0].length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      resetMatrix();
      if (matrix[y][x] === '.') {
        matrix[y][x] = obstruction.obstacle;
        while (guard.isInView) {
          // calculate next step char
          let nextStepChar = getNextStepChar();

          // end if no next step (out of bounds)
          if (!nextStepChar) {
            guard.isInView = false;
          }

          // if next step is + check step after that for # or 0
          if (nextStepChar === guard.corner) {
            const afterNextStepChar = getNextStepChar(2); // pass multiplier to get next step after next step
            if ([guard.obstacle, obstruction.obstacle].includes(afterNextStepChar)) {
              isLoop();
            }
          }
          
          // turn if necessary
          while (nextStepChar === guard.obstacle || nextStepChar === obstruction.obstacle) {
            turnGuardClockwise();

            // calculate new next step char
            nextStepChar = getNextStepChar();

            // end if no next step (out of bounds)
            if (!nextStepChar) {
              guard.isInView = false;
              // return;
            }
  
            // if next step is + check step after that for # or 0
            if (nextStepChar === guard.corner) {
              const afterNextStepChar = getNextStepChar(2); // pass multiplier to get next step after next step
              // console.log("Step 1: " + nextStepChar + " | Step 2: " + afterNextStepChar);
              if ([guard.obstacle, obstruction.obstacle].includes(afterNextStepChar)) {
                isLoop();
              }
            }
          }

          // take next Step
          takeStep(nextStepChar);
        }
      }
    }
  }
  console.log("Challenge 2: " + loopCount);

  function getNextStepChar(multiplier = 1) {
    if (matrix[guard.currentPos[0] + (guard.direction.y * multiplier)] && matrix[guard.currentPos[0] + (guard.direction.y * multiplier)][guard.currentPos[1] + (guard.direction.x * multiplier)]) {
      return matrix[guard.currentPos[0] + (guard.direction.y * multiplier)][guard.currentPos[1] + (guard.direction.x * multiplier)];
    }
  }

  function turnGuardClockwise() {
    guard.direction.map.index = guard.direction.map.index >= guard.direction.map.directions.length - 1 ? 0 : guard.direction.map.index + 1;
    guard.direction.y = guard.direction.map[guard.direction.map.directions[guard.direction.map.index]][0];
    guard.direction.x = guard.direction.map[guard.direction.map.directions[guard.direction.map.index]][1];
    matrix[guard.currentPos[0]][guard.currentPos[1]] = guard.corner;
  }

  function takeStep() {
    guard.currentPos = [guard.currentPos[0] + guard.direction.y, guard.currentPos[1] + guard.direction.x];
  }

  function isLoop() {
    guard.isInView = false;
    loopCount++;
    return;
  }

  function resetMatrix() {
    guard.isInView = true;
    guard.currentPos = guard.originalPos;
    guard.direction.y = -1;
    guard.direction.x = 0;
    guard.direction.map.index = 0;
    matrix = JSON.parse(originalMatrix);
  }
}


function challengeOne() {
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
}


challengeTwo();
challengeOne();