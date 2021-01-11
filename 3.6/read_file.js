const fs = require('fs').promises;

fs.readFile(__dirname + '/readme.txt')
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  }).catch((err) => {
  console.log(err)
})