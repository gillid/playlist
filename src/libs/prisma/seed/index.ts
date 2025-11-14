import { faker } from '@faker-js/faker';
import { prisma } from '../index';

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

  const playlist2 = await prisma.steamPlaylist.upsert({
    where: {
      id: '2',
    },
    update: {},
    include: {
      games: true,
    },
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

  const upsertRating = async (
    gameId: string,
    profileId: string,
    value: 'YES' | 'NO' | 'MAYBE' | 'PENDING'
  ) => {
    return prisma.steamPlaylistGameRating.upsert({
      where: {
        gameId_profileId: {
          gameId,
          profileId,
        },
      },
      update: {},
      create: {
        value,
        gameId,
        profileId,
      },
    });
  };

  await upsertRating(playlist2.games[0].id, mainUserProfile.id, 'NO');
  await upsertRating(playlist2.games[0].id, fakeProfiles[0].id, 'MAYBE');
  await upsertRating(playlist2.games[0].id, fakeProfiles[2].id, 'YES');

  await upsertRating(playlist2.games[1].id, mainUserProfile.id, 'YES');
  await upsertRating(playlist2.games[1].id, fakeProfiles[0].id, 'YES');
  await upsertRating(playlist2.games[1].id, fakeProfiles[2].id, 'YES');

  await upsertRating(playlist2.games[2].id, fakeProfiles[0].id, 'YES');

  const upsertUpdate = async (playlistId: string, profileId: string) => {
    return prisma.steamPlaylistUpdate.upsert({
      where: {
        playlistId_profileId: {
          playlistId,
          profileId,
        },
      },
      update: {},
      create: {
        playlistId,
        profileId,
      },
    });
  };

  await upsertUpdate('2', mainUserProfile.id);
  await upsertUpdate('3', mainUserProfile.id);
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
