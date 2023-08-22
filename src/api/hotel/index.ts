import { Router } from "express";

import { createHotelController } from "./hotel.controller";

const router = Router();

// /api/hotels -> POST
router.post('/', createHotelController);

export default router;

