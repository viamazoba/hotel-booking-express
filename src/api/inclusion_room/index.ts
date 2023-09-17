import { Router } from "express";
import { getInclusionRoomController } from "./inclusion.controller";
import { getInclusionRoomByIdController } from "./inclusion.controller";
import { uptadateInclusionRoomController } from "./inclusion.controller";
const router = Router();
router.get('/', getInclusionRoomController);
router.get('/:id', getInclusionRoomByIdController);
router.put('/:id', uptadateInclusionRoomController);

export default router