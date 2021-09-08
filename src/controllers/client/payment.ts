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

export async function getPayment(req: Request, res: Response) {
  const userPayment = await service.getPayment(req.user.id);

  if(!userPayment) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.send(userPayment).status(httpStatus.OK);
}
