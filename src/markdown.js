var fs = require('fs');
var html2markdown = require('html2markdown');

console.log(html2markdown('<h1>Hello markdown!</h1>'));

fs.writeFileSync('dist/a.md', html2markdown('<h1>Hello markdown!</h1>'));