import { readFileSync } from 'fs';

let safeCount = 0;

const reports = readFileSync('./data.txt', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map(l => l.split(' ').map(Number))

for (const report of reports) {
  const isSafe = isValid(report);
  if (isSafe) safeCount++;
}
console.log(safeCount);

function isValid(reports) {
  let isValidBool = true;
  let lastReport = reports[0]; // starting value
  let willRecheck = false;
  let reportState = {
    isNotEqual: [],
    direction: [],
    range: []
  }
  for (let i = 1; i < reports.length; i++) {
    reportState.isNotEqual.push(reports[i] !== lastReport);
    reportState.direction.push(reports[i] > lastReport ? 'increasing' : 'decreasing');
    reportState.range.push(Math.abs(reports[i] - lastReport) <= 3);
    
    lastReport = reports[i];
  }
  if (
    new Set(reportState.isNotEqual).size > 1 ||
    new Set(reportState.direction).size > 1 ||
    new Set(reportState.range).size > 1
  ) {
    willRecheck = true;
  }

  if (willRecheck) {
    const newReport = removeInvalidLevel(reportState, reports);
    
    // rechecking
    isValidBool = true;
    lastReport = newReport[0]
    reportState = {
      isNotEqual: [],
      direction: [],
      range: []
    }
    for (let i = 1; i < newReport.length; i++) {
      reportState.isNotEqual.push(newReport[i] !== lastReport);
      reportState.direction.push(newReport[i] > lastReport ? 'increasing' : 'decreasing');
      reportState.range.push(Math.abs(newReport[i] - lastReport) <= 3);
      
      lastReport = newReport[i];
    }
    if (
      new Set(reportState.isNotEqual).size > 1 ||
      new Set(reportState.direction).size > 1 ||
      new Set(reportState.range).size > 1
    ) {
      isValidBool = false;
    }
  }

  return isValidBool;
}

function removeInvalidLevel({ isNotEqual, direction, range }, reports) {
  let newReport;
  const uniqueEqu = isNotEqual.findIndex(val => isNotEqual.indexOf(val) === isNotEqual.lastIndexOf(val));
  const uniqueDir = direction.findIndex(val => direction.indexOf(val) === direction.lastIndexOf(val));
  const uniqueRange = range.findIndex(val => range.indexOf(val) === range.lastIndexOf(val));
  if (uniqueEqu > 0) {
    removeElement(reports, uniqueEqu);
  }
  if (uniqueDir > 0) {
    removeElement(reports, uniqueDir);
  }
  if (uniqueRange > 0) {
    removeElement(reports, uniqueRange);
  }

  return reports;
}

function removeElement(arr, index) {
  return arr.splice(index, 1);
}