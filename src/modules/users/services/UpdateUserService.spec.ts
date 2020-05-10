import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

import AppError from '@shared/errors/AppError';

describe('Update User', () => {
  it('should be able to update one user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashPRovider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashPRovider,
    );

    const updateUser = new UpdateUserService(
      fakeUsersRepository,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    const update = await updateUser.execute({
      id: user.id,
      name: 'Marie',
      email: 'marie@test.com',
      password: '123123',
    });

    expect(update).toHaveProperty('id');
    expect(update.name).toBe('Marie');
  });

  it('should not be able to update user that does not exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashPRovider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashPRovider,
    );

    const updateUser = new UpdateUserService(
      fakeUsersRepository,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await updateUser.execute({
      id: user.id,
      name: 'Marie',
      email: 'marie@test.com',
      password: '123123',
    });

    await expect(
      updateUser.execute({
        id: '123',
        name: 'Marie',
        email: 'marie@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashPRovider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashPRovider,
    );

    const updateUser = new UpdateUserService(
      fakeUsersRepository,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await createUser.execute({
      name: 'Marie',
      email: 'marie@test.com',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        id: user.id,
        name: 'Marie',
        email: 'marie@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    const user1 = await updateUser.execute({
      id: user.id,
      name: 'Marie',
      email: 'johndoe@test.com',
      password: '123123',
    });

    expect(user1).toHaveProperty('id');
  });
});
