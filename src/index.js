import process, { argv, stdin, exit } from "node:process";

let arg = argv[2];
let username = arg.split("=")[1];
console.log(`Welcome to the File Manager, ${username}!`);

stdin.on("data", (chunk) => {
  const data = chunk.toString();
  if (data.trim() === ".exit") {
    exit(0);
  }
});

process.on("SIGINT", () => process.exit(0));
process.on("exit", () =>
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
);
