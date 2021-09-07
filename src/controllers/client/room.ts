import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/room";

export async function setOrUpdate(req: Request, res: Response) {
  const userId = req.body.currentUser.userId;
  const roomId = req.body.currentRoom.id;
  await service.setOrUpdate(userId, roomId);
  res.sendStatus(httpStatus.OK);
}

export async function getRoom(req: Request, res: Response) {
  const roomId = parseInt(req.params.id);
  const room = await service.getRoom(roomId);
  res.send(room).status(httpStatus.OK);
}
