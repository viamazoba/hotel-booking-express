import { Request, Response } from "express";
import { getAmenitiesRoomByRoomId } from "./amenities.service";
import { getAmenitiesRoomById } from "./amenities.service";
import { updateAmenityroom } from "./amenities.service";
import { Amenity_room, CreateAmenitiesData } from "./amenities.types";

function errorHandler(exception: unknown) {
    const message = (typeof exception === 'string') ? exception.toUpperCase()
      : (exception instanceof Error) ? exception.message : 'Something was wrong';

    return message;
  }

  export async function getAmenitiesRoomController (req: Request, res: Response){
    try{
      const { roomId } = req.params;
        const amenitiesRoom = await getAmenitiesRoomByRoomId(roomId);
        const amenitiesRoomWithSelected = amenitiesRoom.map(amenity => ({...amenity, selected: !!roomId && !!amenity.Amenity_room.length, Amenity_room:undefined}))
        res.status(200).json(amenitiesRoomWithSelected);
    } catch(error:any){
        const message = errorHandler(error);
        res.status(500).json({ message})
  
    }
} 

export async function getAmenitiesRoomByIdController(req:Request, res: Response) {
    const { id } = req.params;
    try {
      const amenitiesRoom = await getAmenitiesRoomById(id);
      res.status(200).json(amenitiesRoom);
    } catch (error:any) {
      const message = errorHandler(error);
      res.status(500).json({ message })
    }    
    }

    export async function uptadateAmenityRoomController(req: Request, res: Response) {
        const { id } = req.params;
        try{
          const amenityData: CreateAmenitiesData = {
            roomId: req.body.id,
            amenityId: req.body.id,
          }; 
          const updatedAmenityRoom = await updateAmenityroom(id, amenityData);
          res.status(200).json(updatedAmenityRoom);
          } catch (error:any){
          const message = errorHandler(error);
          res.status(500).json({ message })
      }    
      }