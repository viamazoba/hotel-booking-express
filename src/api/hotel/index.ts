import { Router } from "express";

import { createHotelController } from "./hotel.controller";

const router = Router();

router.post('/', createHotelController);

export default router;

