import { Router } from "express";
import * as controller from "@/controllers/client/userImage";

const router = Router();

router.get("/:id", controller.getUserImage);
router.post("/", controller.setUserImage);

export default router;
