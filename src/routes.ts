import { Router } from 'express';

import userRouter from './routes/user.routes';

const routes = Router();

routes.use('/', userRouter);

export default routes;
