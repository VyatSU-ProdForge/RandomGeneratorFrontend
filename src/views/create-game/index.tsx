import React from 'react';
import { useMediaQuery } from '@/utils/hooks/use-media-query';
import { CreateGameMobile } from './mobile';
import { CreateGameDesktop } from './desktop';

export function CreateGame(): React.ReactElement {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <CreateGameMobile /> : <CreateGameDesktop />;
}

