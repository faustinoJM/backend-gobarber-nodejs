import { v4 } from "uuid";
import ICreateAppointmentDTO from "../../dtos/ICreateAppointmentDTO";
import Appointment from "../../infra/typeorm/entities/Appointment"
import IAppointmentsRepository from "../IAppointmentsRepository";
import { isEqual } from 'date-fns'

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []


  public async create({ provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: v4(),
      date,
      provider_id
    })
    // appointment.id = v4();
    // appointment.date = date;
    // appointment.provider_id = provider_id;

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | null> {
   const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date))


   return findAppointment!;
  }
}

export default FakeAppointmentsRepository
