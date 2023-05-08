const fs = require("fs");
const path = require("path");
const process = require("process");
const { stdin } = process;
const hello = () => console.log("Привет! Напиши что-нибудь:");
const outputFile = path.join(__dirname, "text.txt");
const writeFile = fs.createWriteStream(outputFile);
const goodbye = () => {
  console.log("С вами был Николай Дроздов.");
  writeFile.end();
  process.exit();
};

hello();

process.on("SIGINT", () => {
  goodbye();
});

stdin.on("data", (data) => {
  const input = data.toString().toLowerCase().trim();
  if (input === "exit") {
    goodbye();
  } else {
    writeFile.write(input + "\n");
  }
});
