import { hash } from 'bcryptjs';
import { isUuid } from 'uuidv4';
import { getRepository } from 'typeorm';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  email: string;
  password: string ;
}

class UpdateUserService {
  public async execute({
    id, name, email, password,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    if (isUuid(id) === false) {
      throw new AppError('id is not valid');
    }

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('User does not exits', 404);
    }

    if (email !== user.email) {
      const emailExist = await userRepository.findOne({
        where: { email },
      });

      if (emailExist) {
        throw new AppError('Email already exist');
      }
    }

    user.id = id;
    user.name = name;
    user.email = email;
    user.password_hash = await hash(password, 10);

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
