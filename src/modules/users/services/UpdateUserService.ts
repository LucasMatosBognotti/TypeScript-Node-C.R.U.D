import { hash } from 'bcryptjs';
import { isUuid } from 'uuidv4';

import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string ;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id, name, email, password,
  }: IRequest): Promise<User> {
    if (isUuid(id) === false) {
      throw new AppError('id is not valid');
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exits', 404);
    }

    if (email !== user.email) {
      const emailExist = await this.usersRepository.findByEmail(email);
      if (emailExist) {
        throw new AppError('Email already exist');
      }
    }

    user.id = id;
    user.name = name;
    user.email = email;
    user.password = await hash(password, 10);

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
