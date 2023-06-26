import { createReadStream } from "fs";
import { stdout } from "process";
import { showCurrentPath } from "../utils/showCurrentPath.js";
import { isAbsolute, join } from "path";

export const readFile = async (currentPath, fileName) => {
  let filePath = "";

  try {
    if (isAbsolute(fileName)) {
      filePath = join(fileName);
    } else {
      filePath = join(currentPath, fileName);
    }
    const inputData = createReadStream(filePath);
    inputData.pipe(stdout);
    inputData.on("end", () => {
      showCurrentPath(currentPath);
    });
    inputData.on("error", (error) => {
      console.error("\x1b[31m%s\x1b[0m", error);
    });
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    showCurrentPath(currentPath);
  }
};
