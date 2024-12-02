import readline from 'readline';
import fs from 'fs';

const columns = {
  one: [],
  two: [],
  differences: [],
}

// read lines
const lines = readline.createInterface({
    input: fs.createReadStream('data-one.txt'),
    crlfDelay: Infinity,
});

// create sortable columns 
for await (const line of lines) {
  const values = line.split('   ');
  columns.one.push(values[0]);
  columns.two.push(values[1]);
}

// sort columns
columns.one = columns.one.sort((a, b) => +a - +b);
columns.two = columns.two.sort((a, b) => +a - +b);

// calculate sorted differences
for (let i = 0; i < columns.one.length; i++) {
  if (i === 0) {
    console.log(+columns.one[i], +columns.two[i]);
    console.log(Math.abs(+columns.one[i] - +columns.two[i]));
  }
  
  columns.differences.push(Math.abs(+columns.one[i] - +columns.two[i]));
}

console.log(columns.differences.reduce((prev, curr) => prev + curr));