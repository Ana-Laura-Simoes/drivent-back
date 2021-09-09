import { Router } from "express";
import * as controller from "@/controllers/client/activities";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

//router.get("/", tokenValidationMiddleware, controller.getActivities);
router.get("/", controller.getActivities);

export default router;
