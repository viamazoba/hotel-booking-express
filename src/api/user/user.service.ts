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


export async function getUserByEmail(userEmail: string) {


  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  return user;
}