'use server';

import { steam } from '@/libs/steam';

export type Game = {
  appid: string;
  name: string;
  image: string;
};

export async function getGamesList(
  query: string,
  countryCode: string = 'US'
): Promise<Game[]> {
  const searchResults = await steam.storeSearch(query, countryCode);

  return searchResults.items.map((item) => ({
    appid: item.id.toString(),
    name: item.name,
    image: item.tiny_image,
  }));
}
