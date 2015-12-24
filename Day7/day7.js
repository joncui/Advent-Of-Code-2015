// Day 7: Some Assembly Required
var fs = require('fs');
var rl = require('readline').createInterface({
    input: fs.createReadStream('./input.txt', {encoding: 'utf8'})
})

var values = {};
var input = [];

rl.on('line', function(line) {
    var value = line.split(' ');
    input.push(processLine(value));
});

rl.on('close', function() {
    var count = 0;
    var line = [];
    while(values['a'] === undefined) {
        line = processLine(input[count]);
        input[count] = line;
        count++;
        if (input[count] === undefined) {
            count = 0;
        }
    }

    // Wire 'a' has a value of 3176
    // Part 2: Wire 'a' has a value of 14710
    console.log('Wire \'a\' has a value of ' + values['a']);
});

var processLine = function(line) {
    if (values[line[-1]] !== undefined) {
        return line;
    }

    if (line[1] === '->') {
        line = handleAssignment(line);
    } else if (/^(R|L)SHIFT$/.test(line[1])) {
        line = handleShift(line);
    } else if (line[0] === 'NOT') {
        line = handleNot(line);
    } else {
        line = handleAndOr(line);
    }

    return line;
}

var handleAssignment = function(line) {
    if (typeof line[0] === 'string' && !isNaN(line[0])) {
        line[0] = Number.parseInt(line[0])
        values[line[2]] = line[0];
    } else if (isNaN(line[0]) && values[line[0]] !== undefined) {
        line[0] = values[line[0]];
        values[line[2]] = line[0];
    }
    return line;
}

var handleShift = function(line) {
    if (values[line[0]] !== undefined)  {
        line[0] = values[line[0]];
        line[2] = Number.parseInt(line[2]);
        switch(line[1]) {
            case "RSHIFT":
                values[line[4]] = line[0] >> line[2];
                break;
            case "LSHIFT":
                values[line[4]] = line[0] << line[2];
                break;
        }
    }

    return line;
}

var handleNot = function(line) {
    if (values[line[1]] !== undefined) {
        line[1] = values[line[1]];
        values[line[3]] = ~line[1];
    }

    return line;
}

var handleAndOr = function(line) {
    var opA = typeof line[0] === 'number';
    var opB = typeof line[2] === 'number';
    if (!opA) {
        if (typeof line[0] === 'string' && !isNaN(line[0])) {
            line[0] = Number.parseInt(line[0]);
            opA = true;
        } else if (values[line[0]] !== undefined) {
            line[0] = values[line[0]];
            opA = true;
        }
    }

    if (!opB) {
        if (typeof line[2] === 'string' && !isNaN(line[2])) {
            line[2] = Number.parseInt(line[2]);
            opB = true;
        } else if (values[line[2]] !== undefined) {
            line[2] = values[line[2]];
            opB = true;
        }
    }

    if (opA && opB) {
        switch (line[1]) {
            case "AND":
                values[line[4]] = line[0] & line[2];
                break;
            case "OR":
                values[line[4]] = line[0] | line[2];
                break;
        }
    }

    return line;
}
