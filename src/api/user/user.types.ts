//import { User as UserModel } from '@prisma/client';
import { User as UserModel } from "@prisma/client";
export type User = UserModel;

// PICK -> indicamos que campos queremos mostrar
// OMIT -> indicamos que campos queremos omitir

// export type InitialUserData = Pick<UserModel, 'email' | 'password'>;

export type RequestUserData = Pick<UserModel, 'email' | 'password' >;
export type ReponseUserData = Pick<UserModel, 'email'> & {token: string};
export type UserProfile = UserModel & {city: {name_city: string|null, postal_code: string|null } | null};

export type RequestEditUserData = Pick<UserModel, 'user_name'|'address' | 'birthday'| 'gender'| 'cityId'| 'phone' > & {name_city:string, postal_code: string};
export type EditUserData = Pick<UserModel, 'user_name'|'address' | 'birthday'| 'gender'| 'cityId'| 'phone' >
export type EditUserImage = Pick<UserModel, 'user_img'>
// export type RequestUserData = Pick<UserModel, 'email' | 'password'> & { roleId: string };

// export type UserCredential = Omit<RequestUserData, 'roleId'>;