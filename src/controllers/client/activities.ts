import { Request, Response } from "express";
import httpStatus from "http-status";
import Activity from "@/entities/Activity";

import * as service from "@/services/client/activity";

export async function getActivities(req: Request, res: Response) {
  const activities = await service.getActivities();
  res.status(httpStatus.OK).send(activities);
}
