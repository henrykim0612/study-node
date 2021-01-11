const fs = require('fs');

const readStream = fs.createReadStream(__dirname + '/readme.txt');
const writeStream = fs.createWriteStream(__dirname + '/pipingWrite.txt');
readStream.pipe(writeStream);