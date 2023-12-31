import { Request, Response } from 'express';

import { createUser, verifyUserByEmail, getUserByEmail, editUser, editUserImage } from './user.service';
import { User, RequestUserData, UserProfile, RequestEditUserData, EditUserData, EditUserImage} from './user.types';
import { signToken, verifyToken} from '../../auth/auth.service';
import { getRoleById } from '../role/role.service';
import { PayloadType } from '../../auth/auth.types';
import { getCityByName } from '../city/city.service';
import { comparePassword } from '../../auth/utils/bcrypt';
import { sendMailSendGrid } from '../../config/sendGrid';

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

    // Send Mail sendgrid
    const emailData = {
      from: 'No reply <victormazo95121@gmail.com>',
      to: user.email,
      subject: 'Welcome to Hotel Booking',
      templateId: 'd-6215e5e7b98e4952a40455442f96d0a9'
    }
    sendMailSendGrid(emailData)

    
    res.status(201).json({ message: 'user has been created successfully', dataUser });
  } catch ({ message }: any) {

    res.status(400).json({ message })
  }
}

export async function verifyUserHandler(req: Request, res: Response) {

  try {
    const { email } = req.body;
    const user: User | null = await verifyUserByEmail(email); 
    
    if (user) {
      const emailUser = {
        email: user.email
      };
      
      res.status(201).json({ message: 'User has been found successfully', emailUser });
    } else {
      res.status(200).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in verifyUserHandler:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getUserHandler(req: Request, res: Response) {

  try {
    const { emailPerson } = req.body;
    const userData: UserProfile | null = await getUserByEmail(emailPerson);
    
      if(!userData){
        return res.status(404).json({message:'User not found', userData})
      }

      const user = {
        'user_name': userData.user_name,
        'user_img': userData.user_img,
        'phone': userData.phone,
        'address': userData.address,
        'gender' : userData.gender,
        'birthday': userData.birthday,
        'name_city': userData.city?.name_city,
        'postal_code' : userData.city?.postal_code

      }
      res.status(200).json({ message: 'User has been found successfully', user });

  } catch (error) {
    console.error('Error in getUserHandler:', error);
    res.status(500).json({ message: 'Internal server error' }); 
  }
}


export async function editUserHandler(req: Request, res: Response) {
  try {

    const data: RequestEditUserData = req.body;

    const cityId = await getCityByName(data.name_city)
    
    const newUser: EditUserData = {
      user_name: data.user_name,
      address: data.address,
      gender: data.gender,
      phone: data.phone,
      birthday: data.birthday,
      cityId
    }

    const userToken = req.headers['authorization']?.split(' ')[1] as string
    const {id} = verifyToken(userToken)

    const resuesta = await editUser(id, newUser);


    
    res.status(201).json({ message: 'user has been update successfully' });
  } catch ({ message }: any) {

    res.status(400).json({ message })
  }
}


export async function editUserImageHandler(req: Request, res: Response) {
  try {

    const {user_img}: EditUserImage = req.body;
    
    const newUserImage: EditUserImage = {
      user_img
    }

    const userToken = req.headers['authorization']?.split(' ')[1] as string
    const {id} = verifyToken(userToken)

    await editUserImage(id, newUserImage.user_img as string);

    res.status(201).json({ message: 'user has been update successfully' });
  } catch ({ message }: any) {

    res.status(400).json({ message })
  }
}


export async function loginUserHandler(req: Request, res: Response) {

  try {
    const { email } = req.body;
    const userData: UserProfile | null = await getUserByEmail(email);
    
    if(!userData){
      return res.status(401).json({message:'Incorrect credentials'})
    }

    const {password} = userData
    const inputPassword = req.body.password

    const userAuthentication = await comparePassword(inputPassword, password)

    if(!userAuthentication){
      return res.status(401).json({message:'Incorrect credentials'})
    }

    const roleName = await getRoleById(userData.roleId) as string

    const dataToken = {
      id : userData.id,
      email: userData.email,
      role: roleName
    } as PayloadType

    const token =  signToken(dataToken)

    const user = {
      'user_name': userData.user_name,
      'user_img': userData.user_img,
      'phone': userData.phone,
      'address': userData.address,
      'gender' : userData.gender,
      'birthday': userData.birthday,
      'name_city': userData.city?.name_city,
      'postal_code' : userData.city?.postal_code

    }
    res.status(200).json({ message: 'User is authorized', user , token});

  } catch (error) {
    console.error('Error in getUserHandler:', error);
    res.status(500).json({ message: 'Internal server error' }); 
  }
}