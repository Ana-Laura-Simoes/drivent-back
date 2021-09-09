import { Router } from "express";
import * as controller from "@/controllers/client/activities";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.get("/", tokenValidationMiddleware, controller.getDays);
router.get("/:day", tokenValidationMiddleware, controller.getActivitiesByDay);

export default router;
