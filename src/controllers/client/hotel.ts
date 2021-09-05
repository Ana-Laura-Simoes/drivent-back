import { Request, Response } from "express";
import httpStatus from "http-status";

import * as hotelService from "@/services/client/hotel";
//import EnrollmentData from "@/interfaces/enrollment";

export async function getHotelsInfo(req: Request, res: Response) {
  const hotelsInfo = await hotelService.getHotelsWithRooms();

  if(!hotelsInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.send(hotelsInfo).status(httpStatus.OK);
}

// export async function saveEnrollmentInfo(req: Request, res: Response) {
//   const enrollmentData = req.body as EnrollmentData;
//   enrollmentData.userId = req.user.id;
//   await enrollmentService.createNewEnrollment(enrollmentData);
//   res.sendStatus(httpStatus.OK);
// }

