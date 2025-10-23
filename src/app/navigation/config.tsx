import { type RouteObject } from 'react-router-dom';
import { RoutePath } from './routes';
import { Register } from '@views/register';
import { Login } from '@views/login';
import { GameRoom } from '@views/game-room';
import { MyGames } from '@views/my-games';
import { LotterySelect } from '@views/lottery-select';
import { GameStepFirst } from '@views/game-step/game-step-first';
import { UserResult } from '@views/user-result';
import { Admin } from '@views/admin';
import { CreateGame } from '@views/create-game';
import { GameDetails } from '@views/game-details';
import { GameResult } from '@views/game-result';
import { LotteryAlgorithm } from '@views/lottery-algorithm';
import { MainLayout } from '@app/layout/main-layout';
import { Audit } from '@/views/audit';

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
        path: RoutePath.GameResult,
        element: <GameResult />,
      },
    ],
  },
  {
    element: <MainLayout showDate={false} showMenuButton={false} />,
    children: [
      {
        path: RoutePath.MyGames,
        element: <MyGames />,
      },
      {
        path: RoutePath.Algorithm,
        element: <LotteryAlgorithm />,
      },
      {
        path: RoutePath.Audit,
        element: <Audit/>,
      },
    ],
  },
  {
    path: RoutePath.LotterySelect,
    element: <LotterySelect />,
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
    path: RoutePath.UserResult,
    element: <UserResult />,
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

