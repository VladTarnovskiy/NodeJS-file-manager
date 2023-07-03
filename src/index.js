import process, { argv, stdin, exit } from "node:process";
import { currentPathStorage } from "./utils/currentPathStorage.js";
import { showCurrentPath } from "./utils/showCurrentPath.js";
import { upToDirectory } from "./utils/upToDirectory.js";
import { goToDirectory } from "./utils/goToDirectory.js";
import { fileList } from "./utils/filesList.js";
import { getCommandsData } from "./utils/getDataCommand.js";
import {
  readFile,
  createFile,
  renameFile,
  copyFile,
  moveFile,
  deleteFile,
} from "./fs/index.js";
import { getSystemInfo } from "./os/operationSystem.js";
import { calculateOfHash } from "./hash/calculateHash.js";
import { compressFile, decompressFile } from "./zlib/index.js";
import { getUserName } from "./utils/getUserName.js";

const username = getUserName();

console.log(`Welcome to the File Manager, ${username}!`);
showCurrentPath(currentPathStorage.getCurrentPath);

stdin.on("data", async (chunk) => {
  const data = chunk.toString();
  const currentPath = currentPathStorage.getCurrentPath;
  try {
    if (data.trim() === ".exit") {
      exit(0);
    } else if (data.trim() === "up") {
      await upToDirectory(currentPath);
    } else if (data.startsWith("cd")) {
      await goToDirectory(currentPath, getCommandsData(data));
    } else if (data.trim() === "ls") {
      await fileList(currentPath);
    } else if (data.startsWith("cat")) {
      await readFile(currentPath, getCommandsData(data));
    } else if (data.startsWith("add")) {
      await createFile(getCommandsData(data));
    } else if (data.startsWith("rn")) {
      await renameFile(currentPath, data.slice(3));
    } else if (data.startsWith("cp")) {
      await copyFile(currentPath, data.slice(3));
    } else if (data.startsWith("mv")) {
      await moveFile(currentPath, data.slice(3));
    } else if (data.startsWith("rm")) {
      await deleteFile(currentPath, getCommandsData(data));
    } else if (data.startsWith("os")) {
      await getSystemInfo(currentPath, getCommandsData(data));
    } else if (data.startsWith("hash")) {
      await calculateOfHash(currentPath, getCommandsData(data));
    } else if (data.startsWith("compress")) {
      await compressFile(currentPath, data.slice(9));
    } else if (data.startsWith("decompress")) {
      await decompressFile(currentPath, data.slice(11));
    } else {
      throw new Error("Command not found!");
    }
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    showCurrentPath(currentPath);
  }
});

process.on("SIGINT", () => process.exit(0));
process.on("exit", () =>
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
);
