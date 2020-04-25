import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExit = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExit) {
      throw new AppError('Email address already used', 404);
    }

    const password_hash = await hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password_hash,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
