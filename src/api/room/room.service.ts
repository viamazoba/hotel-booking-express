import { PrismaClient } from "@prisma/client";
import { CreateRoomData } from "./room.types";

const prisma = new PrismaClient();

export async function createRoom(data: CreateRoomData){
    try {
        const room = await prisma.room.create({
          data
        });
        return room;
      } catch (error: any) {
        throw new Error(`Error creating room: ${error.message}`);
    }
}