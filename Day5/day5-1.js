// Day 5-1: Doesn't He Have Intern-Elves For This?

var fs = require('fs');
var rl = require('readline').createInterface({
    input: fs.createReadStream('./input.txt', {encoding: 'utf8'})
});

var numNice = 0;

rl.on('line', function(line) {
    if (/(.*[aeiou]){3}/.test(line) && /([a-z])\1/.test(line) && !(/(ab|cd|pq|xy)/.test(line))) {
        numNice++;
    }
});

rl.on('close', function() {
    console.log("There are " + numNice + " nice strings.");
});
