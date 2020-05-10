import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';
import GetOneUserService from '@modules/users/services/GetOneUserService';

import AppError from '@shared/errors/AppError';

describe('GetOneUser', () => {
  it('should be able to get one user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashPRovider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashPRovider,
    );

    const getOne = new GetOneUserService(
      fakeUsersRepository,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    const getUser = await getOne.execute({
      id: user.id,
    });

    expect(getUser).toHaveProperty('id');
  });

  it('should not be able to get one user that does not exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashPRovider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashPRovider,
    );

    const getOne = new GetOneUserService(
      fakeUsersRepository,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    expect(
      getOne.execute({
        id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
