import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/userActivities";

export async function getUserActivities(req: Request, res: Response) {
  const id: string  = req.params.id;
  const activities = await service.getUserActivities(Number(id));
  res.status(httpStatus.OK).send(activities);
}
