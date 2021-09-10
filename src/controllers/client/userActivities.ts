import { Request, Response } from "express";
import httpStatus, { CONFLICT } from "http-status";
import * as service from "@/services/client/userActivities";
import ActivityInterface from "@/interfaces/activity";

export async function getUserActivities(req: Request, res: Response) {
  const id: string  = req.params.id;
  const activities = await service.getUserActivities(Number(id));
  res.status(httpStatus.OK).send(activities);
}

export async function createNewUserActivity(req: Request, res: Response) {
  const id: number = req.body.id;
  const newActivity: ActivityInterface = req.body.activity;

  const checkActivities = await service.checkUserActivities(id, newActivity);

  if(!checkActivities) return res.sendStatus(CONFLICT);

  await service.insertUserActivity(id, newActivity.id);

  res.sendStatus(httpStatus.OK);
}
