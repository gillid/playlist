import { useEffect, useState } from 'react';

let swRegistration: ServiceWorkerRegistration | undefined;

export const usePushManager = () => {
  const [pushManager, setPushManager] = useState<PushManager | undefined>(
    swRegistration?.pushManager
  );

  const isSupported = 'serviceWorker' in navigator && 'PushManager' in window;

  useEffect(() => {
    if (isSupported && !swRegistration) {
      (async function () {
        swRegistration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        });

        setPushManager(swRegistration.pushManager);
      })();
    }
  }, []);

  return { isSupported, pushManager };
};
