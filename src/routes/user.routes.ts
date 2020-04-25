import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

import GetOneUserService from '../services/GetOneUserService';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';


const userRouter = Router();

userRouter.get('/users', async (req, res) => {
  const getUsers = getRepository(User);
  const users = await getUsers.find();

  return res.json(users);
});

userRouter.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  // Instanciando a Classe para ter acesso os metodos
  const getOneUser = new GetOneUserService();

  const user = await getOneUser.execute({ id });

  // Nao vai exiber o password do usuario
  delete user.password_hash;

  return res.json(user);
});

userRouter.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  // Instanciando a Classe para ter acesso os metodos
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  // Nao vai exiber o password do usuario
  delete user.password_hash;

  return res.json(user);
});

userRouter.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  // Instanciando a Classe para ter acesso os metodos
  const updateUser = new UpdateUserService();

  const user = await updateUser.execute({
    id,
    name,
    email,
    password,
  });

  // Nao vai exiber o password do usuario
  delete user.password_hash;

  return res.json(user);
});

userRouter.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  // Instanciando a Classe para ter acesso os metodos
  const deleteUser = new DeleteUserService();

  const user = await deleteUser.execute({ id });

  return res.json(user);
});

export default userRouter;
