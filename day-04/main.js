import { readFileSync } from 'fs';

const word = 'XMAS';

const matrix = readFileSync('./data.txt', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => line.split(''));

// console.log(matrix);

function challengeOne() {
  const firstLetterCoords = [];
  for (const [row, rowVal] of Object.entries(matrix)) {
    for (const [col, l] of Object.entries(rowVal)) {
      if (l === 'X') {
        firstLetterCoords.push([row, col]);
      }
    }
  }

  const xmasInstances = [];

  for (const [startRow, startCol] of firstLetterCoords) {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const isXmas = checkForNextLetter([Number(startRow), Number(startCol)], i, j);
        if (isXmas) {
          xmasInstances.push(isXmas);
        }
      }
    }
  }

  function checkForNextLetter([ startRow, startCol ], row, col) {
    const checkCoords = [];
    let currentRow = startRow;
    let currentCol = startCol;

    // Check if first letter matches
    if (matrix[currentRow][currentCol] !== word[0]) {
      return null;
    }
    
    const path = [[currentRow, currentCol]];
    
    for (let i = 1; i < word.length; i++) {
      currentRow += row;
      currentCol += col;
      
      if (
        currentRow < 0 || 
        currentRow >= matrix.length || 
        currentCol < 0 || 
        currentCol >= matrix[0].length
      ) {
        return null;
      }
      
      if (matrix[currentRow][currentCol] !== word[i]) {
        return null;
      }
      
      path.push([currentRow, currentCol]);
    }

    return path;
  }


  console.log("Challenge 1: " + xmasInstances.length);
}

challengeOne();
