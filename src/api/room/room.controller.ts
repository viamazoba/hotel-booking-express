import { Request, Response } from "express";

import { createRoom } from "./room.service";
import { getRooms } from "./room.service";
import { getRoomById } from "./room.service";
import { updateRoom } from "./room.service";
import { deleteRoom } from "./room.service";
import { getAmenitiesRoomByRoomId } from "../amenities_room/amenities.service";
import { createAmentiy_rooms } from "../amenities_room/amenities.service";
import { createInclusion_rooms } from "../inclusion_room/inclusion.service";
import { getInclusionRoomByRoomId } from "../inclusion_room/inclusion.service";
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
        }; 
        const createdRoom: Room = await createRoom(roomData);
        
        const amenities = req.body.amenities;
        const allAmenities = await getAmenitiesRoomByRoomId()
        const amenitiesIds = allAmenities.filter(amenity => amenities.includes(amenity.amenity_name)).map(amenity => amenity.id)
        const arrayToSaveAmenity = amenitiesIds.map(id => ({amenityId:id, roomId: createdRoom.id}))

        const inclusions = req.body.inclusions;
        const allInclusions = await getInclusionRoomByRoomId()
        const inclusionsIds = allInclusions.filter(inclusion => inclusions.includes(inclusion.inclusion_name)).map(inclusion => inclusion.id)
        const arrayToSaveInclusion = inclusionsIds.map(id => ({inclusionId:id, roomId: createdRoom.id}))

        await createAmentiy_rooms(arrayToSaveAmenity)
        await createInclusion_rooms(arrayToSaveInclusion)
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
  try{
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