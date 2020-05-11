import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

import AppError from '@shared/errors/AppError';

describe('DeleteUser', () => {
  it('should be able to delete one user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashPRovider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashPRovider,
    );

    const deleteUser = new DeleteUserService(
      fakeUsersRepository,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    const message = await deleteUser.execute({
      id: user.id,
    });

    expect(message).toBe(message);
  });

  it('should not be able to delete a user that does not exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const deleteUser = new DeleteUserService(
      fakeUsersRepository,
    );

    await expect(
      deleteUser.execute({
        id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
