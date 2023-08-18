import { Request, Response } from 'express';

import { createUser } from './user.service';
import { User, RequestUserData } from './user.types';


export async function createUserHandler(req: Request, res: Response) {
  try {

    const { email, password }: RequestUserData = req.body;
    
    const newUser: RequestUserData = {
      email,
      password,
    }
    const user: User = await createUser(newUser);
    
    res.status(201).json({ message: 'user has been created successfully', user });
  } catch ({ message }: any) {

    res.status(400).json({ message })
  }
}