const data = require('./data.js');

const passports = data.trim().split(/\n{2,}/).map(pp => (
  pp.split(/\s/).reduce((a,c) => {
    const [key, val] = c.split(':');
    return {
      ...a,
      [key]: val
    }
  },{})
));

console.log('total', passports.length);

const valid_keys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'/* , 'cid' */];
const validate = {
  byr: (val) => val && (val.length == 4 && parseInt(val) && parseInt(val) >= 1920 && parseInt(val) <= 2002),
  iyr: (val) => val && (val.length == 4 && parseInt(val) && parseInt(val) >= 2010 && parseInt(val) <= 2020),
  eyr: (val) => val && (val.length == 4 && parseInt(val) && parseInt(val) >= 2020 && parseInt(val) <= 2030),
  hgt: (val) => {
    try {
      const [_, height, unit] = val.match(/^(\d+)([a-z]{2})$/);
      //console.log(height, unit);
      if (unit == 'cm' && parseInt(height) >= 150 && parseInt(height) <= 193) return true;
      if (unit == 'in' && parseInt(height) >= 59 && parseInt(height) <= 76) return true;
      return false;
    } catch (_) {
      return false;
    }
  },
  hcl: (val) => val && (!!val.match(/^#[0-9a-f]{6}$/)),
  ecl: (val) => val && (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(val) >= 0),
  pid: (val) => val && (!!val.match(/^\d{9}$/))
}

const valid = passports.map(pp => {
  const keys = Object.keys(pp);
  // 8 fields in total - missing cid is ok
  //if (keys.length < 7) return false;
  let isValid = true;
  let invalid_keys = [];
  for (vk of valid_keys) {
    if (!pp[vk]) {
      invalid_keys.push(vk);
      isValid = false;
    }
    if (!validate[vk](pp[vk])) {
      invalid_keys.push(vk);
      isValid = false;
    }
  }
  //if (keys.length < 8 && keys.indexOf('cid') >= 0) return false;
  if (!isValid) console.log(invalid_keys, pp);
  return isValid;
});

const total_valid = valid.filter(v => !!v).length;

console.log(total_valid);

/*
byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
  If cm, the number must be at least 150 and at most 193.
  If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
*/
