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

export async function getHotels(filterCity: string){
  try{
    const hotels = await prisma.hotel.findMany({
      include:{
        rooms:{
          select: {
            room_name: true
          }
        },
        city:{
          select: {
            name_city: true,
          }
        }
      },
      where:{
        city:{
          name_city: {
            contains: filterCity
          },
        }
      }
    }
    ); 
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
        city:{
include: {country: true}
            },
            Service_labels_hotel: {
              include: {
                label: {
          select: {
            service_label_name: true
                  }
                }
          }
        }
      },
    });
    
    return hotel
    
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
export async function getHotelsRooms(hotelId:string) {
  try {
    const hotel = await prisma.hotel.findUnique({
      where: {id: hotelId,},
      include: {
        rooms: {
          include: {
            Amenity_room:{
                  include: {amenity: true}
                },
                Inclusion_room:{
                  include: {inclusion: true}
                },
          }
        },
      },
    });
    return hotel?.rooms;
  } catch (error) {
    throw error;
  }
}