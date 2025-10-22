import { type RouteObject } from 'react-router-dom';
import { RoutePath } from './routes';
import { Register } from '@views/register';
import { Login } from '@views/login';
import { GameRoom } from '@views/game-room';
import { MyGames } from '@views/my-games';
import { GameStepFirst } from '@views/game-step/game-step-first';
import { GameStepSecond } from '@views/game-step/game-step-second';
import { MainLayout } from '@app/layout/main-layout';

export const routes: RouteObject[] = [
  {
    path: RoutePath.Home,
    element: <Login />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: RoutePath.GameRoom,
        element: <GameRoom />,
      },
    ],
  },
  {
    element: <MainLayout showDate={false} showAuthButton={false} />,
    children: [
      {
        path: RoutePath.MyGames,
        element: <MyGames />,
      },
    ],
  },
  {
    path: RoutePath.GameStepFirst,
    element: <GameStepFirst />,
  },
  {
    path: RoutePath.GameStepSecond,
    element: <GameStepSecond />,
  },
  {
    path: RoutePath.Register,
    element: <Register />,
  },
  {
    path: RoutePath.Login,
    element: <Login />,
  },
];

