import { PrismaClient } from "@prisma/client";
import { CreateRoomData, editCreateRoomData } from "./room.types";

const prisma = new PrismaClient();

export async function createRoom(data: CreateRoomData){
    try {
        const room = await prisma.room.create({
          data,
          include:{
            Amenity_room: true,
          },
        });
        return room;
      } catch (error: any) {
        throw new Error(`Error creating room: ${error.message}`);
    }
}

export async function getRooms(){
  try{
    const rooms = await prisma.room.findMany({
      include:{
        hotel:{
          select: {
            hotel_name: true,
            id: true,
              
          }
        },
        Amenity_room:{
          select: {
            amenityId: true
          }
        },
      },
    });
    return rooms
  } catch (error: any){
    throw new Error (`Error fetching rooms: ${error.message}`)
  }
}

export async function getRoomById(id:string){
  try {
    const room = await prisma.room.findUnique({
      where: { id },
      include:{
        Amenity_room:{
          select:{
            amenity: true

          }
        },
        hotel:{
          include:{
          City:{ 
            include: {country: true}}
        }
      }}
      },    
    );
    return room;
  } catch (error:any) {
    throw new Error(`Error fetching room by ID: ${error.message}`);
    
  }
}

export async function updateRoom(id:string,data:editCreateRoomData) {
  try{
    const updatedRoom = await prisma.room.update({
      where: { id },
      data
    });
    return updatedRoom
  } catch (error: any){
    throw new Error(`Error updating room: ${error.message}`); 
  }
}

export async function deleteRoom(id:string) {
  try {
    const deletedRoom = await prisma.room.delete({
      where: {id},
    });
    return deletedRoom
  } catch (error: any) {
    throw new Error(`Error deleting room: ${error.message}`);
    
  }
  
}