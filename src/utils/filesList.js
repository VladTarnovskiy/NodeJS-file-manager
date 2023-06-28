import { readdir } from "node:fs/promises";
import { type } from "node:os";

export const fileList = async (currentPath) => {
  const dirList = [];
  const fileList = [];
  try {
    const files = await readdir(currentPath, { withFileTypes: true });
    files.map((item) => {
      if (item.isFile()) {
        fileList.push({ Name: item.name, Type: "File" });
      } else {
        dirList.push({ Name: item.name, Type: "Directory" });
      }
    });
    dirList.sort((a, b) => a.Name.localeCompare(b.Name));
    fileList.sort((a, b) => a.Name.localeCompare(b.Name));

    console.table([...dirList, ...fileList]);
  } catch (err) {
    console.error(err);
  }
};
