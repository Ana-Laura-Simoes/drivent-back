import { Request, Response } from "express";
import httpStatus from "http-status";
import Room from "@/entities/Room";

import * as service from "@/services/client/room";

export async function setOrUpdate(req: Request, res: Response) {
  console.log(req.body);
  const userId = req.body.user.id;
  const roomId = req.body.currentRoom.id;
  await service.setOrUpdate(userId, roomId);
  res.sendStatus(httpStatus.OK);
  // const userPayment = await service.getPayment(req.user.id);

  // if(!userPayment) {
  //   return res.sendStatus(httpStatus.NO_CONTENT);
  // }
  
  // res.send(userPayment).status(httpStatus.OK);
}
