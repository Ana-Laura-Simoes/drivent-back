import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/room";

export async function setOrUpdate(req: Request, res: Response) {
  const userId = req.body.currentUser.id;
  const roomId = req.body.currentRoom.id;
  await service.setOrUpdate(userId, roomId);
  res.sendStatus(httpStatus.OK);
}
