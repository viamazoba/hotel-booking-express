import { PrismaClient } from '@prisma/client';

import { hashPassword } from '../../auth/utils/bcrypt';
import { RequestUserData } from './user.types';

const prisma = new PrismaClient();


export async function createUser(input: RequestUserData) {

  const hashedPassword = await hashPassword(input.password);


const data = {
    ...input,
    password: hashedPassword,
    roleId: 'cllpsnrv200001cd9g01ymaag'
  }

  const user = await prisma.user.create({
    data
  });

  return user;
}


export async function getUserByEmail(userEmail: string) {


  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  return user;
}