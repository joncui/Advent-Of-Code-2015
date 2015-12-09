// Day 1: Not Quite Lisp
var fs = require('fs');

var floor = 0;
var count = 0;
var first = true;
var stream = fs.createReadStream('./input.txt', {encoding: 'utf8'});

stream.on('readable', function() {
    while (null !== (data = stream.read(1))) {
        count++;
        if (data === '(') {
            floor++;
        } else if (data === ')') {
            floor--;
        }

        if (first && floor === -1) {
            console.log('Santa enters basement at character ' + count);
            first = false;
        }
    }
});

stream.on('end', function() {
    console.log('Santa ends up on floor ' + floor);
})
