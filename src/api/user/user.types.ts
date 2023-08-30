//import { User as UserModel } from '@prisma/client';
import { User as UserModel } from "@prisma/client";
export type User = UserModel;

// PICK -> indicamos que campos queremos mostrar
// OMIT -> indicamos que campos queremos omitir

// export type InitialUserData = Pick<UserModel, 'email' | 'password'>;

export type RequestUserData = Pick<UserModel, 'email' | 'password' >;
export type ReponseUserData = Pick<UserModel, 'email'> & {token: string};


// export type RequestUserData = Pick<UserModel, 'email' | 'password'> & { roleId: string };

// export type UserCredential = Omit<RequestUserData, 'roleId'>;