import { createReadStream, createWriteStream } from "node:fs";
import { showCurrentPath } from "../utils/showCurrentPath.js";
import { isAbsolute, join, basename, extname } from "node:path";
import { createUnzip } from "node:zlib";
import { pipeline } from "node:stream/promises";

export const decompressFile = async (currentPath, pathData) => {
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
      fullDirPath = join(pathToChooseDir, `${fileName}`);
    } else {
      fullDirPath = join(currentPath, pathToChooseDir, `${fileName}`);
    }

    await pipeline(
      createReadStream(fullPath),
      createUnzip(),
      createWriteStream(fullDirPath)
    );
    console.log("\x1b[36m%s\x1b[0m", `File has been decompressed!`);
    showCurrentPath(currentPath);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    showCurrentPath(currentPath);
  }
};
