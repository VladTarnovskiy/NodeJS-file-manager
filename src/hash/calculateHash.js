import { showCurrentPath } from "../utils/showCurrentPath.js";
import { isAbsolute, join } from "node:path";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";

export const calculateOfHash = async (currentPath, pathData) => {
  const pathToFile = pathData.trim();
  const hash = createHash("sha256");
  let fullPath = "";

  try {
    if (isAbsolute(pathToFile)) {
      fullPath = join(pathToFile);
    } else {
      fullPath = join(currentPath, pathToFile);
    }

    const content = createReadStream(fullPath);
    content.on("readable", () => {
      const data = content.read();
      if (data) {
        hash.update(data);
      }
    });

    content.on("end", () => {
      console.log(hash.digest("hex"));
      console.log("\x1b[36m%s\x1b[0m", `File has been hashed!`);
      showCurrentPath(currentPath);
    });

    content.on("error", (error) => {
      console.error("\x1b[31m%s\x1b[0m", error);
    });
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    showCurrentPath(currentPath);
  }
};
