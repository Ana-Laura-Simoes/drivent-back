import { Request, Response } from "express";
import httpStatus from "http-status";
import * as service from "@/services/client/user";

export async function setUserImage(req: Request, res: Response) {
  const { id, image }: {id: number, image: string} = req.body;

  await service.UpdateUserPicture(id, image);

  res.sendStatus(httpStatus.CREATED);
}

export async function getUserImage(req: Request, res: Response) {
  const id: string = req.params.id;
  
  const userPicture = await service.getUserPicture(Number(id));

  res.status(httpStatus.OK).send(userPicture.image);
}
