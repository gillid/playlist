import { prisma } from '../index';
import { faker } from '@faker-js/faker';

const main = async () => {
  const mainUserProfile = await prisma.steamProfile.findFirst({
    where: {
      name: 'Gil',
    },
  });

  if (!mainUserProfile) {
    throw new Error('Main user profile not found');
  }

  const fakeSteamIds = [
    '00000000000000001',
    '00000000000000002',
    '00000000000000003',
  ];

  const fakeProfiles = [];

  for (const steamId of fakeSteamIds) {
    const profile = await prisma.steamProfile.upsert({
      where: {
        steamId64: steamId,
      },
      update: {},
      create: {
        steamId64: steamId,
        name: faker.person.firstName(),
        image: faker.image.avatar(),
      },
    });

    fakeProfiles.push(profile);
  }

  await prisma.steamPlaylist.upsert({
    where: {
      id: '1',
    },
    update: {},
    create: {
      id: '1',
      name: 'My Playlist # 1',
      ownerId: mainUserProfile.id,
      participants: {
        connect: fakeProfiles.map((profile) => ({
          id: profile.id,
        })),
      },
      games: {
        create: [
          {
            steamAppId: '570',
          },
          {
            steamAppId: '730',
          },
        ],
      },
    },
  });

  await prisma.steamPlaylist.upsert({
    where: {
      id: '2',
    },
    update: {},
    create: {
      id: '2',
      name: 'My Playlist # 2',
      ownerId: mainUserProfile.id,
      participants: {
        connect: [fakeProfiles[0], fakeProfiles[2]].map((profile) => ({
          id: profile.id,
        })),
      },
      games: {
        create: [
          {
            steamAppId: '892970',
          },
          {
            steamAppId: '440900',
          },
          {
            steamAppId: '346110',
          },
        ],
      },
    },
  });

  await prisma.steamPlaylist.upsert({
    where: {
      id: '3',
    },
    update: {},
    create: {
      id: '3',
      name: 'My Playlist # 3',
      ownerId: mainUserProfile.id,
      games: {
        create: [
          {
            steamAppId: '892970',
          },
          {
            steamAppId: '440900',
          },
          {
            steamAppId: '346110',
          },
          {
            steamAppId: '1129580',
          },
          {
            steamAppId: '1898300',
          },
        ],
      },
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
