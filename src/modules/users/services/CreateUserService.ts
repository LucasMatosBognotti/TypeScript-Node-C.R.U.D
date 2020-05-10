import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExit = await this.usersRepository.findByEmail(email);

    if (checkUserExit) {
      throw new AppError('Email address already used', 404);
    }

    const password_hash = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: password_hash,
    });

    return user;
  }
}

export default CreateUserService;
