import { Request, Response } from "express";
import httpStatus from "http-status";
import Activity from "@/entities/Activity";

import * as service from "@/services/client/activity";

export async function getDays(req: Request, res: Response) {
  const days = await service.getDays();
  res.status(httpStatus.OK).send(days);
}
