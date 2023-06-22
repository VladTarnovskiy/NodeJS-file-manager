import process, { argv, stdin, exit } from "node:process";
import { currentPathStorage } from "./utils/currentPathStorage.js";
import { showCurrentPath } from "./utils/showCurrentPath.js";
import { upToDirectory } from "./utils/upToDirectory.js";
import { goToDirectory } from "./utils/goToDirectory.js";
import { fileList } from "./utils/filesList.js";
let arg = argv[2];
let username = arg.split("=")[1];

console.log(`Welcome to the File Manager, ${username}!`);
showCurrentPath(currentPathStorage.getCurrentPath);

stdin.on("data", async (chunk) => {
  const data = chunk.toString();
  const currentPath = currentPathStorage.getCurrentPath;
  try {
    if (data.trim() === ".exit") {
      exit(0);
    } else if (data.trim() === "up") {
      upToDirectory(currentPath);
    } else if (data.startsWith("cd")) {
      await goToDirectory(currentPath, data.trim().slice(3));
    } else if (data.trim() === "ls") {
      await fileList(currentPath);
    }
  } catch (error) {
    console.log(error);
  }
});

process.on("SIGINT", () => process.exit(0));
process.on("exit", () =>
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
);
