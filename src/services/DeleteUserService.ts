import { isUuid } from 'uuidv4';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: Request): Promise<string> {
    if (isUuid(id) === false) {
      throw new AppError('ID is not valid');
    }
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('User not exist', 404);
    }

    await userRepository.delete(id);

    return ('Delete with successuly');
  }
}

export default DeleteUserService;
