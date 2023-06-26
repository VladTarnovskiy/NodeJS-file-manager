import { currentPathStorage } from "./currentPathStorage.js";
import { showCurrentPath } from "./showCurrentPath.js";
import { join } from "node:path";

export const upToDirectory = async (path) => {
  currentPathStorage.setCurrentPath = join(path, "..");
  showCurrentPath(currentPathStorage.getCurrentPath);
};
