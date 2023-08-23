import { PrismaClient } from '@prisma/client';

import { hashPassword } from '../../auth/utils/bcrypt';
import { RequestUserData } from './user.types';

const prisma = new PrismaClient();


export async function createUser(input: RequestUserData) {

  const hashedPassword = await hashPassword(input.password);


const data = {
    ...input,
    password: hashedPassword,
    roleId: 'cllnxd3fi0000fut9r96l6q91'
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