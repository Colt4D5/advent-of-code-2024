import { readFileSync } from 'fs';

const word = 'XMAS';

let [pairs, pageLists] = readFileSync('./data.txt', { encoding: 'utf8', flag: 'r' })
  .split('\n\n');

pairs = pairs.split('\n').map(pair => pair.split('|').map(Number));
pageLists = pageLists.split('\n').map(pages => pages.split(',').map(Number))

// console.log(pairs);
// console.log(pageLists);

function challengeOne() {
  let resultCount = 0;

  for (const pageList of pageLists) {
    let correctOrder = true;
    for (const [i, currPage] of Object.entries(pageList)) {
      for (let j = Number(i) + 1; j < pageList.length; j++) {
        if (i < pageList.length - 1) {
          const pageCursor = pageList[j];
          const [firstPage, secondPage] = j > Number(i) ? [currPage, pageCursor] : [pageCursor, currPage];
          const result = pairs.some(pair => pair[0] === firstPage && pair[1] === secondPage);
          if (!result) {
            correctOrder = false;
          }
        }
      }
    }
    if (correctOrder) {
      const middleNumber = pageList[(pageList.length - 1) / 2]
      resultCount += middleNumber;
    }
  }

  console.log("Challenge 1: " + resultCount);
}

challengeOne();

function challengeTwo() {
  let resultCount = 0;
  let incorrectUpdates = [];

  for (const pageList of pageLists) {
    let correctOrder = true;
    for (const [i, currPage] of Object.entries(pageList)) {
      let result = true;
      for (let j = Number(i) + 1; j < pageList.length; j++) {
        if (i < pageList.length - 1) {
          const pageCursor = pageList[j];
          const [firstPage, secondPage] = j > Number(i) ? [currPage, pageCursor] : [pageCursor, currPage];
          result = pairs.some(pair => pair[0] === firstPage && pair[1] === secondPage);
          if (!result) {
            correctOrder = false;
            break;
          }
        }
      }
      if (!result) {
        break;
      }
    }
    if (!correctOrder) {
      incorrectUpdates.push(pageList);
    }
  }

  let middleNumCount = 0;
  for (const update of incorrectUpdates) {
    let arrayOfIndexes = [];
    for (let i = 0; i < update.length; i++) {
      let count = 0;
      for (let j = 0; j < update.length; j++) {
        if (i !== j) {
          count += pairs.some(pair => pair[0] === update[i] && pair[1] === update[j]) ? 1 : 0;
        }
      }
      arrayOfIndexes.push(count);
    }
    const middleNumber = update[arrayOfIndexes.indexOf((arrayOfIndexes.length - 1) / 2)];
    middleNumCount += middleNumber;
  }
  console.log("Challenge 2: " + middleNumCount);
}

challengeTwo();