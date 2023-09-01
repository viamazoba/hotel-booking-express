import { PrismaClient } from '@prisma/client';

import { hashPassword } from '../../auth/utils/bcrypt';
import { RequestUserData } from './user.types';
import { getRoleName } from '../role/role.service';

const prisma = new PrismaClient();


export async function createUser(input: RequestUserData) {

  const hashedPassword = await hashPassword(input.password);
  const userRoleId = await getRoleName('user')


const data = {
    ...input,
    password: hashedPassword,
    roleId: userRoleId
  }

  const user = await prisma.user.create({
    data
  });

  return user;
}


export async function verifyUserByEmail(userEmail: string) {

  try{

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    return user;
  }catch(error){
    console.error('Error in getUserByEmail:', error)
    return null
  }
}

export async function getUserByEmail(userEmail: string) {

  try{

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include:{
        city:{
          select: {
            name_city: true,
            postal_code: true
          }
        }
      },
    });

    return user;
  }catch(error){
    console.error('Error in getUserByEmail:', error)
    return null
  }
}

// export async function editUserByEmail(idUser: string, newDataUser: RequestUserData) {

//   const hashedPassword = await hashPassword(input.password);
//   const userRoleId = await getRoleName('user')


// const data = {
//     ...input,
//     password: hashedPassword,
//     roleId: userRoleId
//   }

//   const user = await prisma.user.create({
//     data
//   });

//   return user;
// }