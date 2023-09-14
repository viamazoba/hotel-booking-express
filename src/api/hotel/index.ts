import { Router } from "express";
import { createHotelController } from "./hotel.controller";
import { getHotelController } from "./hotel.controller";
import { getHotelByIdController } from "./hotel.controller";
import { updateHotelController } from "./hotel.controller";
import { deleteHotelController } from "./hotel.controller";
import { getHotelRoomsController } from "./hotel.controller";
import  { hasRole, isAuthenticated }  from "../../auth/auth.controller";


const router = Router();
//crear hotel
router.post('/', /*isAuthenticated, hasRole(['admin']),*/ createHotelController);
//obtener todos los hoteles
router.get('/', getHotelController);
//obtener hotel por su ID
router.get('/:id', getHotelByIdController);
//actualizar un hotel por su ID
router.put('/:id', /*isAuthenticated, hasRole(['admin']),*/updateHotelController);
//eliminar hotel por su Id
router.delete('/:id', /*isAuthenticated, hasRole(['admin']),*/ deleteHotelController);
// Ruta para obtener las habitaciones de un hotel específico
router.get('/:hotelId/rooms', getHotelRoomsController);

export default router;