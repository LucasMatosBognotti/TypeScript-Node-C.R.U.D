import { Router } from 'express';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

import Authentication from '@modules/users/infra/http/middlewares/Authentication';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(Authentication);

appointmentsRouter.post('/appointments', appointmentsController.create);

export default appointmentsRouter;
