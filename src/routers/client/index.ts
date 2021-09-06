import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import paymentRouter from "@/routers/client/payment";
import hotelRouter from "@/routers/client/hotel";
import roomRouter from "@/routers/client/room";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/payment", paymentRouter);
router.use("/hotels", hotelRouter);
router.use("/rooms", roomRouter);

export default router;
