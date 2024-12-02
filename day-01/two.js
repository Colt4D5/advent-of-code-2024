import readline from 'readline';
import fs from 'fs';

const columns = {
  one: [],
  two: [],
  similarityScore: 0,
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

for (let i = 0; i < columns.one.length; i++) {
  const currId = columns.one[i];
  let count = 0;
  for (let j = 0; j < columns.two.length; j++) {
    const currSecondId = columns.two[j];
    if (currId === currSecondId) {
      count++
    }
  }
  columns.similarityScore += currId * count;
}

console.log(columns.similarityScore);
