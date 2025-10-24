import type { steamAuthServer } from './steamAuthServer';

export const steamAuthClient = (baseUrl: string, authPath: string) => {
  return {
    id: 'steam-client',
    $InferServerPlugin: {} as ReturnType<typeof steamAuthServer>,
    getActions: () => ({
      steamSignIn: async () => {
        const returnTo = `${baseUrl}${authPath}/steam/callback`;

        const url = new URL('https://steamcommunity.com/openid/login');

        const params = new URLSearchParams({
          'openid.ns': 'http://specs.openid.net/auth/2.0',
          'openid.mode': 'checkid_setup',
          'openid.return_to': returnTo,
          'openid.realm': baseUrl,
          'openid.identity':
            'http://specs.openid.net/auth/2.0/identifier_select',
          'openid.claimed_id':
            'http://specs.openid.net/auth/2.0/identifier_select',
        });

        window.location.href = `${url}?${params.toString()}`;
      },
    }),
  };
};
