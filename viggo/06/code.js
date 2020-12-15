const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve('./data.txt'), 'utf8', (_, data) => {
  const formatted = data.split(/\n\n/gm).map(d => {
    console.log(typeof d);

    const answers = d.replace(/\n/gm, '').split(''),
          unique = [];

    answers.forEach(a => { unique.indexOf(a) < 0 && unique.push(a); })
    console.log(unique.length, unique);
    return unique.length;
  });

  console.log(formatted);
  console.log(formatted.reduce((a,c) => a+c, 0));

  const exclusive = data.split(/\n\n/gm).map(d => {
    const peoples = d.split(/\n/gm).filter(f => !!f);


    const agreed = peoples.reduce((pa, pc) => {
      //if (!pa) return pc.split('');
      return pa.filter(a => pc.split('').indexOf(a) >= 0);
    }, peoples[0].split(''));

    console.log(peoples, agreed.join(''));

    return agreed.length;
  })

  //console.log(exclusive);
  console.log('exclusive:', exclusive.reduce((a,c) => a+c, 0));
});
