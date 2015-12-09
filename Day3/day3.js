// Day 3: Perfectly Spherical Houses in a Vacuum
var fs = require('fs');

var count = 1;

var map = Object();
map["0:0"] = 1;

var x = 0;
var y = 0;
var stream = fs.createReadStream('./input.txt', {encoding: 'utf8'});

stream.on('readable', function() {
    while (null !== (data = stream.read(1))) {
        switch (data) {
            case ">":
                x++;
                break;
            case "<":
                x--;
                break;
            case "^":
                y++;
                break;
            case "v":
            case "V":
                y--;
                break;
            default:
                break;
        }
        updateMap(x, y);
    }
});

var updateMap = function(x, y) {
    if (map[x + ":" + y] === undefined) {
        map[x + ":" + y] = 1;
        count++;
    } else {
        map[x + ":" + y]++;
    }
}

stream.on('end', function() {
    console.log('Santa delivers presents to ' + count + ' houses');
});
