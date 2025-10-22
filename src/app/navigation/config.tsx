import { type RouteObject } from 'react-router-dom';
import { RoutePath } from './routes';
import { Register } from '@views/register';
import { Login } from '@views/login';
import { GameRoom } from '@views/game-room';
import { MyGames } from '@views/my-games';
import { LotterySelect } from '@views/lottery-select';
import { GameStepFirst } from '@views/game-step/game-step-first';
import { GameStepSecond } from '@views/game-step/game-step-second';
import { Admin } from '@views/admin';
import { CreateGame } from '@views/create-game';
import { GameDetails } from '@views/game-details';
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
      {
        path: RoutePath.Admin,
        element: <Admin />,
      },
      {
        path: RoutePath.CreateGame,
        element: <CreateGame />,
      },
      {
        path: RoutePath.GameDetails,
        element: <GameDetails />,
      },
      {
        path: RoutePath.MyGames,
        element: <MyGames />,
      },
    ],
  },
  {
    path: RoutePath.LotterySelect,
    element: <LotterySelect />,
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

