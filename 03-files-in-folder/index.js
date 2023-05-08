const fs = require("fs");
const path = require("path");
const folder = path.join(__dirname, "secret-folder");

fs.readdir(folder, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    fs.stat(path.join(folder, file), (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        const name = path.parse(file).name;
        const exp = path.parse(file).ext.substring(1);
        const size = (stats.size / 1024).toFixed(3);
        console.log(`${name} - ${exp} - ${size}kb`);
        // console.log(`${file}`);
      }
    });
  });

  // console.log(files);
});
