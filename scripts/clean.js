const fs = require('fs');
const path = require('path');

const directories = [
  'extension',
  'build',
];

directories.forEach((dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      fs.unlink(path.join(dir, file), err => {
        if (err) throw err;
      });
    });
  });
});

console.log('Cleaned build and extension directories.');