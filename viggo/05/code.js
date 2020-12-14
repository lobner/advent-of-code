const data = require('./data.js');

console.log(data.length);

const rows = [],
      seats = [];

let maxBs = 0;

const seat_ids = data.map(d => {
  const row_str = d.substring(0,7),
        seat_str = d.substring(7);

  // ROW
  let min_row = 0, max_row = 127;
  for (c of row_str) {
    if (c == 'F') max_row = min_row+Math.floor((max_row-min_row)/2);
    else if (c == 'B') min_row = min_row+Math.ceil((max_row-min_row)/2);
    else throw new Error('not F or B');
  }

  if (min_row != max_row) throw new Error('min_row != max_row');

  // SEAT
  let min_seat = 0, max_seat = 7;
  for (c of seat_str) {
    if (c == 'L') max_seat = min_seat+Math.floor((max_seat-min_seat)/2);
    else if (c == 'R') min_seat = min_seat+Math.ceil((max_seat-min_seat)/2);
    else throw new Error('not L or R');
  }

  if (min_seat != max_seat) throw new Error('min_seat != max_seat');

  const row = min_row,
        seat = min_seat,
        id = row * 8 + seat;

  rows.push(row);
  seats.push(seat);

  if (isNaN(id)) throw new Error('id is NaN');

  return id;
});

console.log(Math.max(...rows), Math.max(...seats));

console.log('>>>', Math.max(...seat_ids));

const empty = [];

for (let i = Math.min(...seat_ids); i <= Math.max(...seat_ids); i++) {
  if (seat_ids.indexOf(i) < 0) empty.push(i);
}

console.log(empty);
