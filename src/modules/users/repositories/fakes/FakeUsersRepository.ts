import { v4 as uuid } from 'uuid';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';


class FakeUsersRepository implements IUsersRepository {
  update(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  private users: User[] = [];

  public async findById(id: string): Promise<User | null> {
    const findUser = this.users.find(user => user.id === id);

    return findUser!;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const findUser = this.users.find(user => user.email === email);

    return findUser!;
  }

  // public async findAllProviders({
  //   expect_user_id,
  // }: IFindAllProvidersDTO): Promise<User[]> {
  //   let { users } = this;

  //   if (expect_user_id) {
  //     users = this.users.filter(user => user.id !== expect_user_id);
  //   }

  //   return users;
  // }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      {
        id: uuid(),
      },
      userData,
    );

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(
      findIndex => findIndex.id === user.id,
    );

    this.users[userIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
