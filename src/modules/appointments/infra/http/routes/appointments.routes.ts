import { Router } from "express";
import { parseISO } from 'date-fns';
import AppointmentsRepository from "../../typeorm/repositories/AppointmentsRepository";
import CreateAppointmentService from "../../../services/CreateAppointmentService";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import ensureAthenticated from "../../../../users/infra/http/middlewares/ensureAthenticated";
import Appointment from "../../typeorm/entities/Appointment";
import { container } from "tsyringe";
import AppointmentsController from "../controllers/AppointmentsController";


const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   console.log(request.user)
//   const appointmentsRepository = AppDataSource.getRepository(Appointment)
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// })

appointmentsRouter.post('/', appointmentsController.create);


export default appointmentsRouter;


// appointmentsRouter.post('/', async (request, response) => {

//   const { provider_id, date } = request.body;

//   const parseDate = parseISO(date);

//   // const createAppointmentService = new CreateAppointmentService(appointmentsRepository)
//   const createAppointmentService = container.resolve(CreateAppointmentService)

//   const appointment = await createAppointmentService.execute({
//     date: parseDate,
//     provider_id
//   });

//   return response.json(appointment)

// });




// appointmentsRouter.post('/', async (request, response) => {
//   try {
//     const { provider_id, date } = request.body;

//     const parseDate = parseISO(date);

//     const createAppointmentService = new CreateAppointmentService()

//     const appointment = await createAppointmentService.execute({
//       date: parseDate,
//       provider_id
//     });

//     return response.json(appointment)
//   } catch (err) {
//     return response.status(400).json({ error: err.message })
//   }
// });
