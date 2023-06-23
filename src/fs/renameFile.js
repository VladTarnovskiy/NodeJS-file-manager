import { rename } from "node:fs/promises";
import { showCurrentPath } from "../utils/showCurrentPath.js";
import { isAbsolute, join, dirname } from "node:path";

export const renameFile = async (currentPath, pathData) => {
  const trimPath = pathData.trim();
  const [pathToFile, newName] = trimPath.split(" ");
  console.log(pathToFile);
  console.log(newName);
  let pathOld = "";
  let pathNew = "";

  try {
    if (isAbsolute(pathToFile)) {
      pathOld = join(pathToFile);
      pathNew = join(dirname(pathOld), newName);
    } else {
      pathOld = join(currentPath, pathToFile);
      pathNew = join(dirname(pathOld), newName);
    }
    // pathNew = join(dirname(pathOld), newName);
    // console.log(pathOld);
    // console.log(pathNew);
    await rename(pathOld, pathNew);
    console.log("\x1b[36m%s\x1b[0m", `File has been renamed!`);
    showCurrentPath(currentPath);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    showCurrentPath(currentPath);
  }
};
