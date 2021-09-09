import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/activity";

export async function getDays(req: Request, res: Response) {
  const days = await service.getDays();
  res.status(httpStatus.OK).send(days);
}

export async function getActivitiesByDay(req: Request, res: Response) {
  const day = req.params.day;
  const activities = await service.getActivitiesByDay(day);
  res.status(httpStatus.OK).send(activities);
}
