import { Router } from "express";
import { createHotelController } from "./hotel.controller";
import { getHotelController } from "./hotel.controller";
import { getHotelByIdController } from "./hotel.controller";
import { updateHotelController } from "./hotel.controller";
import { deleteHotelController } from "./hotel.controller";
import { getHotelRoomsController } from "./hotel.controller";
import  { hasRole, isAuthenticated }  from "../../auth/auth.controller";


const router = Router();
router.post('/', /*isAuthenticated, hasRole(['admin']),*/ createHotelController);
router.get('/', getHotelController);
router.get('/:id', getHotelByIdController);
router.put('/:id', /*isAuthenticated, hasRole(['admin']),*/updateHotelController);
router.delete('/:id', /*isAuthenticated, hasRole(['admin']),*/ deleteHotelController);
router.get('/:hotelId/rooms', getHotelRoomsController);

export default router;