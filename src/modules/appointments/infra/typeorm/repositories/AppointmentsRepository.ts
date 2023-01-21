import { EntityRepository, getRepository, Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infra/typeorm';
import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointment';

// interface Request {
//   provider_id: string;
//   date: Date;
// }

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
      this.ormRepository = AppDataSource.getRepository(Appointment);
  }
  public async create({ provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {

      const appointment = this.ormRepository.create({
        provider_id,
        date: date
      })

      await this.ormRepository.save(appointment);

      return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | null> {
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date))

    const findAppointment = await this.ormRepository.findOne({
      where: { date }
    });

    return findAppointment;
  }
}

export default AppointmentsRepository
