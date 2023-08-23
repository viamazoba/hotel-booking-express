import { Request, Response } from 'express';

import { getUserByEmail } from '../../api/user/user.service';
import { comparePassword } from '../utils/bcrypt';
import { signToken } from '../auth.service';
import { getRoleById } from '../../api/role/role.service'; 

export async function loginHandler(req: Request, res: Response){
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if(!user) {
      return res.status(401).send('User not found');
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password)
    
    if(!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    // JWT
    const payload = {
      id: user.id,
      email: user.email,
    }
    const token = signToken(payload)
    const roleName = await getRoleById(user.roleId)

    const profile = {
      fullName: user.user_name,
      email: user.email,
      avatar: user.user_img,
      roles: roleName
    }

    return res.status(200).json({ token, profile})

  } catch(error) {}
}