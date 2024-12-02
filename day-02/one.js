import readline from 'readline';
import fs from 'fs';

let safeReports = 0;

// read lines
const reports = readline.createInterface({
    input: fs.createReadStream('data.txt'),
    crlfDelay: Infinity,
});

// create sortable columns 
for await (const report of reports) {
  const reportValues = report.split(' ').map(Number);
  let isSafe = true;
  let lastReport = null;
  let isIncreasingReports = isIncreasing(reportValues[0], reportValues[1]);

  for (const report of reportValues) {
    if (lastReport) {
      if (
        report === lastReport ||
        isIncreasing(lastReport, report) !== isIncreasingReports ||
        !isWithinRange(report, lastReport)) {
        isSafe = false;
      }
    }
    lastReport = report;
  }
  if (isSafe) safeReports++;
}

function isIncreasing(report1, report2) {
  return report1 > report2
}

function isWithinRange(report1, report2) {
  return Math.abs(report1 - report2) <= 3
}
