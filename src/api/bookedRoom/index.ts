import { Router} from 'express'
import { createBookedRoomController } from './bookedRoom.controller';
import { getBookedRoomByIdController } from './bookedRoom.controller';



const router= Router();
router.post('/', createBookedRoomController);
router.get('/:id', getBookedRoomByIdController);
export default router;
