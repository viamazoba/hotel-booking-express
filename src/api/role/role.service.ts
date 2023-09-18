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

export async function getRoleName(userRole: string) {


  const role = await prisma.role.findMany({
    where: {
      role_name: userRole,
    },
  });

  const roleId = role?.[0].id
  return roleId;
}