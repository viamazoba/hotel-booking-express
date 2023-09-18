import { PrismaClient } from "@prisma/client";

import {getCitySeeder} from "../src/seed/city.seed"
import {getHotelSeeder} from "../src/seed/hotel.seed"
import {getRoomsSeeder} from "../src/seed/room.seed"
import {getUserSeeder} from "../src/seed/user.seed"
import { rolesSeeder } from './../src/seed/roles.seed';
import { getCountrySeeder } from './../src/seed/Country.seed';
import { faker } from "@faker-js/faker";


const prisma = new PrismaClient();

async function asyncForEach<T>(arr: T[], cb: (item: T, index: number) => Promise<any>) {
  for (let index = 0; index < arr.length; index++) {
    await cb(arr[index], index) 
  }
}

async function main() {
  // Crear algunos roles
  const createRoles = await prisma.role.createMany({
    data: rolesSeeder,
    skipDuplicates: true,
  })

  const cityData = {
    data: {
      ...getCitySeeder(),
      Hotel: {
        create: faker.helpers.multiple(() => ({
          ...getHotelSeeder(),
          rooms: {
            create: faker.helpers.multiple(() => ({
                ...getRoomsSeeder(),
            }), {count: 15})
          }
        }), {
          count: 10,
        })
      },
      country: {
        create: {
          ...getCountrySeeder()
        }
      }
    }
  }

  //Create All
  await asyncForEach(faker.helpers.multiple(() => cityData, {count: 1}), async (data) => {
    await prisma.city.create(data)
  })
  
  // Crear muchos usuarios
  // const createUsers = await prisma.user.createMany({
  //   data: userSeeder,
  //   skipDuplicates: true,
  // })

}


main()
  .then(() => {
    console.log("Seeding complete.");
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });