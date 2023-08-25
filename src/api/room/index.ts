import { Router} from 'express'
import { createRoomHandler } from './room.controller';

const router= Router();

router.post('/', createRoomHandler);

export default router;
