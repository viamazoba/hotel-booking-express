import { Router } from "express";
import { getAmenitiesRoomController } from "./amenities.controller";
import { getAmenitiesRoomByIdController } from "./amenities.controller";
import { updateRoomController } from "../room/room.controller";

const router = Router();
router.get('/', getAmenitiesRoomController);
router.get('/:roomId', getAmenitiesRoomController);
router.get('/:id', getAmenitiesRoomByIdController);
router.put('/:id', updateRoomController);

export default router