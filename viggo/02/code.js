const data = require('./data');

let valid_count = 0,
    valid2_count = 0,
    total_count = 0;

console.log('checking '+data.length+' entries');

const key_rex = /(\d+)-(\d+) (\w)/g; // $1 = min, $2 = max, $3 = char

for ([key, val] of data) {
  const [_, min, max, char] = [...key.matchAll(key_rex)][0],
        count = [...val].filter(c => c==char).length,
        valid = (count >= min && count <= max),
        c1 = val[min-1], c2 = val[max-1]
        valid_2 = (c1 == char || c2 == char) && c1 != c2;

  if (valid) {
    valid_count++;
  }
  if (valid_2) {
    console.log(`${count} - ${key}: ${val}`);
    valid2_count++;
  }
  total_count++;
}

console.log('Policy 1: '+valid_count+' of '+total_count);
console.log('Policy 2: '+valid2_count+' of '+total_count);
