import React from 'react';
import { useMediaQuery } from '@utils/hooks/use-media-query';
import { GameStepFirstDesktop } from './desktop';
import { GameStepFirstMobile } from './mobile';

export function GameStepFirst(): React.ReactElement {
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  if (isDesktop) {
    return <GameStepFirstDesktop />;
  }
  return <GameStepFirstMobile />;
}

