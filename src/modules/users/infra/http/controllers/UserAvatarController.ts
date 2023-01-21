import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateUserAvatarService from "../../../services/UpdateUserAvatarService";

export default class UserAvatarController {
  public async update (request: Request, response: Response): Promise<Response> {

      const updateUserAvatar = container.resolve(UpdateUserAvatarService)

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file?.filename
      });

      console.log(request.user.id);
      console.log(request.file?.filename)

      return response.json(user)

  }
}
