import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';
import CreateAutheticateService from '@modules/users/services/AuthenticateService';

import AppError from '@shared/errors/AppError';

describe('AutheticateUser', () => {
  it('should be able to authenticate the user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createAutheticate = new CreateAutheticateService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    const authentication = await createAutheticate.execute({
      email: user.email,
      password: user.password,
    });

    expect(authentication).toHaveProperty('token');
    expect(authentication.user).toEqual(user);
  });

  it('should not be able to authenticate user that does not exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createAutheticate = new CreateAutheticateService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await expect(
      createAutheticate.execute({
        email: 'test@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with invalid password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createAutheticate = new CreateAutheticateService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await expect(
      createAutheticate.execute({
        email: user.email,
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
