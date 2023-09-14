import { Request, Response } from "express";

import { createRoom } from "./room.service";
import { getRooms } from "./room.service";
import { getRoomById } from "./room.service";
import { updateRoom } from "./room.service";
import { deleteRoom } from "./room.service";
import { Room, CreateRoomData, editCreateRoomData } from "./room.types";
import { AuthRequest } from "../../auth/auth.types";

function errorHandler(exception: unknown) {
    const message = (typeof exception === 'string') ? exception.toUpperCase()
      : (exception instanceof Error) ? exception.message : 'Something was wrong';

    return message;
  }
export async function createRoomHandler(req: Request, res: Response){
    try{
        const roomData: CreateRoomData = {
          room_name: req.body.name,
          room_img: req.body.imageCreateRoom,
          new_price: parseInt(req.body.salePrice),
          previous_price: parseInt(req.body.normalPrice),
          max_guests: parseInt(req.body.guests),
          hotelId: req.query.hotelId as string,
          // hotel_name: req
        }; 
        const createdRoom: Room = await createRoom(roomData);
        res.status(201).json({ message: 'Room has been created successfully',createdRoom});
    } catch (error: unknown) {
        const message = errorHandler(error);
        res.status(400).json({ message })
    }
}
export async function getRoomController (req:Request, res: Response) {
  try{
      const rooms = await getRooms();
      res.status(200).json(rooms);
  } catch(error:any){
      const message = errorHandler(error);
      res.status(500).json({ message})

  }
}
export async function getRoomByIdController(req:Request, res: Response) {
const { id } = req.params;
try {
  const room = await getRoomById(id);
  res.status(200).json(room);
} catch (error:any) {
  const message = errorHandler(error);
  res.status(500).json({ message })
}    
}
export async function updateRoomController(req:AuthRequest, res: Response) {
  const { id } = req.params;
  console.log('este es el id de la habitacion: ', id)
  // const roomData = req.body;
  try{
    console.log(req.body)
    console.log('este es el console de req.query ', req.query)
    const roomData: editCreateRoomData = {
      room_name: req.body.name,
      room_img: req.body.imageCreateRoom,
      new_price: parseInt(req.body.salePrice),
      previous_price: parseInt(req.body.normalPrice),
      max_guests: parseInt(req.body.guests),
    }; 
    const updatedRoom = await updateRoom(id, roomData);
    res.status(200).json(updatedRoom);
    } catch (error:any){
    const message = errorHandler(error);
    console.log('aca esta el error')
    res.status(500).json({ message })
}    
}
export async function deleteRoomController(req:AuthRequest, res: Response) {
const { id } = req.params;
try {
  const deletedRoom = await deleteRoom(id);
  res.status(200).json(deletedRoom);
} catch (error:any) {
  const message = errorHandler(error);
  res.status(500).json({ message });
}   
}

export default errorHandler;