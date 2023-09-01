import { Application } from 'express';

import healthcheckRouter from './api/healthcheck';
import userRouter from './api/user';
import authLocalRouter from './auth/local';
import hotelRouter from './api/hotel';
import roomRouter from './api/room'
import paymentRouter from './api/payment'

const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter)
  app.use('/api/user', userRouter)
  app.use('/api/hotel', hotelRouter)
  app.use('/api/room', roomRouter)
//   //Auth
  app.use('/auth/local', authLocalRouter)
  app.use('/api/payment', paymentRouter)

}

export default routes