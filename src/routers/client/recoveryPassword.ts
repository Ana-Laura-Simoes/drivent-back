import { Router } from "express";

import * as controller from "@/controllers/client/forgetPassword";

const router = Router();

router.post("/", controller.createNewRecovery);  
router.get("/:token", controller.getRecoveryInfo);
router.post("/setnewpassword", controller.setNewPassword);

export default router;
