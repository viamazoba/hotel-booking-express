import { Response, NextFunction } from 'express';

import { getUserByEmail } from '../api/user/user.service';
import { AuthRequest } from './auth.types';
import { User } from '../api/user/user.types';
import { verifyToken } from './auth.service';
import { getRoleById } from '../api/role/role.service';

export const isAuthenticated: any = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
) => {
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  // [Bearer, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9]
  // const token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  const token = req.headers?.authorization?.split(' ')[1];
  
  if(!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Verify token
  const decoded = verifyToken(token)
  //const decoded = { id: '123', email: 'test'}

  if(!decoded){
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await getUserByEmail(decoded.email) as User

  req.user = user

  return next();
}

export const hasRole = (allowRoles: string[]) => {
  return async (
      req: AuthRequest, 
      res: Response, 
      next: NextFunction
  ) => {
    const { roleId } = req.user as User

    const roleName = await getRoleById(roleId) as string

    // userRoles = ['PACIENTE', 'ADMIN']
    // const userRoles = roles.map(({ Role }: any) => Role.name)
    const hasPermission = allowRoles.includes(roleName)
    // const hasPermission = allowRoles.includes(role)

    if(!hasPermission) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    next()
  }
}
