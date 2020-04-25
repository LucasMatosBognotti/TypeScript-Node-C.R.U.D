import { getRepository } from 'typeorm';
import { isUuid } from 'uuidv4';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class GetOneUserService {
  public async execute({ id }: Request): Promise<User> {
    if (isUuid(id) === false) {
      throw new AppError('ID is not valid');
    }

    const useRepository = getRepository(User);

    const user = await useRepository.findOne(id);

    if (!user) {
      throw new AppError('User not exist', 404);
    }

    return user;
  }
}

export default GetOneUserService;
