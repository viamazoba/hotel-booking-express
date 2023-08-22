import { Request, Response } from "express";

import { createHotel } from "./hotel.service";
import { Hotel, CreateHotelData } from "./hotel.types";

export async function createHotelController(req: Request, res: Response){
    try{
        const hotelData: CreateHotelData = req.body; 
        const createdHotel: Hotel = await createHotel(hotelData);
        res.status(201).json({ message: 'hotel has been created successfully',createdHotel});
    } catch ({ message }: any) {

        res.status(400).json({ message })
    }
}