import { readInput } from '../../utils.js';

const equations = readInput('./data.txt')
  .split('\n')
  .map(equation => equation.trim().replace(':', '').split(' ').map(Number));


function partOne() {
  let accumulator = 0;
  for (const [answer, ...nums] of equations) {
    if (isValid(answer, nums[0], nums.slice(1))) {
      accumulator += answer;
    }
  }

  console.log("Challenge 1: ", accumulator);

  function isValid(answer, accumulator, nums) {
    if (nums.length === 0) {
      return accumulator === answer;
    }

    if (isValid(answer, accumulator + nums[0], nums.slice(1)) || isValid(answer, accumulator * nums[0], nums.slice(1))) {
      return true;
    }

    return false;
  }
}

function partTwo() {
  let accumulator = 0;
  for (const [answer, ...nums] of equations) {
    if (isValid(answer, nums[0], nums.slice(1))) {
      accumulator += answer;
    }
  }
  console.log("Challenge 2: ", accumulator);

  function isValid(answer, accumulator, nums) {
    if (nums.length === 0) {
      return accumulator === answer;
    }

    const [first, ...rest] = nums;

    // addition
    if (isValid(answer, accumulator + first, rest) || isValid(answer, accumulator * first, rest)) {
      return true;
    }

    // multiplication
    if (isValid(answer, accumulator * first, rest)) {
      return true;
    }

    // concatenation
    const concatenatedNumber = +`${accumulator}${first}`;

    if (isValid(answer, concatenatedNumber, rest)) {
      return true;
    }

    return false;
  }
}

partOne();
partTwo();