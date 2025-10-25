import type { prismaAdapter } from 'better-auth/adapters/prisma';

export type Prisma = Parameters<typeof prismaAdapter>[0] & {
  steamProfile: {
    upsert: (args: {
      where: { userId: string };
      update: { steamId64: string };
      create: { userId: string; steamId64: string };
    }) => Promise<unknown>;
  };
};

export type Steam = {
  getPlayerSummaries: (
    steamId: string
  ) => Promise<{ personaname: string; avatarfull: string }[]>;
};

export type Logger = {
  info: (input: unknown) => void;
  error: (input: unknown) => void;
};
