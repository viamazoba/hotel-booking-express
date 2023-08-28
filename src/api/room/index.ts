import { Router} from 'express'
import { createRoomHandler } from './room.controller';
import { getRoomController } from './room.controller';
import { getRoomByIdController } from './room.controller';
import { updateRoomController } from './room.controller';
import { deleteRoomController } from './room.controller';
import  { hasRole, isAuthenticated }  from "../../auth/auth.controller";


const router= Router();

router.post('/',isAuthenticated, hasRole(['admin']), createRoomHandler);
router.get('/', getRoomController);
router.get('/:id', getRoomByIdController);
router.put('/:id', isAuthenticated, hasRole(['admin']),updateRoomController);
router.delete('/:id', isAuthenticated, hasRole(['admin']), deleteRoomController);

export default router;
