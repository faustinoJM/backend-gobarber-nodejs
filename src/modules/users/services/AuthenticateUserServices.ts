import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../../shared/infra/typeorm";
import authConfig from "../../../config/auth"
import AppError from "../../../shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: Request): Promise<Response> {
    // const usersRepository = AppDataSource.getRepository(User);
    // const user = await usersRepository.findOne({
    //   where: { email }
    // })

    const user = await this.usersRepository.findByEmail(email)

    if(!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, 'aa2481f29d92155', {
      subject: user.id,
      expiresIn: '1d'
    })

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserServices
