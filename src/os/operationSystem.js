import { showCurrentPath } from "../utils/showCurrentPath.js";
import { EOL, homedir, userInfo, arch } from "node:os";
import { getCpus } from "./getCpus.js";

export const getSystemInfo = async (currentPath, pathData) => {
  const inputData = pathData.trim().slice(2);
  try {
    switch (inputData) {
      case "EOL":
        console.log(JSON.stringify(EOL));
        break;
      case "cpus":
        console.log(getCpus());
        break;
      case "homedir":
        console.log(homedir());
        break;
      case "username":
        console.log(userInfo().username);
        break;
      case "architecture":
        console.log(arch());
        break;
      default:
        throw new Error("Command not found!");
    }
    showCurrentPath(currentPath);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
    showCurrentPath(currentPath);
  }
};
