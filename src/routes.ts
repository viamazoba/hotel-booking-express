import { Application } from 'express';
import healthcheckRouter from './api/healthcheck';
import userRouter from './api/user';
import hotelRouter from './api/hotel';

const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter)
  app.use('/api/user', userRouter)
  app.use('api/hotel', hotelRouter)
}

export default routes