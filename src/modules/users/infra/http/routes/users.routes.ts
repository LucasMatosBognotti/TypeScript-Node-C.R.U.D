import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

const userRouter = Router();

const usersController = new UsersController();

userRouter.get('/users', usersController.index);

userRouter.get('/users/:id', usersController.show);

userRouter.post('/users', usersController.create);

userRouter.put('/users/:id', usersController.update);

userRouter.delete('/users/:id', usersController.delete);

export default userRouter;
