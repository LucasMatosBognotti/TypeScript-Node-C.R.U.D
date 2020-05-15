import { Router } from 'express';

import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/', userRouter);
routes.use('/', sessionsRouter);
routes.use('/', appointmentsRouter);
routes.use('/', providersRouter);
routes.use('/', passwordRouter);

export default routes;
