import { Request, Response } from "express";
import { createBookedRoom } from "./bookedRoom.service";
import { getbookedRoomById } from "./bookedRoom.service";
import { getbookedRooms } from "./bookedRoom.service";
import { AuthRequest } from "../../auth/auth.types";

function errorHandler(exception: unknown) {
    const message = (typeof exception === 'string') ? exception.toUpperCase()
      : (exception instanceof Error) ? exception.message : 'Something was wrong';

    return message;
  }

export async function createBookedRoomController(req: AuthRequest, res: Response){
  console.log(req.body)
  try{
      const bookRoomData: any = {
        guests: req.body.guests,
        check_in: req.body.check_in,
        check_out: req.body.check_out,
        userId: req.body.userId,
        roomId: req.body.roomId,
      }; 
      const createdBookedRoom: any = await createBookedRoom(bookRoomData);
      res.status(201).json({ message: 'hotel has been created successfully',createdBookedRoom});
  } catch (error: unknown) {
      const message = errorHandler(error);
      res.status(400).json({ message })
  }
}
export async function getBookedRoomByIdController(req:Request, res: Response) {
  const { id } = req.params;
  try {
      const bookedRoom = await getbookedRoomById(id);
      res.status(200).json(bookedRoom);
  } catch (error:any) {
      const message = errorHandler(error);
      res.status(500).json({ message })
  }    
  }

  export async function getbookedRoomsController(req:AuthRequest, res: Response) {
    const { userId } = req.params;
    try{
        const userBookedRooms = await getbookedRooms(userId);
        res.status(200).json(userBookedRooms);
    } catch (error){
        res.status(500).json({message: 'error al obtener las habitaciones del hotel'})
    }
}

  