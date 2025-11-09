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

export type GetGameDetails = {
  [appid: string]: {
    success: boolean;
    data: {
      name: string;
      categories: { id: number; description: string }[];
      genres: { id: number; description: string }[];
      is_free: boolean;
      price_overview: {
        currency: string;
        initial: number; // cents
        discount_percent: number;
        final: number; // cents
        final_formatted: string;
      };
      recommendations: {
        total: number;
      };
      release_date: {
        coming_soon: boolean;
        date: string;
      };
      short_description: string;
      steam_appid: number;

      // images
      background: string;
      background_raw: string;
      header_image: string;
      capsule_image: string;
      capsule_imagev5: string;
    };
  };
};

export type GetFriendList = {
  friendslist: {
    friends: {
      steamid: string;
      relationship: string; // "friend"
      friend_since: number; // Unix timestamp
    }[];
  };
};

export type StoreSearch = {
  total: number;
  items: {
    id: number; // appid
    name: string;
    type: string; // 'app'
    tiny_image: string;
    price: {
      currency: string; // eg. USD
      initial: number; // cents
      final: number; // cents
    };
    metascore: string;
    streamingvideo: boolean;
    platforms: {
      windows: boolean;
      mac: boolean;
      linux: boolean;
    };
  }[];
};
