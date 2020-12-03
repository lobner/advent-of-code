const numbers = require('./01.js');
/*
let above = [], below = [];

for (const n in numbers) {
  if (n < 1000) bleow.push(n);
  else above.push(n)
}
*/
const min = Math.min(...numbers),
      max = Math.max(...numbers);

for (const a of numbers) {
  if (a+min > 2020) continue;
  for (const b of numbers) {
    if (a+b > 2020 || a+b+min > 2020 || a+b + max < 2020) continue;
    for (const c of numbers) {
      if (a+b+c == 2020) console.log(a, b, c, a*b*c);
    }
  }
}
