const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve('./data.txt'), 'utf8', (_, data) => {
  const child_parent = data.split(/\n/gm).filter(d => !!d).reduce((acc, cur) => {
    const [parent, children_str] = cur.split(' bags contain '),
          children = children_str.split(',').map(c => {
            try {
              return c.match(/\d+ ((\w| )+) bags?/)[1];
            } catch (e) {
              // ignore, it is not a match
              //console.log(c);<
            }
          });

    const children_obj = children.reduce((a,c) => {
      const existing = acc[c] || [],
            child = [...existing, parent];

      return (
        c ? {...a, [c]: child} : a
      )
    }, {});

    return {
      ...acc,
      ...children_obj
    }
  }, {});

  //console.log(child_parent);

  const our_bag = 'shiny gold',
        possible = [];

  const recurse = (bag) => {
    const parents = child_parent[bag];
    if (parents) {
      parents.forEach(p => {
        if (possible.indexOf(p < 0)) possible.push(p);
        //else (console.log(p));
        recurse(p);
      })
    }
  };

  recurse(our_bag, []);


  const possible_deduped = [];
  possible.forEach((p, i) => {
    if (possible_deduped.indexOf(p) < 0) possible_deduped.push(p);
  });

  possible_deduped.forEach((p, i) => {possible_deduped.indexOf(p) != i && console.log('DUPE', p)});

  //console.log(possible_deduped, possible_deduped.length);

  const parent_children = data.split(/\n/gm).filter(d => !!d).reduce((acc, cur) => {
    const [parent, children_str] = cur.split(' bags contain '),
          children = children_str.split(',').map(c => {
            try {
              const match = c.match(/(\d+) ((\w| )+) bags?/);
              const count = parseInt(match[1]),
                    bag = match[2];

              return new Array(count).fill(bag);
            } catch (e) {
              // ignore, it is not a match
              //console.log(c);<
            }
          }).filter(c => !!c).reduce((a,c) => [...a, ...c], []);

    return {...acc, [parent]: acc[parent] ? [...acc[parent], ...children] : children};
  }, {});

  console.log(parent_children);

  possible_children = [];

  const recurse_parents = (bag) => {
    const children = parent_children[bag];
    if (children) {
      children.forEach(c => {
        possible_children.push(c);
        recurse_parents(c);
      });
    }
  }

  recurse_parents(our_bag);

  console.log(possible_children.length)

  possible_children_deduped = [];
  possible_children.forEach((p, i) => {
    if (possible_children_deduped.indexOf(p) < 0) possible_children_deduped.push(p);
  });

  //console.log('children', possible_children_deduped.length);

});
