import { getEnv } from './getEnv';

export const isProduction = () => getEnv().NODE_ENV === 'production';
