var fs = require('fs');
var rl = require('readline').createInterface({
    input: fs.createReadStream('./input.txt', {encoding: 'utf8'})
});

var numNice = 0;

rl.on('line', function(line) {
    if (/(..).*\1/.test(line) && /(.).\1/.test(line)) {
        numNice++;
    }
});

rl.on('close', function() {
    console.log("There are " + numNice + " nice strings.");
});
