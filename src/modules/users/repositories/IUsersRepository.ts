import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(emai: string): Promise<User | undefined>;
  findAll(): Promise<User[] | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<string>;
  save(user: User): Promise<User>;
};
