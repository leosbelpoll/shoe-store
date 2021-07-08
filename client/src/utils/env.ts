import { DEFAULT_VALUES } from "../configs";

export const getEnv = (envVariable: string) => {
  return process.env[`REACT_APP_${envVariable}`] || DEFAULT_VALUES[envVariable];
};
