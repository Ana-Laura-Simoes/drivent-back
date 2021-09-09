import { Router } from "express";
import * as controller from "@/controllers/client/location";
import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.get("/", tokenValidationMiddleware, controller.getLocations);

export default router;
