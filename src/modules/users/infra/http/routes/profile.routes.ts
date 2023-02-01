import { Router } from "express";

import ensureAthenticated from "../middlewares/ensureAthenticated";
import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();

const profileController = new ProfileController()

profileRouter.use(ensureAthenticated)

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;




