import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class GetAllUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User> {
    const user = await this.usersRepository.findAll();

    if (!user) {
      throw new AppError('Users not exist', 404);
    }

    return user;
  }
}

export default GetAllUserService;
