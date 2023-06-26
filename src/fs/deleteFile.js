import { rm } from "node:fs/promises";
import { showCurrentPath } from "../utils/showCurrentPath.js";
import { isAbsolute, join } from "node:path";

export const deleteFile = async (currentPath, pathData) => {
  const pathToFile = pathData.trim();
  let fullPath = "";

  try {
    if (isAbsolute(pathToFile)) {
      fullPath = join(pathToFile);
    } else {
      fullPath = join(currentPath, pathToFile);
    }

    await rm(fullPath);
    console.log("\x1b[36m%s\x1b[0m", `File has been deleted!`);
    showCurrentPath(currentPath);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    showCurrentPath(currentPath);
  }
};
