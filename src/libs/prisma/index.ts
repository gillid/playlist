import { PrismaClient } from '@generated/prisma/client';
import type { LogLevel } from '@generated/prisma/internal/prismaNamespace';
import { withAccelerate } from '@prisma/extension-accelerate';

const createPrismaClient = () => {
  const logLevel: LogLevel[] =
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'];

  const prismaClient = new PrismaClient({
    log: logLevel,
  }).$extends(withAccelerate());

  if (prismaClient && process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaClient;
  }

  return prismaClient;
};

// ensure only one instance of Prisma, even during hot-reloading in development.
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

export type {
  Prisma,
  User,
  Session,
  SteamProfile,
  SteamPlaylist,
  SteamPlaylistGame,
  SteamPlaylistGameRating,
  RatingValue,
} from '@generated/prisma/client';
