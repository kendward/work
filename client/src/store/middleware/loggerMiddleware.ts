import { Middleware } from '@reduxjs/toolkit';

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  console.log('Dispatching:', action);
  console.log('State before:', storeAPI.getState());
  const result = next(action);
  console.log('State after:', storeAPI.getState());
  return result;
};

export default loggerMiddleware;
