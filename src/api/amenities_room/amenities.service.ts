import { PrismaClient } from "@prisma/client";
import { CreateAmenitiesData } from "./amenities.types";

const prisma = new PrismaClient();

export async function getAmenite_room(){
    try{
      const amenitiesRoom = await prisma.amenity_room.findMany({
        include:{
          amenity:{
            select: {
              amenity_name: true,
              id: true,
            }
          },
          room:{
            select:{
              id: true,
            }
          }
  
        },
      });
      return amenitiesRoom
    } catch (error: any){
      throw new Error (`Error fetching rooms: ${error.message}`)
    }
  }
  
  export async function getAmenitiesRoomById(id:string){
    try {
      const amenity = await prisma.amenity_room.findUnique({
        where: { id },
      });
      return amenity;
    } catch (error:any) {
      throw new Error(`Error fetching room by ID: ${error.message}`);
      
    }
  }
  
  export async function updateAmenityroom(id:string,data:CreateAmenitiesData) {
    try{
      const updatedAmenity = await prisma.amenity_room.update({
        where: { id },
        data
      });
      return updatedAmenity
    } catch (error: any){
      throw new Error(`Error updating room: ${error.message}`); 
    }
  }