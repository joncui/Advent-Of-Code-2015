// Day 6: Probably a Fire Hazard
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
        return count + row.filter(function(status) {
            return status;
        }).length;
    }, 0);

    console.log("There are " + numOn + " lights lit.");
});

var setStatus = function(status, startX, startY, endX, endY) {
    var value = status === 'toggle' ? status : status === 'on';
    for (var y = startY; y <= endY; y++) {
        if (map[y] === undefined) {
            map[y] = [];
        }
        for (var x = startX; x <= endX; x++) {
            if (map[y][x] === undefined) {
                map[y][x] = false;
            }
            map[y][x] = (status === 'toggle') ? !map[y][x] : value;
        }
    }
}
