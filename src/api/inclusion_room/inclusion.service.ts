import { PrismaClient } from "@prisma/client";
import { CreateInclusionData } from "./inclusion.types";

const prisma = new PrismaClient();

export async function createInclusion_room(data: CreateInclusionData[]){
    try {
        const inclusion = await prisma.inclusion_room.createMany({
          data
        });
        return inclusion;
      } catch (error: any) {
        throw new Error(`Error creating inclusion: ${error.message}`);
    }
}

export async function getInclusion_room(){
  try{
    const inclusionsRoom = await prisma.inclusion_room.findMany({
      include:{
        inclusion:{
          select: {
            inclusion_name: true,
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
    return inclusionsRoom
  } catch (error: any){
    throw new Error (`Error fetching rooms: ${error.message}`)
  }
}

export async function getInclusionRoomById(id:string){
  try {
    const inclusion = await prisma.inclusion_room.findUnique({
      where: { id },
    });
    return inclusion;
  } catch (error:any) {
    throw new Error(`Error fetching room by ID: ${error.message}`);
    
  }
}

export async function updateInclusionroom(id:string,data:CreateInclusionData) {
  try{
    const updatedInclusion = await prisma.inclusion_room.update({
      where: { id },
      data
    });
    return updatedInclusion
  } catch (error: any){
    throw new Error(`Error updating room: ${error.message}`); 
  }
}


export async function getInclusionByName(inclusionName:string) {
  try {
    const inclusion = await prisma.inclusion.findMany({
      select:{
        id: true
      },
      where: {
        inclusion_name:inclusionName
      },
    });
    return inclusion[0].id
  } catch (error: any) {
    throw new Error(`Error getting inclusion: ${error.message}`)
    
  }
}