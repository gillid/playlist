import type {
  GetGameDetails,
  GetPlayerSummaries,
  GetFriendList,
} from './APIResponseTypes';

export class SteamAPI {
  private readonly apiKey: string;

  constructor(options: { apiKey: string; test?: boolean }) {
    this.apiKey = options.apiKey;
  }

  private getApiUrl(path: string, params: Record<string, string>): string {
    const url = new URL('https://api.steampowered.com');
    url.pathname = path;
    url.search = new URLSearchParams({
      key: this.apiKey,
      ...params,
    }).toString();

    return url.toString();
  }

  private getStoreUrl(path: string, params: Record<string, string>): string {
    const url = new URL('https://store.steampowered.com');
    url.pathname = path;
    url.search = new URLSearchParams(params).toString();

    return url.toString();
  }

  /**
   * API docs - https://partner.steamgames.com/doc/webapi/ISteamUser#GetPlayerSummaries
   */
  public async getPlayerSummaries(steamids: string) {
    const url = this.getApiUrl('ISteamUser/GetPlayerSummaries/v2/', {
      steamids,
    });

    const response = await fetch(url);
    const data: GetPlayerSummaries = await response.json();

    return data.response.players;
  }

  /**
   * API docs - https://partner.steamgames.com/doc/webapi/ISteamUser#GetFriendList
   */
  public async getFriendList(steamid: string) {
    const url = this.getApiUrl('ISteamUser/GetFriendList/v0001/', {
      steamid,
      relationship: 'friend',
    });

    const response = await fetch(url);
    const data: GetFriendList = await response.json();

    return data.friendslist.friends;
  }

  public async getGameDetails(appid: string) {
    const url = this.getStoreUrl('/api/appdetails', {
      appids: appid,
    });

    const response = await fetch(url);
    const data: GetGameDetails = await response.json();

    if (data && data[appid] && data[appid].success) {
      return {
        name: data[appid].data.name,
        image: data[appid].data.capsule_imagev5,
      };
    }

    return undefined;
  }
}
