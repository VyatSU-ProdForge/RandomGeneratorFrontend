// Application Routes
// Константы с путями для навигации

export const RoutePath = {
  Home: '/',
  GameRoom: '/game-room',
  MyGames: '/my-games',
  Register: '/register',
  Login: '/login',
  GameStepFirst: '/game-step/first/:id',
  GameStepSecond: '/game-step/second/:id',
} as const;

export type RoutePathType = typeof RoutePath[keyof typeof RoutePath];

