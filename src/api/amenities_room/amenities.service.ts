import { PrismaClient } from "@prisma/client";
import { CreateAmenitiesData } from "./amenities.types";

const prisma = new PrismaClient();

export async function getAmenitiesRoomByRoomId(roomId:string = '-1'){
  console.log('roomId',roomId)
    try{
      const amenitiesRoom = await prisma.amenity.findMany({
        include: {
          Amenity_room: {
            where: {
              roomId: roomId,
            },
          },
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

  export async function createAmentiy_rooms(data: CreateAmenitiesData[]){
    try {
        const amenity = await prisma.amenity_room.createMany({
          data
        });
        return amenity;
      } catch (error: any) {
        throw new Error(`Error creating amenities: ${error.message}`);
    }
}
export async function deleteAmenity(roomId:string) {
  try {
    const deletedAmenity_room = await prisma.amenity_room.deleteMany({
      where: {roomId},
    });
    return deletedAmenity_room
  } catch (error: any) {
    throw new Error(`Error deleting hotel: ${error.message}`);
    
  }
  
}