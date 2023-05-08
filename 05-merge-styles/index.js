const fs = require("fs");
const path = require("path");
const folder_styles = path.join(__dirname, "styles");
const bundle = path.join(__dirname, "./project-dist", "bundle.css");

fs.readdir(folder_styles, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  const cssFiles = files.filter(
    (file) => file.isFile() && file.name.endsWith(".css")
  );
  const cssData = [];
  cssFiles.forEach((file) => {
    const files = `${folder_styles}/${file.name}`;
    const data = fs.readFileSync(files);
    cssData.push(data);
  });
  // console.log(cssData);
  fs.writeFile(bundle, cssData.join("\n"), (err) => {
    if (err) throw err;
  });
});
