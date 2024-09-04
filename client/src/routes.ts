/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [  "/reset-password",
  "/forgot-password",];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to / home page
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/register",
  "/error",
  // write regex for dynamic routes
  /^\/verify-account\/\w+$/,
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication puposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
