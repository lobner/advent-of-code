const data = require('./data.js');

let treecounts = [];
let splitData = data.trim().split(/\n/g);

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
]

for (slope of slopes) {
  let j = 0,
      count = 0;
  const [x, y] = slope;


  for (let i = y; i < splitData.length; i += y) {
    const row = splitData[i],
          step = j+x;
    console.log(x, y, row, step, i);

    j = (step >= row.length) ? step - row.length : step;

    if (row[j] == '#') count++;
  }
  treecounts.push(count);
}

const product = treecounts.reduce((a, c) => {
  if (a == null) return c;
  return a*c;
}, null);

console.log(treecounts, product);
