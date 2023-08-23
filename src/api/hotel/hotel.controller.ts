import { Request, Response } from "express";

import { createHotel } from "./hotel.service";
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

export default errorHandler;