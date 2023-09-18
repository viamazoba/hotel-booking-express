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

export async function getbookedRooms(userId:string) {
  try {
    const Booked_rooms = await prisma.booked_room.findMany({
      where: {userId: userId,},
      include: {
        room:{
          include: {
            hotel:{include:
              {city:
                {include:
                  {country: true}
                }}},
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
    return Booked_rooms;
  } catch (error) {
    throw error;
  }
}
