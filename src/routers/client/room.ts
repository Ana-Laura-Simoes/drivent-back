import { Router } from "express";

import * as controller from "@/controllers/client/room";
import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.post("/", tokenValidationMiddleware, controller.setOrUpdate);  
router.get("/:id", controller.getRoom);

export default router;
