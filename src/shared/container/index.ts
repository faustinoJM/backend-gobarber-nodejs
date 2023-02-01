import { container } from "tsyringe";
import AppointmentsRepository from "../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import IAppointmentsRepository from "../../modules/appointments/repositories/IAppointmentsRepository";
import UsersRepository from "../../modules/users/infra/typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../../modules/users/infra/typeorm/repositories/UsersTokensRepository";
import IUsersRepository from "../../modules/users/repositories/IUsersRepository";
import IUserTokensRepository from "../../modules/users/repositories/IUserTokensRepository";
import "./providers"
import "../../modules/users/providers"

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
);
