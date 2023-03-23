const path = require("node:path")
const file = require('fs');

const data = file.readFileSync('../routes/auth.js', 'utf8');

file.readFile('../routes/auth.js', (err, data) => {
    if (err) throw err;
    console.log(data);
});
// file.writeFileSync('./overwrite.js','overwrite the file');

console.log(data);
// console.log(__filename, __dirname);
// console.log(path.basename(__filename));
// console.log(path.isAbsolute(__filename), path.isAbsolute('/learn'));
// console.log(path.join("dir", "index.js"))
