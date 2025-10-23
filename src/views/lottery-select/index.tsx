import React from 'react';
import { useMediaQuery } from '@/utils/hooks/use-media-query';
import { LotterySelectMobile } from './mobile';
import { LotterySelectDesktop } from './desktop';

export function LotterySelect(): React.ReactElement {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return isMobile ? <LotterySelectMobile /> : <LotterySelectDesktop />;
}

