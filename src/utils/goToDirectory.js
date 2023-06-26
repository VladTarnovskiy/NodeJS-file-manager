import { join, isAbsolute } from "node:path";
import { showCurrentPath } from "./showCurrentPath.js";
import { currentPathStorage } from "./currentPathStorage.js";
import { checkDirectoryExist } from "./checkDirectoryExist.js";

export const goToDirectory = async (currentPath, pathToDirectory) => {
  try {
    if (isAbsolute(pathToDirectory)) {
      if (await checkDirectoryExist(pathToDirectory)) {
        currentPathStorage.setCurrentPath = join(pathToDirectory);
      }
    } else {
      if (await checkDirectoryExist(join(currentPath, pathToDirectory))) {
        currentPathStorage.setCurrentPath = join(currentPath, pathToDirectory);
      }
    }
    showCurrentPath(currentPathStorage.getCurrentPath);
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "Operation failed, no such directory");
    showCurrentPath(currentPath);
  }
};
