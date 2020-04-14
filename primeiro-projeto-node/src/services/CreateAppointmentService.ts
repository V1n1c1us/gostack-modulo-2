import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRespository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

/**
 * Depencendy Inversion (S.O.L.I.D)
 */
class CreateAppointmentService {
  private appointmentsRepository: AppointmentRespository;

  constructor(appointmentsRepository: AppointmentRespository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This Appointments is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
