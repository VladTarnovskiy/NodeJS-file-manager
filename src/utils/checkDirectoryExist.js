import { access, constants } from "node:fs/promises";

export const checkDirectoryExist = async (pathToDirectory) => {
  try {
    await access(pathToDirectory, constants.F_OK);
    return true;
  } catch (error) {
    throw new Error("Operation failed, no such directory");
  }
};
