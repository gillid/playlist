export const extractSteamId = (url: string): string | undefined => {
  const match = url.match(/https:\/\/steamcommunity\.com\/openid\/id\/(\d+)/);
  if (match) {
    return match[1];
  }

  return undefined;
};
