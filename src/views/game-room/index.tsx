import React from 'react';
import { GameRoomMobile } from './mobile';
import { GameRoomDesktop } from './desktop';
import { BREAKPOINTS } from '@core/config';

export function GameRoom(): React.ReactElement {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < BREAKPOINTS.DESKTOP);

  React.useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < BREAKPOINTS.DESKTOP);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <GameRoomMobile /> : <GameRoomDesktop />;
}

