import readline from 'readline';
import fs from 'fs';

const columns = {
  one: [],
  two: [],
}

// read lines
const lines = readline.createInterface({
    input: fs.createReadStream('data-one.txt'),
    crlfDelay: Infinity,
});

// create sortable columns 
for await (const line of lines) {
  const values = line.split('   ');
  columns.one.push(+values[0]);
  columns.two.push(+values[1]);
}

// sort columns
columns.two = columns.two.sort((a, b) => a - b);

let index = 0;
const score = columns.one.sort((a, b) => a - b).reduce((prev, curr) => {
  index++;
  return prev + Math.abs(curr - columns.two[index - 1]);
}, 0);