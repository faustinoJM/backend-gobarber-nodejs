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
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";


const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);


export default passwordRouter;


