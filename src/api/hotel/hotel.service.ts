import { PrismaClient } from "@prisma/client";

import { CreateHotelData } from "./hotel.types";

const prisma = new PrismaClient();

export async function createHotel(data: CreateHotelData){
    try {
        const hotel = await prisma.hotel.create({
          data
        });
    
        return hotel;
      } catch (error: any) {
        throw new Error(`Error creating hotel: ${error.message}`);
      }
}