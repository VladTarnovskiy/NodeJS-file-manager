import { homedir } from "node:os";

export const currentPathStorage = {
  currentPath: homedir(),

  get getCurrentPath() {
    return this.currentPath;
  },
  set setCurrentPath(path) {
    return (this.currentPath = path);
  },
};
