import { AppDataSource } from "../../../shared/infra/typeorm";
import uploadConfig from '../../../config/upload'
import path from 'path';
import fs from 'fs';
import AppError from "../../../shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface Request {
  user_id: string;
  avatar: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    // const usersRepository = AppDataSource.getRepository(User);

    const user = await this.usersRepository.findById(user_id)

    if(!user) {
      throw new AppError("Only authenticated users can change avatar", 401)
    }

    if(user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.update(user)

    return user;

  }

}

export default UpdateUserAvatarService;
