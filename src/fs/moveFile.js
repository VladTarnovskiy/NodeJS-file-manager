import { createReadStream, createWriteStream } from "node:fs";
import { showCurrentPath } from "../utils/showCurrentPath.js";
import { isAbsolute, join, basename, extname } from "node:path";
import { rename } from "node:fs/promises";

export const moveFile = async (currentPath, pathData) => {
  const trimPathData = pathData.trim();
  const [pathToFile, pathToChooseDir] = trimPathData.split(" ");
  let fullPath = "";
  let fullDirPath = "";

  try {
    if (isAbsolute(pathToFile)) {
      fullPath = join(pathToFile);
    } else {
      fullPath = join(currentPath, pathToFile);
    }

    const fileExtension = extname(fullPath);
    const fileName = basename(fullPath, fileExtension);
    console.log(fileName);
    if (isAbsolute(pathToChooseDir)) {
      fullDirPath = join(pathToChooseDir, `${fileName}{${fileExtension}`);
    } else {
      fullDirPath = join(
        currentPath,
        pathToChooseDir,
        `${fileName}${fileExtension}`
      );
    }
    console.log(fileExtension);
    await rename(fullPath, fullDirPath);
    console.log("\x1b[36m%s\x1b[0m", `File has been moved!`);
    showCurrentPath(currentPath);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    showCurrentPath(currentPath);
  }
};
