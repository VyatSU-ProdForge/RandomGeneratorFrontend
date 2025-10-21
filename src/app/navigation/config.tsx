import { type RouteObject } from 'react-router-dom';
import { RoutePath } from './routes';
import { Register } from '@views/register';
import { Login } from '@views/login';
import { GameRoom } from '@views/game-room';

export const routes: RouteObject[] = [
  {
    path: RoutePath.Home,
    element: <Login />,
  },
  {
    path: RoutePath.GameRoom,
    element: <GameRoom />,
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

