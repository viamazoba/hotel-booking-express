import { Router } from "express";
import { createHotelController } from "./hotel.controller";
import { getHotelController } from "./hotel.controller";
import { getHotelByIdController } from "./hotel.controller";
import { updateHotelController } from "./hotel.controller";
import { deleteHotelController } from "./hotel.controller";
const router = Router();
//crear hotel
router.post('/', createHotelController);
//obtener todos los hoteles
router.get('/', getHotelController);
//obtener hotel por su ID
router.get('/:id', getHotelByIdController);
//actualizar un hotel por su ID
router.put('/:id', updateHotelController);
//eliminar hotel por su Id
router.delete('/:id', deleteHotelController);
export default router;

