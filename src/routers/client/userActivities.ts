import { Router } from "express";
import * as controller from "@/controllers/client/userActivities";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

//router.get("/", tokenValidationMiddleware, controller.getActivities);
router.get("/:id", controller.getUserActivities);

export default router;
