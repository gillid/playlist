export type ClientEnv = {
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_AUTH_PATH: string;
  NEXT_PUBLIC_VAPID_KEY: string;
};

export type ServerEnv = ClientEnv & {
  NODE_ENV: NodeJS.ProcessEnv['NODE_ENV'];
  DATABASE_URL: string;
  POSTGRES_URL: string;
  PRISMA_DATABASE_URL: string;
  VERCEL_OIDC_TOKEN: string;
  BETTER_AUTH_SECRET: string;
  STEAM_API_KEY: string;
  PRIVATE_VAPID_KEY: string;
};
