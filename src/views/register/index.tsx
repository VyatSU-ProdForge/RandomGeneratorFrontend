import React from 'react';
import { RegisterMobile } from './mobile';
import { RegisterDesktop } from './desktop';
import { BREAKPOINTS } from '@core/config';

export function Register(): React.ReactElement {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < BREAKPOINTS.DESKTOP);

  React.useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < BREAKPOINTS.DESKTOP);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <RegisterMobile /> : <RegisterDesktop />;
}

