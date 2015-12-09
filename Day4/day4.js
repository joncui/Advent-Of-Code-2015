// Day 4: The Ideal Stocking Stuffer
var rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
var md5 = require('md5');
var input = "bgvyzdsv";

rl.question("Which part of day 4?\n", function(partNum) {
    var startsWith = (partNum == 1 ? "00000" : "000000");
    console.log(findHash(input, startsWith));
    rl.close();
});

var findHash = function(key, startsWith) {
    var found = false;
    var count = 1;
    var hash;
    while (!found) {
        count++;
        hash = md5(key + count.toString());
        if (hash.startsWith(startsWith)) {
            found = true;
        }
    }
    return count;
}
