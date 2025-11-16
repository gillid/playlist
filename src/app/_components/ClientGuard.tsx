'use client';

import React, { useEffect, useState } from 'react';

export const ClientGuard: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isMount, setMount] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMount(true);
  }, []);

  return isMount ? children : null;
};
