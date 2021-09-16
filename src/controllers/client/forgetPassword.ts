import { Request, Response } from "express";
import httpStatus from "http-status";

import * as passwordRecoveryService from "@/services/client/passwordRecovery";

export async function createNewRecovery(req: Request, res: Response) {
  const recovery = await passwordRecoveryService.createNewRecovery(
    req.body.email
  );
  res.status(httpStatus.CREATED).send(recovery);
}

export async function getRecoveryInfo(req: Request, res: Response) {
  const token = req.params.token;
  const recoveryInfo = await passwordRecoveryService.getRecoveryInfo(token);
  const checkToken = await passwordRecoveryService.checkIfTokenIsExpired(token);

  if (!recoveryInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  if(!checkToken) {
    return res.sendStatus(httpStatus.GONE);
  }
  
  res.send(recoveryInfo).status(httpStatus.OK);
}

export async function setNewPassword(req: Request, res: Response) {
  const changePassword = await passwordRecoveryService.setNewPassword(req.body);
  if (!changePassword) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  res.sendStatus(httpStatus.OK);
}
