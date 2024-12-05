import { readFileSync } from 'fs';

const filePath = './data.txt';
// const filePath = './data-test.txt';
// const filePath = './data-test-2.txt';

const data = readFileSync(filePath, { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(line => line.split(' ').map(Number));

let safeCount = 0;


for (const line of data) {
  const isIncreasing = line[line.length - 1] > line[0];
  let isSafe = true;
  let lastReport = line[0];

  for (let i = 1; i < line.length; i++) {
    if (
      line[i] === lastReport ||
      Math.abs(line[i] - lastReport) > 3 ||
      isIncreasing !== line[i] > lastReport
    ) {
      isSafe = false;
    }

    lastReport = line[i];
  }

  if (isSafe) {
    safeCount++;
  } else {
    const isValid = recheckReports(line);
    if (isValid) {
      safeCount++;
    }
  }
}

console.log(safeCount);

function recheckReports(line) {
  let newLine = line;
  let safeResults = [];

  for (let i = 0; i < line.length; i++) {
    newLine = [...line];
    newLine.splice(i, 1);

    const isSafe = checkReport(newLine);
    safeResults.push(isSafe);
  }

  return safeResults.some(safe => safe);
}

function checkReport(line) {
  const isIncreasing = line[line.length - 1] > line[0];
  let isSafe = true;
  let lastReport = line[0];

  for (let i = 1; i < line.length; i++) {
    if (
      line[i] === lastReport ||
      Math.abs(line[i] - lastReport) > 3 ||
      isIncreasing !== line[i] > lastReport
    ) {
      isSafe = false;
    }

    lastReport = line[i];
  }

  return isSafe;
}