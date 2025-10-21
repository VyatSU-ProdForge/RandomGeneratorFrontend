import React from 'react';
import { LoginMobile } from './mobile';
import { LoginDesktop } from './desktop';
import { BREAKPOINTS } from '@core/config';

export function Login(): React.ReactElement {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < BREAKPOINTS.DESKTOP);

  React.useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < BREAKPOINTS.DESKTOP);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <LoginMobile /> : <LoginDesktop />;
}

