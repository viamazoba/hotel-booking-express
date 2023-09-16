import { Request, Response } from "express";
import { createInclusion_room } from "./inclusion.service";
import { getInclusion_room } from "./inclusion.service";
import { getInclusionRoomById } from "./inclusion.service";
import { updateInclusionroom } from "./inclusion.service";
import { Inclusion_room, CreateInclusionData } from "./inclusion.types";

function errorHandler(exception: unknown) {
    const message = (typeof exception === 'string') ? exception.toUpperCase()
      : (exception instanceof Error) ? exception.message : 'Something was wrong';

    return message;
  }

  export async function createInclusionDataHandler(req: Request, res: Response){
    try{
        const inclusionData: CreateInclusionData = {
            roomId: req.query.id as string,
            inclusionId: req.body.id,
        }; 
        const createdInclusion: Inclusion_room = await createInclusion_room(inclusionData);
        res.status(201).json({ message: 'Room has been created successfully',createInclusion_room});
    } catch (error: unknown) {
        const message = errorHandler(error);
        res.status(400).json({ message })
    }
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
    console.log('este es el id de inclusion: ', id)
    try{
      const inclusionData: CreateInclusionData = {
        roomId: req.body.id,
        inclusionId: req.body.id,
      }; 
      const updatedInclusionRoom = await updateInclusionroom(id, inclusionData);
      res.status(200).json(updatedInclusionRoom);
      } catch (error:any){
      const message = errorHandler(error);
      console.log('aca esta el error')
      res.status(500).json({ message })
  }    
  }