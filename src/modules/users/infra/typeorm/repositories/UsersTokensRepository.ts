import { getRepository, Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infra/typeorm';
import IUserTokensRepository from '../../../repositories/IUserTokensRepository';


import UserToken from '../entities/UserToken';

class UsersTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken!;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UsersTokensRepository;
