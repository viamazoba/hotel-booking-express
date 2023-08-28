import { Request, Response } from 'express';

import { createUser, getUserByEmail } from './user.service';
import { User, RequestUserData } from './user.types';
import { signToken } from '../../auth/auth.service';
import { getRoleById } from '../role/role.service';
import { PayloadType } from '../../auth/auth.types';


export async function createUserHandler(req: Request, res: Response) {
  try {

    const { email, password }: RequestUserData = req.body;
    
    const newUser: RequestUserData = {
      email,
      password,
    }
    const user: User = await createUser(newUser);
    const roleName = await getRoleById(user.roleId) as string

    const dataToken = {
      id : user.id,
      email: user.email,
      role: roleName
    } as PayloadType

    const token =  signToken(dataToken)

    const dataUser = {
      email: user.email,
      token
    }

    
    res.status(201).json({ message: 'user has been created successfully', dataUser });
  } catch ({ message }: any) {

    res.status(400).json({ message })
  }
}

export async function verifyUserHandler(req: Request, res: Response) {
  try {

    const { email } = req.body;
    const user: User = await getUserByEmail(email) as User;

    const emailUser = {
      email: user.email
    }
    
    res.status(201).json({ message: 'user has been find successfully' , emailUser});
  } catch ({ message }: any) {

    res.status(400).json({ message })
  }
}