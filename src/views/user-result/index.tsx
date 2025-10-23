import React from 'react';
import { useMediaQuery } from '@/utils/hooks/use-media-query';
import { UserResultMobile } from './mobile';
import { UserResultDesktop } from './desktop';

export function UserResult(): React.ReactElement {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <UserResultMobile /> : <UserResultDesktop />;
}

