import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCityByName(cityName: string){
    try {
        const city= await prisma.city.findMany({
            select:{
                id: true
            },
            where: {
                name_city:cityName
            },

        });
    
        return city[0].id;
      } catch (error: any) {
        throw new Error(`Error getting city: ${error.message}`);
      }
}