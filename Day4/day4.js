// var rl = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
var md5 = require('md5');

// rl.question("Enter the secret key.\n", function(key) {
//     console.log(findHash(key));
//     rl.close();
// });

var findHash = function(key) {
    var found = false;
    var count = -1;
    var hash;
    while (!found) {
        count++;
        hash = md5(key + count.toString());
        if (hash.startsWith("000000")) {
            found = true;
        }
    }
    return count;
}

console.log(findHash("bgvyzdsv"));
