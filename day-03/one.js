import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', { encoding: 'utf8', flag: 'r' });

console.log(getValidInstructions(data).map(dataset => dataset.replace('mul(','').slice(0, -1).split(',')).reduce((acc, val) => acc += val[0] * val[1], 0));

function getValidInstructions(input) {
  const mulRegex = /mul\(\d+,\d+\)/g;
  return [...input.matchAll(mulRegex)].map(match => match[0]);
}