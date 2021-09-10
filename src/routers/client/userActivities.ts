import { Router } from "express";
import * as controller from "@/controllers/client/userActivities";

const router = Router();

router.get("/:id", controller.getUserActivities);
router.post("/", controller.createNewUserActivity);
router.post("/delete", controller.deleteUserActivity);

export default router;
