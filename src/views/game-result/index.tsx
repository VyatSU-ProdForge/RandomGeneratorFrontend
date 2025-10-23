import React from 'react';
import { useMediaQuery } from '@/utils/hooks/use-media-query';
import { GameResultMobile } from './mobile';
import { GameResultDesktop } from './desktop';

export function GameResult(): React.ReactElement {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <GameResultMobile /> : <GameResultDesktop />;
}

