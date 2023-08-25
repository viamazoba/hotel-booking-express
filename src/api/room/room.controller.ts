import { Request, Response } from "express";

import { createRoom } from "./room.service";
import { Room, CreateRoomData } from "./room.types";

function errorHandler(exception: unknown) {
    const message = (typeof exception === 'string') ? exception.toUpperCase()
      : (exception instanceof Error) ? exception.message : 'Something was wrong';

    return message;
  }
export async function createRoomHandler(req: Request, res: Response){
    try{
        const roomData: CreateRoomData = req.body; 
        const createdRoom: Room = await createRoom(roomData);
        res.status(201).json({ message: 'Room has been created successfully',createdRoom});
    } catch (error: unknown) {
        const message = errorHandler(error);
        res.status(400).json({ message })
    }
}

export default errorHandler;