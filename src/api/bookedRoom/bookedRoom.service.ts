import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function createBookedRoom(data: any){
  try {
      const BookedRoom = await prisma.booked_room.create({
        data
      });
      return BookedRoom;
    } catch (error: any) {
      throw new Error(`Error creating room: ${error.message}`);
  }
}

export async function getbookedRoomById(id: string) {
  try {
    const booked_room = await prisma.booked_room.findUnique({
      where: { id },
      include: {
        user: true,
        room:{
          include:{
            hotel:true
          }
        }
      }
    });

    return {
      booked_room
    };
  } catch (error: any) {
    throw new Error(`Error fetching hotel by ID: ${error.message}`);
  }
}
