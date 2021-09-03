import { Request, Response } from "express";
import httpStatus from "http-status";
import Payment from "@/entities/Payment";

import * as service from "@/services/client/payment";

export async function createPayment(req: Request, res: Response) {
  const paymentData = req.body as Payment;

  const payment = await service.createNewPayment(
    paymentData
  );
  res.status(httpStatus.CREATED).send(payment);
}
