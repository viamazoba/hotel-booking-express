import { Role as RoleModel } from '@prisma/client';

export type Role = RoleModel;

// PICK -> indicamos que campos queremos mostrar
// OMIT -> indicamos que campos queremos omitir

// export type InitialUserData = Pick<UserModel, 'email' | 'password'>;

export type RoleUser = Pick<RoleModel, 'id' | 'role_name'>;