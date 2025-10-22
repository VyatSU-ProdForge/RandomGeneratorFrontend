import React from 'react';
import { HeaderMobile } from './mobile';
import { HeaderDesktop } from './desktop';

interface IHeaderProps {
  showDate?: boolean;
  showAuthButton?: boolean;
  onAuthClick?: () => void;
  transparent?: boolean;
}

export function Header(props: IHeaderProps): React.ReactElement {
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

  return isMobile ? <HeaderMobile {...props} /> : <HeaderDesktop {...props} />;
}

