// Day 6 Part 2: Probably a Fire Hazard
var fs = require('fs');
var rl = require('readline').createInterface({
    input: fs.createReadStream('./input.txt', {encoding: 'utf8'})
});

var map = [];

rl.on('line', function(line) {
    if (instruction = /(off|on|toggle) (\d+),(\d+) through (\d+),(\d+)/.exec(line)) {
        setStatus(instruction[1], Number.parseInt(instruction[2]), Number.parseInt(instruction[3]), Number.parseInt(instruction[4]), Number.parseInt(instruction[5]));
    }
});

rl.on('close', function() {
    var numOn = map.reduce(function(count, row) {
        return count + row.reduce(function(count, num) {
            return count + num;
        });
    }, 0);

    console.log("The total brightness is " + numOn + ".");
});

var setStatus = function(status, startX, startY, endX, endY) {
    var value = status === 'toggle' ? 2 : (status === 'on' ? 1 : -1);
    for (var y = startY; y <= endY; y++) {
        if (map[y] === undefined) {
            map[y] = [];
        }
        for (var x = startX; x <= endX; x++) {
            if (map[y][x] === undefined) {
                map[y][x] = 0;
            }

            if (!(value === -1 && map[y][x] === 0)) {
                map[y][x] += value;
            }
        }
    }
}

