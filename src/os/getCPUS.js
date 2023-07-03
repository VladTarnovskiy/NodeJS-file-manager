import { cpus } from "node:os";

export const getCpus = () => {
  const cpusObj = cpus();
  return {
    amountOfCPU: cpusObj.length,
    model: cpusObj[0].model,
    clockRate: `${cpusObj[0].speed / 1000}GHz`,
  };
};
