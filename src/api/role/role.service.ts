import { PrismaClient, Role } from '@prisma/client';
import { RoleUser } from './role.type';
const prisma = new PrismaClient();


export async function getRoleById(roleId: string) {


    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    const roleName = role?.role_name
    return roleName;
}