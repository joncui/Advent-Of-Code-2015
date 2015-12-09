// Day 2: I Was Told There Would Be No Math
var fs = require('fs');
var rl = require('readline').createInterface({
    input: fs.createReadStream('./input.txt', {encoding: 'utf8'})
})

var totalSqFt = 0;
var totalRibbonLength = 0;

var getSqFt = function(l, w, h) {
    var min = Math.min.apply(null, [l*w, w*h, h*l]);
    return (2*l*w) + (2*w*h) + (2*h*l) + min;
}

var getMinPerimeter = function(l, w, h) {
    return Math.min.apply(null, [2*(l+w), 2*(w+h), 2*(h+l)]);
}

rl.on('line', function(line) {
    var dimensions = line.split('x').map(function(num) {
        return parseInt(num);
    });
    totalSqFt += getSqFt(dimensions[0], dimensions[1], dimensions[2]);
    totalRibbonLength += getMinPerimeter(dimensions[0], dimensions[1], dimensions[2]) + (dimensions[0] * dimensions[1] * dimensions[2]);
});

rl.on('close', function() {
    console.log("Total Square Feet of Wrapping Paper: " + totalSqFt);
    console.log("Total Ribbon Length: " + totalRibbonLength);
});
