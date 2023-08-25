import { Request, Response } from "express";

import { createHotel } from "./hotel.service";
import { getHotels } from "./hotel.service";
import { getHotelById } from "./hotel.service";
import { updateHotel } from "./hotel.service";
import { deleteHotel } from "./hotel.service";
import { Hotel, CreateHotelData } from "./hotel.types";

function errorHandler(exception: unknown) {
    const message = (typeof exception === 'string') ? exception.toUpperCase()
      : (exception instanceof Error) ? exception.message : 'Something was wrong';
  
    return message;
}

export async function createHotelController(req: Request, res: Response){
    try{
        const hotelData: CreateHotelData = req.body; 
        const createdHotel: Hotel = await createHotel(hotelData);
        res.status(201).json({ message: 'hotel has been created successfully',createdHotel});
    } catch (error: unknown) {
        const message = errorHandler(error);
        res.status(400).json({ message })
    }
}
export async function getHotelController (req:Request, res: Response) {
    try{
        const hotels = await getHotels();
        res.status(200).json(hotels);
    } catch(error:any){
        const message = errorHandler(error);
        res.status(500).json({ message})

    }
}
export async function getHotelByIdController(req:Request, res: Response) {
const { id } = req.params;
try {
    const hotel = await getHotelById(id);
    res.status(200).json(hotel);
} catch (error:any) {
    const message = errorHandler(error);
    res.status(500).json({ message })
}    
}
export async function updateHotelController(req:Request, res: Response) {
    const { id } = req.params;
    const hotelData = req.body;
    try{
        const updatedHotel = await updateHotel(id, hotelData);
        res.status(200).json(updateHotel);
} catch (error:any){
    const message = errorHandler(error);
    res.status(500).json({ message })
}    
}
export async function deleteHotelController(req:Request, res: Response) {
 const { id } = req.params;
 try {
    const deletedHotel = await deleteHotel(id);
    res.status(200).json(deletedHotel);
 } catch (error:any) {
    const message = errorHandler(error);
    res.status(500).json({ message });
 }   
}

// export default errorHandler;