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
    let inCorrectOrder = true;
    for (const [i, currPage] of Object.entries(pageList)) {
      for (let j = Number(i) + 1; j < pageList.length; j++) {
        if (i < pageList.length - 1) {
          const pageCursor = pageList[j];
          const [firstPage, secondPage] = j > Number(i) ? [currPage, pageCursor] : [pageCursor, currPage];
          const result = pairs.some(pair => pair[0] === firstPage && pair[1] === secondPage);
          if (!result) {
            inCorrectOrder = false;
          }
        }
      }
    }
    if (inCorrectOrder) {
      const middleNumber = pageList[(pageList.length - 1) / 2]
      resultCount += middleNumber;
    }
  }

  console.log("Challenge 1: " + resultCount);
}

challengeOne();