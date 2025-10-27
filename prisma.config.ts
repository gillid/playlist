import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: path.join('src/libs/prisma'),
  migrations: {
    path: path.join('src/libs/prisma', 'migrations'),
    seed: `pnpm tsx ${path.join('src/libs/prisma', 'seed')}`,
  },
  views: {
    path: path.join('src/libs/prisma', 'views'),
  },
  typedSql: {
    path: path.join('src/libs/prisma', 'queries'),
  },
});
