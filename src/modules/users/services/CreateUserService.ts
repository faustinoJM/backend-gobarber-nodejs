import { hash } from "bcryptjs";
import { AppDataSource } from "../../../shared/infra/typeorm";
import AppError from "../../../shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    // const usersRepository = AppDataSource.getRepository(User)

    const checkUserExists = await this.usersRepository.findByEmail(email)

    if(checkUserExists) {
      //como o service nao conecta conecta com response nunca
      //e response dispara uma resposta http, por isso lancamos new Error ao inves de response htttp 400
      throw new AppError('Email address already used');
    }

    const hashedPassword =  await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })
  // await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
