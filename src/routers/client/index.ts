import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import paymentRouter from "@/routers/client/payment";
import hotelRouter from "@/routers/client/hotel";
import roomRouter from "@/routers/client/room";
import activityRouter from "@/routers/client/activity";
import userActivitiesRouter from "@/routers/client/userActivities";
import locationRouter from "@/routers/client/location";
import recoveryPasswordRouter from "@/routers/client/recoveryPassword";
import userImageRouter from "@/routers/client/userImage";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/payment", tokenValidationMiddleware, paymentRouter);
router.use("/hotels", hotelRouter);
router.use("/rooms", roomRouter);
router.use("/activitiesRegistration", activityRouter);
router.use("/userActivities", tokenValidationMiddleware, userActivitiesRouter);
router.use("/activities", activityRouter );
router.use("/locations", locationRouter );
router.use("/forgetpassword", recoveryPasswordRouter);
router.use("/forgetpasword/setnewpassword", recoveryPasswordRouter);
router.use("/userImage", userImageRouter);

export default router;
