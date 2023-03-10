import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUserServices from "../../../services/AuthenticateUserServices";

export default class SessionsController {
  public async create (request: Request, response: Response): Promise<Response>  {

      const { email, password } = request.body;

      const authenticateUser = container.resolve(AuthenticateUserServices);

      const { user, token } = await authenticateUser.execute({
        email,
        password
      })

      delete user.password;

      return response.json({ user, token })

    }
}
