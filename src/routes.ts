import { Application } from 'express';

import healthcheckRouter from './api/healthcheck';
import userRouter from './api/user';
import authLocalRouter from './auth/local';
import hotelRouter from './api/hotel';
import roomRouter from './api/room';
import paymentRouter from './api/payment';
import inclusion_roomRouter from './api/inclusion_room'
import amenity_roomRouter from './api/amenities_room'

const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter)
  app.use('/api/user', userRouter)
  app.use('/api/hotel', hotelRouter)
  app.use('/api/room', roomRouter)
  app.use('/api/inclusion_room', inclusion_roomRouter)
  app.use('/api/amenities_room', amenity_roomRouter)
//   //Auth
  app.use('/auth/local', authLocalRouter)
  app.use('/api/payment', paymentRouter)

}

export default routes