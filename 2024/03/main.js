import { readFileSync } from 'fs';

const data = readFileSync('./data.txt', { encoding: 'utf8', flag: 'r' });

function challengeOne() {
  console.log("Challenge 1: " + getValidInstructions(data).map(dataset => dataset.replace('mul(','').slice(0, -1).split(',')).reduce((acc, val) => acc += val[0] * val[1], 0));
  
  function getValidInstructions(input) {
    const mulRegex = /mul\(\d+,\d+\)/g;
    return [...input.matchAll(mulRegex)].map(match => match[0]);
  }
}

challengeOne();

function challengeTwo() {
  const firstInstructions = data.split("don't()")[0];
  const instructions = firstInstructions + data.split("don't()").map(dont => dont.slice(dont.indexOf("do()"))).join('');

  console.log("Challenge 2: " + getValidInstructions(instructions).map(dataset => dataset.replace('mul(','').slice(0, -1).split(',')).reduce((acc, val) => acc += val[0] * val[1], 0));
  
  function getValidInstructions(input) {
    const mulRegex = /mul\(\d+,\d+\)/g;
    return [...input.matchAll(mulRegex)].map(match => match[0]);
  }
}

challengeTwo();