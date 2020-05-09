import { hash } from 'bcryptjs';

import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

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
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExit = await this.usersRepository.findByEmail(email);

    if (checkUserExit) {
      throw new AppError('Email address already used', 404);
    }

    const password_hash = await hash(password, 10);

    const user = this.usersRepository.create({
      name,
      email,
      password: password_hash,
    });

    return user;
  }
}

export default CreateUserService;
