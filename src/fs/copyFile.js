import { createReadStream, createWriteStream } from "node:fs";
import { showCurrentPath } from "../utils/showCurrentPath.js";
import { isAbsolute, join, basename, extname } from "node:path";

export const copyFile = async (currentPath, pathData) => {
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
    if (isAbsolute(pathToChooseDir)) {
      fullDirPath = join(pathToChooseDir, `${fileName}_copy{${fileExtension}`);
    } else {
      fullDirPath = join(
        currentPath,
        pathToChooseDir,
        `${fileName}_copy${fileExtension}`
      );
    }
    const readStream = createReadStream(fullPath);
    const writeStream = createWriteStream(fullDirPath);
    readStream.on("error", (error) => {
      console.error("\x1b[31m%s\x1b[0m", error);
    });
    writeStream.on("error", (error) => {
      console.error("\x1b[31m%s\x1b[0m", error);
    });
    readStream.pipe(writeStream);
    console.log("\x1b[36m%s\x1b[0m", `File has been copied!`);
    showCurrentPath(currentPath);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    showCurrentPath(currentPath);
  }
};
