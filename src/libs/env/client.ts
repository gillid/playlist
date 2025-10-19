import type { ClientEnv } from './Env';

const clientEnvStorage: Record<keyof ClientEnv, unknown> = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_AUTH_PATH: process.env.NEXT_PUBLIC_AUTH_PATH,
};

export const getClientEnv = <K extends keyof ClientEnv>(
  name: K
): ClientEnv[K] => {
  if (!clientEnvStorage.hasOwnProperty(name)) {
    throw new Error(`process.env.${name} is not defined`);
  }

  return clientEnvStorage[name] as ClientEnv[K];
};
