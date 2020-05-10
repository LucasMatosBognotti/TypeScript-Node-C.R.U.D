import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentRepository();

    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      provider_id: '123123',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentRepository();

    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    await createAppointmentService.execute({
      provider_id: '123123',
      date: appointmentDate,
    });

    await expect(
      createAppointmentService.execute({
        provider_id: '123123',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
