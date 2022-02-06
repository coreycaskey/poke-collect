export const AppRoutes = {
  Login: '/login',
  SignUp: '/sign-up',
  Gallery: '/gallery',
  Portfolio: '/portfolio',
  Profile: '/profile',
  Admin: '/admin',
  Error: '/404',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AppRoutes = typeof AppRoutes[keyof typeof AppRoutes];
