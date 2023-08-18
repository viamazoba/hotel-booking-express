import { Router } from 'express';

import { createUserHandler } from './user.controller';

const router = Router();

// /api/users -> POST
router.post('/', createUserHandler);

export default router;