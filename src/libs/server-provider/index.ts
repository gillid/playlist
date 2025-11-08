import 'server-only';
import React, { cache } from 'react';

export const createServerProvider = <T>(name: string) => {
  const cachedRef = cache(() => {
    return new Map<'value', T | undefined>();
  });

  const Provider: React.FC<React.PropsWithChildren<{ value: T }>> = ({
    children,
    value,
  }) => {
    if (cachedRef().get('value') !== undefined) {
      throw new Error(`${name} is already set`);
    }

    cachedRef().set('value', value);

    return children;
  };

  const get = (): T => {
    const value = cachedRef().get('value');

    if (value === undefined) {
      throw new Error(`${name} is not set`);
    }

    return value;
  };

  return { Provider, get };
};
