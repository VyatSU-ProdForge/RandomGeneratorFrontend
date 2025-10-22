import React from 'react';
import { useMediaQuery } from '@utils/hooks/use-media-query';
import { GameStepSecondDesktop } from './desktop';
import { GameStepSecondMobile } from './mobile';

export function GameStepSecond(): React.ReactElement {
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  if (isDesktop) {
    return <GameStepSecondDesktop />;
  }
  return <GameStepSecondMobile />;
}

