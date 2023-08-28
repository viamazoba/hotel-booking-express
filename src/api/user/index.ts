import { Router } from 'express';

import { createUserHandler, verifyUserHandler } from './user.controller';

const router = Router();

// /api/users -> POST
router.post('/', createUserHandler);
router.post('/verify', verifyUserHandler);

export default router;