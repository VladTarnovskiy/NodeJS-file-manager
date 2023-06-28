import { argv } from "node:process";
import os from "node:os";

export const getUserName = () => {
  let arg = argv[2];
  let username = os.userInfo().username || "NoName";

  if (arg !== undefined) {
    username = arg.split("=")[1];
  }
  return username;
};
