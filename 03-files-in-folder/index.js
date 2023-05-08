const fs = require("fs");
const path = require("path");
const outputDir = path.join(__dirname, "text.txt");

async function getOnlyFiles(dirPath, arrFiles) {
  arrFiles = arrFiles || [];

  const files = await fs.readdir(dirPath);

  for (const el of files) {
    const fileCur = path.join(dirPath, el);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      continue;
    } else {
      arrFiles.push(fileCur);
    }
  }

  console.log(arrFiles);
}
getOnlyFiles();
