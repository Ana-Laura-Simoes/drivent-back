import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/location";

export async function getLocations(req: Request, res: Response) {
  const locations = await service.getLocations();
  res.status(httpStatus.OK).send(locations);
}
