export type GetPlayerSummaries = {
  response: {
    players: {
      steamid: string;
      communityvisibilitystate: number; // 1 = Private, 3 = Public
      profilestate: number; // 1 - configured
      personaname: string; // nickname
      lastlogoff: number;
      profileurl: string;
      avatar: string; // 32x32
      avatarmedium: string; // 64x64
      avatarfull: string; // 184x184

      // non-official
      loccountrycode?: string;
    }[];
  };
};
