import React from 'react';
import { useMediaQuery } from '@/utils/hooks/use-media-query';
import { AdminMobile } from './mobile';
import { AdminDesktop } from './desktop';

export function Admin(): React.ReactElement {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <AdminMobile /> : <AdminDesktop />;
}

