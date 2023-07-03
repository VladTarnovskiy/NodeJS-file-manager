import { createReadStream, createWriteStream } from "node:fs";
import { showCurrentPath } from "../utils/showCurrentPath.js";
import { isAbsolute, join, basename, extname } from "node:path";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";

export const compressFile = async (currentPath, pathData) => {
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

    const fileName = basename(fullPath);
    if (isAbsolute(pathToChooseDir)) {
      fullDirPath = join(pathToChooseDir, `${fileName}.gz`);
    } else {
      fullDirPath = join(currentPath, pathToChooseDir, `${fileName}.gz`);
    }

    await pipeline(
      createReadStream(fullPath),
      createGzip(),
      createWriteStream(fullDirPath)
    );
    console.log("\x1b[36m%s\x1b[0m", `File has been compressed!`);
    showCurrentPath(currentPath);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    showCurrentPath(currentPath);
  }
};
