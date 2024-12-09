import { readInput } from '../../utils.js';

const map = readInput('./sample.txt')
// const map = readInput('./data.txt')
  .trim()
  .split('\n')
  .map(line => line.trim().split(''));


function partOne() {
  const antennae = {
    '#': []
  };
  let antinodes = [];
  for (const [y, row] of map.entries()) {
    for (const [x, col] of row.entries()) {
      if (!['.'].includes(col)) {
        if (!antennae[col]) {
          antennae[col] = [[y, x]];
        } else {
          antennae[col].push([y, x]);
        }
      }
    }
  }

  for (const [key, value] of Object.entries(antennae)) {
    if (key !== '#') {
      for (let i = 0; i < value.length; i++) {
        for (let j = i + 1; j < value.length; j++) {
          if (i === j) {
            continue;
          }

          const distance = getDistance(value[j], value[i]);
  
          if (distance[0] === 0 && distance[1] === 0) {
            continue;
          }

          const newPoint1 = [value[i][0] + distance[0], value[i][1] + distance[1]];
          const newPoint2 = [value[j][0] + (distance[0] * -1), value[j][1] + (distance[1] * -1)];

          
          if (map[newPoint1[0]] && map[newPoint1[0]][newPoint1[1]] && map[newPoint1[0]][newPoint1[1]] !== key && !antinodes.some(point => point[0] === newPoint1[0] && point[1] === newPoint1[1])) {
            antinodes.push((newPoint1));
          }
          if (map[newPoint2[0]] && map[newPoint2[0]][newPoint2[1]] && map[newPoint2[0]][newPoint2[1]] !== key && !antinodes.some(point => point[0] === newPoint2[0] && point[1] === newPoint2[1])) {
            antinodes.push((newPoint2));
          }
        }
      }
    }
  }

  console.log("Part 1: " + [...antennae['#'], ...antinodes].length);

  function getDistance(a, b) {
    return [b[0] - a[0], b[1] - a[1]];
  }

  // console.log(map.map(l => l.join(' ')));
}

function partTwo() {
  const antennae = {
    '#': []
  };
  let antinodes = [];
  for (const [y, row] of map.entries()) {
    for (const [x, col] of row.entries()) {
      if (!['.'].includes(col)) {
        if (!antennae[col]) {
          antennae[col] = [[y, x]];
        } else {
          antennae[col].push([y, x]);
        }
      }
    }
  }

  for (const [key, value] of Object.entries(antennae)) {
    if (key !== '#') {
      for (let i = 0; i < value.length; i++) {
        for (let j = i + 1; j < value.length; j++) {
          if (i === j) {
            continue;
          }

          const distance = getDistance(value[j], value[i]);
  
          if (distance[0] === 0 && distance[1] === 0) {
            continue;
          }

          // const newPoint1 = [value[i][0] + distance[0], value[i][1] + distance[1]];
          // const newPoint2 = [value[j][0] + (distance[0] * -1), value[j][1] + (distance[1] * -1)];
          placeAntinodes(value[i], distance, key);

          
          // if (map[newPoint1[0]] && map[newPoint1[0]][newPoint1[1]] && map[newPoint1[0]][newPoint1[1]] !== key && !antinodes.some(point => point[0] === newPoint1[0] && point[1] === newPoint1[1])) {
            // antinodes.push((newPoint1));
          // }
          // if (map[newPoint2[0]] && map[newPoint2[0]][newPoint2[1]] && map[newPoint2[0]][newPoint2[1]] !== key && !antinodes.some(point => point[0] === newPoint2[0] && point[1] === newPoint2[1])) {
          //   antinodes.push((newPoint2));
          // }
        }
      }
    }
  }

  console.log("Part 2: " + [...antennae['#'], ...antinodes].length);

  function placeAntinodes(point, distance, key) {
    let newPoint = [point[0] + distance[0], point[1] + distance[1]];
    let reversePoint = [point[0] + (distance[0] * -1), point[1] + (distance[1] * -1)];

    while (map[newPoint[0] + distance[0]] && map[newPoint[0] + distance[0]][newPoint[1] + distance[1]]) {
      if (!antinodes.some(point => point[0] === newPoint[0] && point[1] === newPoint[1])) {
        antinodes.push(newPoint);
      }
      newPoint = [newPoint[0] + distance[0], newPoint[1] + distance[1]];
    }

    while (map[reversePoint[0] + (distance[0] * -1)] && map[reversePoint[0] + (distance[0] * -1)][reversePoint[1] + (distance[1] * -1)]) {
      if (!antinodes.some(point => point[0] === reversePoint[0] && point[1] === reversePoint[1])) {
        antinodes.push(reversePoint);
      }
      reversePoint = [reversePoint[0] + (distance[0] * -1), reversePoint[1] + (distance[1] * -1)];
      console.log(newPoint, reversePoint);
    }
    console.log("antinodes.length: ", antinodes.length);
  }

  function getDistance(a, b) {
    return [b[0] - a[0], b[1] - a[1]];
  }

  // console.log(map.map(l => l.join(' ')));
}

// partOne();
partTwo();