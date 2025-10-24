export type Steam = {
  getPlayerSummaries: (
    steamId: string
  ) => Promise<{ personaname: string; avatarfull: string }[]>;
};

export type Logger = {
  info: (input: unknown) => void;
  error: (input: unknown) => void;
};
