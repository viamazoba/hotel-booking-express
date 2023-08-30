import { PrismaClient } from "@prisma/client";

// import { roleSeeder } from './../src/api/roles/role.seeder';
import { userSeeder } from '../src/api/user/user.seeder';
// import { userRoleSeeder } from './../src/api/userRole/userRole.seeder';


const prisma = new PrismaClient();

async function main() {
  // Crear algunos roles
//   const createRoles = await prisma.role.createMany({
//     data: roleSeeder,
//     skipDuplicates: true,
//   })

  // Crear muchos usuarios
  const createUsers = await prisma.user.createMany({
    data: userSeeder,
    skipDuplicates: true,
  })

  // Crear muchos usuariosRoles
//   const createUserRoles = await prisma.userRole.createMany({
//     data: userRoleSeeder,
//     skipDuplicates: true,
//   })


//   console.log({createRoles, createUsers, createUserRoles});
  console.log({createUsers});
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