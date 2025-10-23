import React from 'react';
import { useMediaQuery } from '@/utils/hooks/use-media-query';
import { GameDetailsMobile } from './mobile';
import { GameDetailsDesktop } from './desktop';

export function GameDetails(): React.ReactElement {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return isMobile ? <GameDetailsMobile /> : <GameDetailsDesktop />;
}

