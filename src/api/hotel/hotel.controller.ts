import { Request, Response } from "express";

import { createHotel } from "./hotel.service";
import { getHotels } from "./hotel.service";
import { getHotelById } from "./hotel.service";
import { updateHotel } from "./hotel.service";
import { deleteHotel } from "./hotel.service";
import { getHotelsRooms } from "./hotel.service";
import { Hotel, CreateHotelData } from "./hotel.types";
import { AuthRequest } from "../../auth/auth.types";
import { Stars } from "@prisma/client";
import { getCityByName } from "../city/city.service";

function errorHandler(exception: unknown) {
    const message = (typeof exception === 'string') ? exception.toUpperCase()
      : (exception instanceof Error) ? exception.message : 'Something was wrong';
  
    return message;
}

export async function createHotelController(req: AuthRequest, res: Response){
    console.log(req.body)
    try{
        const starsToType = (stars: string) => {
        switch (stars) {
            case "1": return Stars.one;
                case "2": return Stars.two;
                case "3": return Stars.three;
                case "4": return Stars.four;
                case "5": return Stars.five;
                default: return Stars.one;      
        }}
        const city_id = await getCityByName(req.body.city)
        const hotelData: CreateHotelData = {
            hotel_name: req.body.name,
            hotel_img: req.body.images,
            description: req.body.description,
            new_price: parseInt(req.body.salePrice),
            previous_price: parseInt(req.body.normalPrice),
            phone: req.body.phone,
            labels: req.body.status,
            // cityId: "clm8dxx6z0002veqw09fzqctq",
            cityId: city_id,
            // imgs: req.body.imgs,
            hotel_rating: starsToType(req.body.stars),
        }; 
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
export async function updateHotelController(req:AuthRequest, res: Response) {
    const { id } = req.params;
    try{
        console.log(req.body)
        const starsToType = (stars: string) => {
        switch (stars) {
            case "1": return Stars.one;
                case "2": return Stars.two;
                case "3": return Stars.three;
                case "4": return Stars.four;
                case "5": return Stars.five;
                default: return Stars.one;      
        }}
        const hotelData: CreateHotelData = {
            hotel_name: req.body.name,
            hotel_img: req.body.images,
            description: req.body.description,
            new_price: parseInt(req.body.salePrice),
            previous_price: parseInt(req.body.normalPrice),
            phone: req.body.phone,
            labels: req.body.status,
            cityId: "clm8dxx6z0002veqw09fzqctq",
            // cityId: req.body.cityId,
            // imgs: req.body.imgs,
            hotel_rating: starsToType(req.body.stars),
        }; 
        const updatedHotel = await updateHotel(id, hotelData);
        res.status(200).json(updateHotel);
        } catch (error:any){
        const message = errorHandler(error);
        res.status(500).json({ message })
}    
}
export async function deleteHotelController(req:AuthRequest, res: Response) {
 const { id } = req.params;
 try {
    const deletedHotel = await deleteHotel(id);
    res.status(200).json(deletedHotel);
 } catch (error:any) {
    const message = errorHandler(error);
    res.status(500).json({ message });
 }   
}
export async function getHotelRoomsController(req:AuthRequest, res: Response) {
    const { hotelId } = req.params;
    try{
        const hotelRooms = await getHotelsRooms(hotelId);
        res.status(200).json(hotelRooms);
    } catch (error){
        console.error(error);
        res.status(500).json({message: 'error al obtener las habitaciones del hotel'})
    }
}

// export default errorHandler;