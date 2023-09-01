import { Router } from 'express';

import { createUserHandler, verifyUserHandler, getUserHandler, } from './user.controller';
import  { isAuthenticated }  from "../../auth/auth.controller";

const router = Router();

// /api/users -> POST
router.post('/', createUserHandler);
router.post('/verify', verifyUserHandler);
router.post('/get-info-user', getUserHandler);
router.put('/', )

export default router;