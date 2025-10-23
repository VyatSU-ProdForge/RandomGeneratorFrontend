// Application Routes
// Константы с путями для навигации

export const RoutePath = {
  Home: '/',
  GameRoom: '/game-room',
  MyGames: '/my-games',
  Register: '/register',
  Login: '/login',
  LotterySelect: '/lottery/:id',
  GameStepFirst: '/game-step/first/:id',
  UserResult: '/user-result/:id',
  Admin: '/admin',
  CreateGame: '/admin/create-game',
  GameDetails: '/admin/game/:id',
  GameResult: '/admin/game-result/:id',
} as const;

export type RoutePathType = typeof RoutePath[keyof typeof RoutePath];

