import readline from 'readline';
import fs from 'fs';

let safeReports = 0;

// read lines
const reports = readline.createInterface({
    input: fs.createReadStream('test-data.txt'),
    crlfDelay: Infinity,
});

// create sortable columns 
for await (const report of reports) {
  const reportValues = report.split(' ').map(Number);
  let isSafe = true;
  let lastReport = null;
  let invalidCount = 0;
  let isIncreasingReports = isIncreasing(reportValues[0], reportValues[1]);
  console.log('___________________');

  for (const report of reportValues) {
    if (lastReport) {
      // console.log(
      //   'report = lastReport: ' + (report === lastReport),
      //   '| isIncreasing() != isIncreasingReports: ' + (isIncreasing(lastReport, report) !== isIncreasingReports),
      //   '| !isWithinRange(): ' + !isWithinRange(report, lastReport));
      if (
        report === lastReport ||
        isIncreasing(lastReport, report) !== isIncreasingReports ||
        !isWithinRange(lastReport, report)) {
          invalidCount++;
      }
    }
    lastReport = report;
  }
  console.log(invalidCount);
  isSafe = invalidCount <= 1;
  if (isSafe) safeReports++;
}

console.log('*******************');
console.log(safeReports);
console.log('*******************');

function isIncreasing(report1, report2) {
  return report1 > report2
}

function isWithinRange(report1, report2) {
  return Math.abs(report1 - report2) <= 3
}
