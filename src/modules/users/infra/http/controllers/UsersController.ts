import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetOneUserService from '@modules/users/services/GetOneUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

class UsersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getOneUser = container.resolve(GetOneUserService);

    const user = await getOneUser.execute({ id });

    delete user.password;

    return res.json(user);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      email,
      password,
    });

    delete user.password;

    return res.json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute({ id });

    return res.json(user);
  }
}

export default UsersController;
