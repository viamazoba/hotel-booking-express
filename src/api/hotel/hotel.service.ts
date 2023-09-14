import { PrismaClient } from "@prisma/client";

import { CreateHotelData } from "./hotel.types";

const prisma = new PrismaClient();

export async function createHotel(data: CreateHotelData){
    try {
      console.log("imprime data", data)
        const hotel = await prisma.hotel.create({
          data
        });
    
        return hotel;
      } catch (error: any) {
        console.log("imprime error", error)
        throw new Error(`Error creating hotel: ${error.message}`);
      }
}

export async function getHotels(filterCity: string){
  try{
    const hotels = await prisma.hotel.findMany({
      where:{
        City:{
          name_city: {
            contains: filterCity
          },
        }
      }
    })
    return hotels
  } catch (error: any){
    throw new Error (`Error fetching hotels: ${error.message}`)
  }
}



export async function getHotelById(id: string) {
  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
      include: {
        rooms:{
          include: {
            Amenity_room:{
              include: {amenity: true}
            },
            Inclusion_room:{
              include: {inclusion: true}
            },

          }
        },
        City:{ 
          include: {country: true}},
        Service_labels_hotel: {
          include: {
            label: true
          }
        }
      },
    });

    const serviceLabels = hotel?.Service_labels_hotel.map(item => item.label);

    return {
      ...hotel,
      Service_labels_hotel: serviceLabels,
    };
  } catch (error: any) {
    throw new Error(`Error fetching hotel by ID: ${error.message}`);
  }
}



export async function updateHotel(id:string,data:CreateHotelData) {
  try{
    const updatedHotel = await prisma.hotel.update({
      where: { id },
      data
    });
    return updatedHotel
  } catch (error: any){
    throw new Error(`Error updating hotel: ${error.message}`); 
  }
}

export async function deleteHotel(id:string) {
  try {
    const deletedHotel = await prisma.hotel.delete({
      where: {id},
    });
    return deletedHotel
  } catch (error: any) {
    throw new Error(`Error deleting hotel: ${error.message}`);
    
  }
  
}