import { Router } from "express";
import { parseISO } from 'date-fns';
import { getCustomRepository } from "typeorm";
import AppointmentsRepository from "../../../../appointments/infra/typeorm/repositories/AppointmentsRepository";
import CreateAppointmentService from "../../../../appointments/services/CreateAppointmentService";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import AuthenticateUserServices from "../../../services/AuthenticateUserServices";
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import { container } from "tsyringe";
import SessionsController from "../controllers/SessionsController";


const sessionsRouter = Router();

const usersRepository = new UsersRepository();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);


// sessionsRouter.post('/', async (request, response) => {

//   const { email, password } = request.body;

//   // const authenticateUser = new AuthenticateUserServices(usersRepository);
//   const authenticateUser = container.resolve(AuthenticateUserServices);

//   const { user, token } = await authenticateUser.execute({
//     email,
//     password
//   })

//   delete user.password;

//   return response.json({ user, token })


// });


export default sessionsRouter;


