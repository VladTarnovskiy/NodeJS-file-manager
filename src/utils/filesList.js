import { readdir } from "node:fs/promises";
import { type } from "node:os";

export const fileList = async (currentPath) => {
  try {
    const files = await readdir(currentPath, { withFileTypes: true });
    // const sortFiles = files.sort();
    const resultData = files.map((item) => {
      if (item.isDirectory()) {
        return { Name: item.name, Type: "Directory" };
      } else {
        return { Name: item.name, Type: "File" };
      }
    });
    console.table(resultData);
  } catch (err) {
    console.error(err);
  }
};

// const result = sortedFiles.map((file) => {
//   if (file.isFile()) {
//     return { Name: file.name, Type: "file" };
//   }
//   return { Name: file.name, Type: "directory" };
// });

// const sortedByType = result.sort((a, b) => {
//   if (a.Type < b.Type) {
//     return -1;
//   }
//   if (a.Type > b.Type) {
//     return 1;
//   }
//   return 0;
// });

// console.table(sortedByType);
