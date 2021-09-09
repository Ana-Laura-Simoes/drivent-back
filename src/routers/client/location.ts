import { Router } from "express";
import * as controller from "@/controllers/client/location";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.get("/", tokenValidationMiddleware, controller.getLocations);

export default router;
