import { Router } from "express";
import * as controller from "@/controllers/client/activities";
import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.get("/days", tokenValidationMiddleware, controller.getDays);
router.get("/:day", tokenValidationMiddleware, controller.getActivitiesByDay);
export default router;
