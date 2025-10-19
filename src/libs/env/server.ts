import 'server-only';
import type { ServerEnv } from './Env';

export const getServerEnv = <K extends keyof ServerEnv>(
  name: K
): ServerEnv[K] => {
  const env = process.env;

  if (!env.hasOwnProperty(name)) {
    throw new Error(`process.env.${name} is not defined`);
  }

  return env[name] as ServerEnv[K];
};
