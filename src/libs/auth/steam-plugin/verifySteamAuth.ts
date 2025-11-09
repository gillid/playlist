import type { Logger } from './types';

export const verifySteamAuth = async (
  searchParams: URLSearchParams,
  logger: Logger
) => {
  searchParams.set('openid.mode', 'check_authentication');

  const response = await fetch('https://steamcommunity.com/openid/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: searchParams.toString(),
  });

  const verifyText = await response.text();
  logger.info(`Steam verify response: ${verifyText}`);

  if (!verifyText.includes('is_valid:true')) {
    logger.error('Failed to verify Steam OpenID response');
    throw new Error('Failed to verify Steam OpenID response');
  }
};
