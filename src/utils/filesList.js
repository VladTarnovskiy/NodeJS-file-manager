import { readdir } from "node:fs/promises";
import { type } from "node:os";

export const fileList = async (currentPath) => {
  try {
    const files = await readdir(currentPath, { withFileTypes: true });
    const resultData = files.map((item) => {
      if (item.isFile()) {
        return { Name: item.name, Type: "File" };
      } else {
        return { Name: item.name, Type: "Directory" };
      }
    });
    console.table(resultData);
  } catch (err) {
    console.error(err);
  }
};
