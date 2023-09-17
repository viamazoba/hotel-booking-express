import { Request, Response } from "express";
import { createInclusion_room } from "./inclusion.service";
import { getInclusion_room } from "./inclusion.service";
import { getInclusionRoomById } from "./inclusion.service";
import { updateInclusionroom } from "./inclusion.service";
import { Inclusion_room, CreateInclusionData } from "./inclusion.types";
import { getInclusionByName } from "./inclusion.service";
function errorHandler(exception: unknown) {
    const message = (typeof exception === 'string') ? exception.toUpperCase()
      : (exception instanceof Error) ? exception.message : 'Something was wrong';

    return message;
  }

export async function getInclusionRoomController (req: Request, res: Response){
    try{
        const inclusionsRoom = await getInclusion_room();
        res.status(200).json(inclusionsRoom);
    } catch(error:any){
        const message = errorHandler(error);
        res.status(500).json({ message})
  
    }
} 
export async function getInclusionRoomByIdController(req:Request, res: Response) {
    const { id } = req.params;
    try {
      const inclusionRoom = await getInclusionRoomById(id);
      res.status(200).json(inclusionRoom);
    } catch (error:any) {
      const message = errorHandler(error);
      res.status(500).json({ message })
    }    
    }
export async function uptadateInclusionRoomController(req: Request, res: Response) {
    const { id } = req.params;
    try{
      const inclusionData: CreateInclusionData = {
        roomId: req.body.id,
        inclusionId: req.body.id,
      }; 
      const updatedInclusionRoom = await updateInclusionroom(id, inclusionData);
      res.status(200).json(updatedInclusionRoom);
      } catch (error:any){
      const message = errorHandler(error);
      res.status(500).json({ message })
  }    
  }