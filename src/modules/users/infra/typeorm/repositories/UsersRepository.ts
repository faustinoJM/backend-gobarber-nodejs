import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";
import IUsersRepository from "../../../repositories/IUsersRepository";
import User from "../entities/User";

class UsersRepository implements IUsersRepository{
  private ormRepository: Repository<User>;

  constructor() {
      this.ormRepository = AppDataSource.getRepository(User);
  }
  public async create({ name, email, password}: ICreateUserDTO): Promise<User> {

      const user = this.ormRepository.create({
        name,
        email,
        password
      })

      await this.ormRepository.save(user);

      return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: { email }
    })

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: { id }
    })

    return user;
  }
  public async update(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }


}

export default UsersRepository
