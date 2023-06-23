import { writeFile } from "node:fs/promises";
import { showCurrentPath } from "../utils/showCurrentPath.js";
import { currentPathStorage } from "../utils/currentPathStorage.js";
import { join } from "path";

export const createFile = async (fileName) => {
  const currentPath = currentPathStorage.getCurrentPath;
  try {
    await writeFile(join(currentPath, fileName), "", { flag: "wx" });
    console.log("\x1b[36m%s\x1b[0m", `File ${fileName} has been created!`);
    showCurrentPath(currentPath);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error.message);
    showCurrentPath(currentPath);
  }
};
