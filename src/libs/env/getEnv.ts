type Env = {
  NODE_ENV: NodeJS.ProcessEnv['NODE_ENV'];
  DATABASE_URL: string;
  POSTGRES_URL: string;
  PRISMA_DATABASE_URL: string;
  VERCEL_OIDC_TOKEN: string;
  STEAM_API_KEY: string;
};

const checkEnvVar = (name: string) => {};

export const getEnv = (): Env => {
  const env = process.env;

  if (!env.DATABASE_URL) {
    throw new Error(`process.env.DATABASE_URL is not defined`);
  }

  if (!env.POSTGRES_URL) {
    throw new Error(`process.env.POSTGRES_URL is not defined`);
  }

  if (!env.PRISMA_DATABASE_URL) {
    throw new Error(`process.env.PRISMA_DATABASE_URL is not defined`);
  }

  if (!env.VERCEL_OIDC_TOKEN) {
    throw new Error(`process.env.VERCEL_OIDC_TOKEN is not defined`);
  }

  if (!env.STEAM_API_KEY) {
    throw new Error(`process.env.STEAM_API_KEY is not defined`);
  }

  return {
    NODE_ENV: env.NODE_ENV,
    DATABASE_URL: env.DATABASE_URL,
    POSTGRES_URL: env.POSTGRES_URL,
    PRISMA_DATABASE_URL: env.PRISMA_DATABASE_URL,
    VERCEL_OIDC_TOKEN: env.VERCEL_OIDC_TOKEN,
    STEAM_API_KEY: env.STEAM_API_KEY,
  };
};
