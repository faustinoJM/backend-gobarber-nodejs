import { response, Router } from "express";
import CreateUserService from "../../../services/CreateUserService";
import ensureAthenticated from "../middlewares/ensureAthenticated";
import uploadConfig from "../../../../../config/upload";
import multer from "multer";
import UpdateUserAvatarService from "../../../services/UpdateUserAvatarService";
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import { container } from "tsyringe";
import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersRepository = new UsersRepository()
const usersController = new UsersController();
const userAvatarController = new UserAvatarController()


usersRouter.post('/', usersController.create);
// usersRouter.post('/', async (request, response) => {

//   const { name, email, password } = request.body;

//   // const createUserService = new CreateUserService(usersRepository);
//   const createUserService = container.resolve(CreateUserService)

//   const user = await createUserService.execute({
//     name,
//     email,
//     password })

//     delete user.password;

//   return response.json(user)

// });


usersRouter.patch('/avatar',ensureAthenticated, upload.single('avatar'), userAvatarController.update)

// usersRouter.patch('/avatar',
//   ensureAthenticated,
//   upload.single('avatar'),
//   async(request, response) => {
// // console.log(request.file);

//   // const updateUserAvatar = new UpdateUserAvatarService(usersRepository)
//   const updateUserAvatar = container.resolve(UpdateUserAvatarService)

//   const user = await updateUserAvatar.execute({
//     user_id: request.user.id,
//     avatarFilename: request.file?.filename
//   });

//   console.log(request.user.id);
//     console.log(request.file?.filename)

//   return response.json(user)

// })


export default usersRouter;





// usersRouter.patch('/avatar',
//     ensureAthenticated,
//     upload.single('avatar'),
//     async(request, response) => {
//   // console.log(request.file);
//   try {
//     const updateUserAvatar = new UpdateUserAvatarService()

//     const user = await updateUserAvatar.execute({
//       user_id: request.user.id,
//       avatarFilename: request.file?.filename
//     });

//     console.log(request.user.id);
//      console.log(request.file?.filename)

//     return response.json(user)
//   } catch (err) {
//     return response.status(400).json({ error: err.message})
//   }
// })
