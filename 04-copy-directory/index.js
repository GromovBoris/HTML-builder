const fs = require("fs");
const path = require("path");
const new_folder = path.join(__dirname, "files-copy");
const folder = path.join(__dirname, "files");
function copyDir() {
  function copyFiles() {
    fs.readdir(folder, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        const file_to_copy = path.join(folder, file);
        const new_files = path.join(new_folder, file);
        fs.copyFile(file_to_copy, new_files, (err) => {
          if (err) throw err;
        });
      });
    });
  }
  fs.access(new_folder, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(new_folder, (err) => {
        if (err) throw err;
      });
      copyFiles();
    } else {
      fs.readdir(new_folder, (err, files1) => {
        if (err) throw err;
        fs.readdir(folder, (err, files2) => {
          if (err) throw err;
          if (
            files1.length !== files2.length ||
            !files1.every((file) => files2.includes(file))
          ) {
            fs.rm(new_folder, { recursive: true }, (err) => {
              if (err) throw err;
              copyDir();
            });
          }
        });
      });
    }
  });
}
copyDir();
