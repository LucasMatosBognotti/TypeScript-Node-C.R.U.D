import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

import Authentication from '@modules/users/infra/http/middlewares/Authentication';

const userRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

userRouter.get('/users', Authentication, usersController.show);

userRouter.post('/users', usersController.create);

userRouter.put('/users', Authentication, usersController.update);

userRouter.delete('/users', Authentication, usersController.delete);

userRouter.patch('/avatar', Authentication, upload.single('avatar'), userAvatarController.update);

export default userRouter;
