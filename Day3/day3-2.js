// Day 3: Perfectly Spherical Houses in a Vacuum
// Part 2
var fs = require('fs');

var count = 1;

var map = Object();
map["0:0"] = 2;

var santa = {x: 0, y: 0};
var robo = {x: 0, y: 0};

var isRobo = false;

var stream = fs.createReadStream('./input.txt', {encoding: 'utf8'});

stream.on('readable', function() {
    while (null !== (data = stream.read(1))) {
        move = isRobo ? robo : santa;
        switch (data) {
            case ">":
                move.x++;
                break;
            case "<":
                move.x--;
                break;
            case "^":
                move.y++;
                break;
            case "v":
            case "V":
                move.y--;
                break;
            default:
                break;
        }
        updateMap(move.x, move.y);
        isRobo = !isRobo;
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
    console.log('Santa and Robo-Santa delivered presents to ' + count + ' houses');
});

