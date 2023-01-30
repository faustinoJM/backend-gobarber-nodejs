import AppError from "../../../shared/errors/AppError";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentRepository";
import CreateAppointmentService from "./CreateAppointmentService";

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '44613'
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('44613')
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointmentDate = new Date(2023, 0, 30, 10);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '44613'
    })

    expect(createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '44613'
    })).rejects.toBeInstanceOf(AppError)
  })
})
