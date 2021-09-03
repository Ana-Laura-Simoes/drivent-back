import { Router } from "express";

import * as controller from "@/controllers/client/payment";

//import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
//import createNewUserSchema from "@/schemas/createNewUser";

const router = Router();

router.post("/",  controller.createPayment);

export default router;
