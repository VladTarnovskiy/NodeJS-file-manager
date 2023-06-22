import { currentPathStorage } from "./currentPathStorage.js";
import { showCurrentPath } from "./showCurrentPath.js";
import { join, sep } from "node:path";

export const upToDirectory = (path) => {
  currentPathStorage.setCurrentPath = join(path, "..", sep);
  showCurrentPath(currentPathStorage.currentPath);
};
