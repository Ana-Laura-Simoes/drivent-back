import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

//import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

//import enrollmentSchema from "@/schemas/enrollmentSchema";

const router = Router();

router.get("/", controller.getHotelsInfo);
//router.post("/", schemaValidatingMiddleware(enrollmentSchema), controller.saveEnrollmentInfo);

export default router;
