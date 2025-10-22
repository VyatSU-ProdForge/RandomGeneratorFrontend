import React from 'react';
import { MyGamesMobile } from './mobile';
import { MyGamesDesktop } from './desktop';

export function MyGames(): React.ReactElement {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect((): (() => void) => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return (): void => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile ? <MyGamesMobile /> : <MyGamesDesktop />;
}

